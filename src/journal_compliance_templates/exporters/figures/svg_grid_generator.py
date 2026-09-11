"""
Vector (SVG) Grid and Guide Generator for Inkscape, Illustrator, and vector tools.
Creates dimensioned blank figure templates with locked alignment guides, gutters,
typographical ladders, and embedded color palette swatches.
"""

from pathlib import Path
from typing import Dict, Any, Optional
import xml.sax.saxutils as saxutils

from journal_compliance_templates.exporters.figures.mplstyle_generator import (
    ACCESSIBLE_PALETTES,
    get_palette_colors,
)


def generate_svg_grid_content(
    journal_data: Dict[str, Any],
    column: str = "single_column",
    height_mm: Optional[float] = None,
    palette_name: str = "Okabe-Ito",
) -> str:
    """
    Generate valid SVG XML content formatted to exact publisher dimensions with guides.
    """
    meta = journal_data["metadata"]
    geom = journal_data["figure_geometry"]
    typo = journal_data["figure_typography"]
    sizes = typo["font_sizes"]
    weights = journal_data["line_weights"]
    ai = journal_data["ai_policy"]
    export = journal_data["export_requirements"]

    col_widths = geom["column_widths"]
    if column not in col_widths:
        column = "single_column"
    width_mm = col_widths[column]["width"]
    col_desc = col_widths[column]["description"]

    # Calculate height
    if height_mm is None:
        height_mm = min(geom["max_height"], round(width_mm * 0.75, 1))
    else:
        height_mm = min(geom["max_height"], height_mm)

    journal_name = saxutils.escape(meta["journal_name"])
    publisher = saxutils.escape(meta["publisher"])
    primary_font = typo["family_preferences"]["primary"]
    panel_case = journal_data["panel_labeling"]["case"]
    panel_sample = "A" if panel_case == "uppercase" else "a"

    colors = get_palette_colors(palette_name)

    # Swatch layout parameters (bottom bar or margin)
    swatch_size = 4.0  # mm
    swatch_gap = 1.5   # mm
    gutter_size = geom.get("panel_spacing", {}).get("minimum_gutter", 3.0)

    # Build SVG Swatch Rectangles
    swatches_svg = []
    start_x = 4.0
    start_y = height_mm - 8.0
    for idx, chex in enumerate(colors):
        x = start_x + idx * (swatch_size + swatch_gap)
        swatches_svg.append(
            f'<rect x="{x:.2f}" y="{start_y:.2f}" width="{swatch_size:.2f}" height="{swatch_size:.2f}" '
            f'fill="{chex}" stroke="#333333" stroke-width="0.15" rx="0.4"><title>{chex}</title></rect>'
        )
    swatches_block = "\n      ".join(swatches_svg)

    svg_content = f"""<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns="http://www.w3.org/2000/svg"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   version="1.1"
   width="{width_mm:.2f}mm"
   height="{height_mm:.2f}mm"
   viewBox="0 0 {width_mm:.2f} {height_mm:.2f}">

  <defs>
    <style type="text/css">
      .guide-line {{ stroke: #0284C7; stroke-width: 0.2; stroke-dasharray: 1, 1; fill: none; }}
      .margin-box {{ stroke: #E0E7FF; stroke-width: 0.15; fill: none; }}
      .gutter-box {{ fill: #FEF3C7; opacity: 0.4; stroke: #F59E0B; stroke-width: 0.1; stroke-dasharray: 0.5, 0.5; }}
      .info-text {{ font-family: '{primary_font}', Helvetica, Arial, sans-serif; font-size: 2.2px; fill: #64748B; }}
      .header-title {{ font-family: '{primary_font}', Helvetica, Arial, sans-serif; font-size: 2.8px; font-weight: bold; fill: #0F172A; }}
      .ladder-text {{ font-family: '{primary_font}', Helvetica, Arial, sans-serif; fill: #334155; }}
      .danger-text {{ font-family: '{primary_font}', Helvetica, Arial, sans-serif; font-size: 1.8px; font-weight: bold; fill: #E11D48; }}
    </style>
  </defs>

  <!-- ===================================================================== -->
  <!-- LAYER 1: GUIDES, MARGINS & COMPLIANCE REFERENCES (LOCKED)            -->
  <!-- ===================================================================== -->
  <g
     inkscape:groupmode="layer"
     inkscape:label="Guides and Compliance (Template)"
     id="layer-guides"
     style="display:inline;">

    <!-- Outer Physical Canvas Boundary -->
    <rect
       x="0"
       y="0"
       width="{width_mm:.2f}"
       height="{height_mm:.2f}"
       fill="#FFFFFF"
       stroke="#CBD5E1"
       stroke-width="0.3" />

    <!-- Safe Margin Boundary (2 mm inside) -->
    <rect
       x="2.0"
       y="2.0"
       width="{width_mm - 4.0:.2f}"
       height="{height_mm - 4.0:.2f}"
       class="margin-box" />

    <!-- Top Metadata Header -->
    <text x="3.0" y="5.0" class="header-title">{journal_name} — {col_desc}</text>
    <text x="3.0" y="8.0" class="info-text">
      Canvas: {width_mm:.1f} × {height_mm:.1f} mm | Min Gutter: {gutter_size:.1f} mm | Min Font: {sizes['min_allowed_size']} pt | Line Art: {export['resolution_dpi']['line_art']} DPI
    </text>

    <!-- Visual Panel Boundary Guides (Equal Dual Panel Split Sample) -->
    <rect
       x="3.0"
       y="11.0"
       width="{(width_mm - 6.0 - gutter_size) / 2:.2f}"
       height="{height_mm - 22.0:.2f}"
       class="guide-line" />
    <rect
       x="{3.0 + (width_mm - 6.0 - gutter_size) / 2 + gutter_size:.2f}"
       y="11.0"
       width="{(width_mm - 6.0 - gutter_size) / 2:.2f}"
       height="{height_mm - 22.0:.2f}"
       class="guide-line" />

    <!-- Gutter Zone Indicator -->
    <rect
       x="{3.0 + (width_mm - 6.0 - gutter_size) / 2:.2f}"
       y="11.0"
       width="{gutter_size:.2f}"
       height="{height_mm - 22.0:.2f}"
       class="gutter-box">
      <title>Minimum Gutter: {gutter_size} mm</title>
    </rect>

    <!-- Typographical Size Scale Reference (Side Ladder) -->
    <g transform="translate({width_mm - 28.0:.2f}, 15.0)">
      <text x="0" y="0" class="info-text" style="font-weight: bold;">Size Scale:</text>
      <text x="0" y="4.0" class="ladder-text" style="font-size: {sizes['panel_label']['size'] * 0.3528:.2f}px; font-weight: bold;">{panel_sample} ({sizes['panel_label']['size']} pt)</text>
      <text x="0" y="7.5" class="ladder-text" style="font-size: {sizes['axis_title']['size'] * 0.3528:.2f}px;">Title ({sizes['axis_title']['size']} pt)</text>
      <text x="0" y="10.5" class="ladder-text" style="font-size: {sizes['tick_label']['size'] * 0.3528:.2f}px;">Tick ({sizes['tick_label']['size']} pt)</text>
      <text x="0" y="13.5" class="danger-text">Floor: {sizes['min_allowed_size']} pt</text>
    </g>

    <!-- Embedded Color Swatches ({palette_name}) -->
    <text x="4.0" y="{height_mm - 9.0:.2f}" class="info-text" style="font-size: 1.8px; font-weight: bold;">
      {palette_name} Swatches (Eye-dropper ready):
    </text>
    <g id="palette-swatches">
      {swatches_block}
    </g>

    <!-- AI Disclosure Policy Watermark -->
    <text x="{width_mm - 4.0:.2f}" y="{height_mm - 3.5:.2f}" text-anchor="end" class="info-text" style="font-size: 1.7px;">
      AI Policy: No generative AI images. Disclose text/code in {ai['preferred_disclosure_placement']}.
    </text>
  </g>

  <!-- ===================================================================== -->
  <!-- LAYER 2: USER ARTWORK (ACTIVE / UNLOCKED)                             -->
  <!-- Place your vector figures, plots, and annotations here                -->
  <!-- ===================================================================== -->
  <g
     inkscape:groupmode="layer"
     inkscape:label="Artwork (Draw Here)"
     id="layer-artwork"
     style="display:inline;">
    <!-- Paste your plots and artwork panels into this layer -->
  </g>

</svg>
"""
    return svg_content


def save_svg_grid(
    journal_data: Dict[str, Any],
    output_path: Path,
    column: str = "single_column",
    height_mm: Optional[float] = None,
    palette_name: str = "Okabe-Ito",
) -> Path:
    """Generate and write SVG grid template to disk."""
    content = generate_svg_grid_content(journal_data, column, height_mm, palette_name)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)
    return output_path

"""
Matplotlib .mplstyle generator for scientific journal compliance templates.
Produces production-grade, publication-ready stylesheets adhering to publisher guidelines.
"""

from pathlib import Path
from typing import Dict, Any, Tuple, Optional

# Curated accessible palettes
ACCESSIBLE_PALETTES: Dict[str, list[str]] = {
    "Okabe-Ito": [
        "#0072B2",  # Blue
        "#D55E00",  # Vermilion
        "#009E73",  # Bluish Green
        "#F0E442",  # Yellow
        "#56B4E9",  # Sky Blue
        "#E69F00",  # Orange
        "#CC79A7",  # Reddish Purple
        "#000000",  # Black
    ],
    "Viridis": [
        "#440154",  # Deep Purple
        "#3B528B",  # Navy Blue
        "#21918C",  # Viridis Teal
        "#5EC962",  # Spring Green
        "#FDE725",  # Lemon Yellow
    ],
    "Tol-Bright": [
        "#4477AA",  # Blue
        "#66CCEE",  # Cyan
        "#228833",  # Green
        "#CCBB44",  # Yellow
        "#EE6677",  # Red
        "#AA3377",  # Purple
        "#BBBBBB",  # Grey
    ]
}


def get_palette_colors(palette_name: str = "Okabe-Ito") -> list[str]:
    """Retrieve list of hex codes for the specified palette."""
    return ACCESSIBLE_PALETTES.get(palette_name, ACCESSIBLE_PALETTES["Okabe-Ito"])


def generate_mplstyle_content(journal_data: Dict[str, Any], palette_name: str = "Okabe-Ito") -> str:
    """
    Generate the text content of a compliant Matplotlib .mplstyle stylesheet.
    """
    meta = journal_data["metadata"]
    geom = journal_data["figure_geometry"]
    typo = journal_data["figure_typography"]
    sizes = typo["font_sizes"]
    weights = journal_data["line_weights"]
    export = journal_data["export_requirements"]
    
    primary_font = typo["family_preferences"]["primary"]
    fallback_fonts = typo["family_preferences"]["fallback"]
    font_family_type = "serif" if "Times" in primary_font else "sans-serif"
    
    # Combined font search list
    all_fonts = [primary_font] + [f for f in fallback_fonts if f != primary_font]
    if "DejaVu Sans" not in all_fonts and font_family_type == "sans-serif":
        all_fonts.append("DejaVu Sans")
    if "DejaVu Serif" not in all_fonts and font_family_type == "serif":
        all_fonts.append("DejaVu Serif")
    font_list_str = ", ".join(all_fonts)

    # Color palette (strip '#' so matplotlib parser does not treat hex values as comments)
    colors = get_palette_colors(palette_name)
    color_cycler_str = ", ".join(f"'{c.lstrip('#')}'" for c in colors)

    single_mm = geom["column_widths"]["single_column"]["width"]
    single_in = single_mm / 25.4
    double_mm = geom["column_widths"]["double_column"]["width"]
    double_in = double_mm / 25.4

    content = f"""# ==============================================================================
# Matplotlib Stylesheet: {meta['journal_name']}
# Publisher: {meta['publisher']}
# Guidelines: {meta['guidelines_url']}
# Last Verified: {meta['last_verified']}
# ==============================================================================
# Sizing Reference:
#   Single column width: {single_mm:.1f} mm ({single_in:.2f} in)
#   Double column width: {double_mm:.1f} mm ({double_in:.2f} in)
#   Max figure height:   {geom['max_height']:.1f} mm ({geom['max_height'] / 25.4:.2f} in)
# ==============================================================================

# Font Configuration
font.family: {font_family_type}
font.{font_family_type}: {font_list_str}
font.size: {sizes['tick_label']['size']}

# Axes & Titles
axes.labelsize: {sizes['axis_title']['size']}
axes.labelweight: normal
axes.titlesize: {sizes['panel_label']['size']}
axes.titleweight: bold
axes.titlepad: 6.0
axes.labelpad: 4.0

# Line Weights & Spines
axes.linewidth: {weights['axis_lines']}
axes.spines.top: False
axes.spines.right: False
axes.spines.left: True
axes.spines.bottom: True

# Ticks Configuration
xtick.top: False
xtick.bottom: True
xtick.direction: out
xtick.major.size: 3.5
xtick.major.width: {weights['tick_marks']}
xtick.minor.size: 2.0
xtick.minor.width: {weights['min_allowed_weight']}
xtick.labelsize: {sizes['tick_label']['size']}

ytick.right: False
ytick.left: True
ytick.direction: out
ytick.major.size: 3.5
ytick.major.width: {weights['tick_marks']}
ytick.minor.size: 2.0
ytick.minor.width: {weights['min_allowed_weight']}
ytick.labelsize: {sizes['tick_label']['size']}

# Plot Lines & Markers
lines.linewidth: {weights['data_lines_normal']}
lines.markersize: 4.5
lines.markeredgewidth: {weights['axis_lines']}
patch.linewidth: {weights['axis_lines']}

# Grid Lines
grid.linewidth: {weights['grid_lines']}
grid.linestyle: --
grid.alpha: 0.6

# Legend Configuration
legend.fontsize: {sizes['legend_text']['size']}
legend.title_fontsize: {sizes['legend_title']['size']}
legend.frameon: False
legend.borderaxespad: 0.5
legend.handlelength: 1.5
legend.handleheight: 0.7
legend.handletextpad: 0.5

# Color Palette ({palette_name} - Color-Blind Safe)
axes.prop_cycle: cycler('color', [{color_cycler_str}])

# Figure Canvas & DPI
figure.dpi: 300
figure.autolayout: False
figure.titlesize: {sizes['panel_label']['size']}
figure.titleweight: bold

# Production Export Settings (Vector & TrueType embedding)
savefig.dpi: {export['resolution_dpi']['line_art']}
savefig.format: pdf
savefig.bbox: tight
savefig.pad_inches: 0.02
savefig.transparent: False

# Embed TrueType / PostScript fonts directly (Do NOT rasterize to Type 3 bitmap)
pdf.fonttype: 42
ps.fonttype: 42
svg.fonttype: path
"""
    return content


def get_figure_dimensions(
    journal_data: Dict[str, Any],
    column: str = "single_column",
    aspect_ratio: float = 4 / 3,
    height_mm: Optional[float] = None,
) -> Tuple[float, float]:
    """
    Calculate publication figure dimensions in inches suitable for plt.subplots(figsize=(w, h)).
    
    Args:
        journal_data: Journal template dictionary.
        column: 'single_column', 'one_and_half_column', or 'double_column'.
        aspect_ratio: Width / Height ratio (defaults to 1.33).
        height_mm: Explicit height in millimeters if specified.
        
    Returns:
        (width_inches, height_inches)
    """
    geom = journal_data["figure_geometry"]
    col_widths = geom["column_widths"]
    if column not in col_widths:
        column = "single_column"
        
    width_mm = col_widths[column]["width"]
    max_height_mm = geom["max_height"]
    
    if height_mm is None:
        target_height_mm = width_mm / aspect_ratio
    else:
        target_height_mm = height_mm
        
    if target_height_mm > max_height_mm:
        target_height_mm = max_height_mm
        
    width_in = width_mm / 25.4
    height_in = target_height_mm / 25.4
    return (round(width_in, 3), round(height_in, 3))


def save_mplstyle(
    journal_data: Dict[str, Any],
    output_path: Path,
    palette_name: str = "Okabe-Ito"
) -> Path:
    """Generate and write .mplstyle file to disk."""
    content = generate_mplstyle_content(journal_data, palette_name)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)
    return output_path

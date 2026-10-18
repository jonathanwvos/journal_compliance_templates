"""
Rust Plotters theme and compliance generator for scientific journal compliance templates.
Produces standalone, production-ready Rust modules adhering to publisher guidelines.
"""

from pathlib import Path
from typing import Dict, Any, List, Tuple
from journal_compliance_templates.exporters.figures.mplstyle_generator import (
    ACCESSIBLE_PALETTES,
    get_palette_colors,
)


COLOR_NAMES: Dict[str, str] = {
    "#0072B2": "Blue",
    "#D55E00": "Vermilion",
    "#009E73": "Bluish Green",
    "#F0E442": "Yellow",
    "#56B4E9": "Sky Blue",
    "#E69F00": "Orange",
    "#CC79A7": "Reddish Purple",
    "#000000": "Black",
    "#440154": "Deep Purple",
    "#3B528B": "Navy Blue",
    "#21918C": "Viridis Teal",
    "#5EC962": "Spring Green",
    "#FDE725": "Lemon Yellow",
    "#4477AA": "Tol Blue",
    "#66CCEE": "Tol Cyan",
    "#228833": "Tol Green",
    "#CCBB44": "Tol Yellow",
    "#EE6677": "Tol Red",
    "#AA3377": "Tol Purple",
    "#BBBBBB": "Tol Grey",
}


def hex_to_rgb(hex_str: str) -> Tuple[int, int, int]:
    h = hex_str.lstrip("#")
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def generate_rust_theme_content(journal_data: Dict[str, Any], palette_name: str = "Okabe-Ito") -> str:
    """
    Generate a standalone Rust module providing constants and plotters configuration
    for the specified journal template.
    """
    meta = journal_data["metadata"]
    geom = journal_data["figure_geometry"]
    typo = journal_data["figure_typography"]
    sizes = typo["font_sizes"]
    weights = journal_data["line_weights"]
    export = journal_data["export_requirements"]

    col_widths = geom.get("column_widths", {})
    single_col = col_widths.get("single_column", {}).get("width", 89.0)
    double_col = col_widths.get("double_column", {}).get("width", 180.0)
    has_15 = "one_and_half_column" in col_widths
    one_half_col = col_widths.get("one_and_half_column", {}).get("width", 120.0) if has_15 else 0.0

    primary_font = typo["family_preferences"]["primary"]
    dpi = export.get("resolution_dpi", {}).get("line_art", 300)

    # Compute pixel sizes at 300 DPI (for standard raster rendering)
    single_px_w = round((single_col / 25.4) * 300)
    single_px_h = round(single_px_w * 0.75)
    double_px_w = round((double_col / 25.4) * 300)
    double_px_h = round(double_px_w * 0.60)

    hex_colors = get_palette_colors(palette_name)

    palette_entries = []
    for h in hex_colors:
        r, g, b = hex_to_rgb(h)
        c_name = COLOR_NAMES.get(h.upper(), "Color")
        palette_entries.append(f"    (plotters::style::RGBColor({r}, {g}, {b}), \"{h}\", \"{c_name}\"),")

    palette_lines = "\n".join(palette_entries)

    optional_15_const = f"pub const ONE_AND_HALF_COLUMN_WIDTH_MM: f64 = {one_half_col:.1f};\n" if has_15 else ""

    content = f"""//! Production Rust Plotters Compliance Module for {meta['journal_name']}
//! Publisher: {meta['publisher']}
//! Official Guidelines: {meta['guidelines_url']}
//!
//! Generated automatically by Journal Compliance Templates.
//! Add to your Cargo.toml:
//! [dependencies]
//! plotters = {{ version = "0.3", default-features = false, features = ["svg_backend", "bitmap_backend", "line_series"] }}

use plotters::prelude::*;
use plotters::style::RGBColor;

// =============================================================================
// Figure Geometry Specifications
// =============================================================================
pub const JOURNAL_NAME: &str = "{meta['journal_name']}";
pub const PUBLISHER: &str = "{meta['publisher']}";
pub const SINGLE_COLUMN_WIDTH_MM: f64 = {single_col:.1f};
{optional_15_const}pub const DOUBLE_COLUMN_WIDTH_MM: f64 = {double_col:.1f};
pub const MAX_HEIGHT_MM: f64 = {geom['max_height']:.1f};
pub const TARGET_LINE_DPI: u32 = {dpi};

// Recommended raster canvas sizes at 300 DPI
pub const SINGLE_COLUMN_PX: (u32, u32) = ({single_px_w}, {single_px_h});
pub const DOUBLE_COLUMN_PX: (u32, u32) = ({double_px_w}, {double_px_h});

// =============================================================================
// Typography Specifications (Points)
// =============================================================================
pub const PRIMARY_FONT: &str = "{primary_font}";
pub const PANEL_LABEL_FONT_SIZE: f64 = {sizes['panel_label']['size']:.1f};
pub const AXIS_TITLE_FONT_SIZE: f64 = {sizes['axis_title']['size']:.1f};
pub const TICK_LABEL_FONT_SIZE: f64 = {sizes['tick_label']['size']:.1f};
pub const LEGEND_TEXT_FONT_SIZE: f64 = {sizes['legend_text']['size']:.1f};
pub const MIN_ALLOWED_FONT_SIZE: f64 = {sizes['min_allowed_size']:.1f};

// =============================================================================
// Line Weight Specifications (Points)
// =============================================================================
pub const AXIS_LINE_WIDTH: f64 = {weights['axis_lines']:.2f};
pub const TICK_MARK_WIDTH: f64 = {weights['tick_marks']:.2f};
pub const DATA_LINE_WIDTH: f64 = {weights['data_lines_normal']:.2f};
pub const MIN_ALLOWED_LINE_WIDTH: f64 = {weights['min_allowed_weight']:.2f};

// =============================================================================
// Accessible Color Palette: {palette_name} ({len(hex_colors)} colors)
// =============================================================================
pub const PALETTE: &[(RGBColor, &str, &str)] = &[
{palette_lines}
];

/// Retrieve palette colors as a vector of RGBColor.
pub fn get_palette() -> Vec<RGBColor> {{
    PALETTE.iter().map(|(c, _, _)| *c).collect()
}}

/// Primary highlight color from the selected palette.
pub fn primary_color() -> RGBColor {{
    PALETTE[0].0
}}

/// Secondary highlight color from the selected palette.
pub fn secondary_color() -> RGBColor {{
    if PALETTE.len() > 1 {{
        PALETTE[1].0
    }} else {{
        PALETTE[0].0
    }}
}}

/// Returns compliant font style description for axis labels.
pub fn axis_title_style<'a>() -> TextStyle<'a> {{
    (PRIMARY_FONT, AXIS_TITLE_FONT_SIZE).into()
}}

/// Returns compliant font style description for tick marks.
pub fn tick_label_style<'a>() -> TextStyle<'a> {{
    (PRIMARY_FONT, TICK_LABEL_FONT_SIZE).into()
}}
"""
    return content


def save_rust_theme(journal_data: Dict[str, Any], output_path: Path, palette_name: str = "Okabe-Ito") -> Path:
    """Generate and write the Rust theme module to disk."""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    content = generate_rust_theme_content(journal_data, palette_name=palette_name)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)
    return output_path

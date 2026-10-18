//! Production Rust Plotters Compliance Module for Journal of the American Chemical Society
//! Publisher: American Chemical Society (ACS)
//! Official Guidelines: https://publish.acs.org/publish/author_guidelines?coden=jacsat
//!
//! Generated automatically by Journal Compliance Templates.
//! Add to your Cargo.toml:
//! [dependencies]
//! plotters = { version = "0.3", default-features = false, features = ["svg_backend", "bitmap_backend", "line_series"] }

use plotters::prelude::*;
use plotters::style::RGBColor;

// =============================================================================
// Figure Geometry Specifications
// =============================================================================
pub const JOURNAL_NAME: &str = "Journal of the American Chemical Society";
pub const PUBLISHER: &str = "American Chemical Society (ACS)";
pub const SINGLE_COLUMN_WIDTH_MM: f64 = 82.5;
pub const ONE_AND_HALF_COLUMN_WIDTH_MM: f64 = 114.0;
pub const DOUBLE_COLUMN_WIDTH_MM: f64 = 177.8;
pub const MAX_HEIGHT_MM: f64 = 232.8;
pub const TARGET_LINE_DPI: u32 = 1200;

// Recommended raster canvas sizes at 300 DPI
pub const SINGLE_COLUMN_PX: (u32, u32) = (974, 730);
pub const DOUBLE_COLUMN_PX: (u32, u32) = (2100, 1260);

// =============================================================================
// Typography Specifications (Points)
// =============================================================================
pub const PRIMARY_FONT: &str = "Arial";
pub const PANEL_LABEL_FONT_SIZE: f64 = 9.0;
pub const AXIS_TITLE_FONT_SIZE: f64 = 8.0;
pub const TICK_LABEL_FONT_SIZE: f64 = 7.0;
pub const LEGEND_TEXT_FONT_SIZE: f64 = 7.0;
pub const MIN_ALLOWED_FONT_SIZE: f64 = 6.0;

// =============================================================================
// Line Weight Specifications (Points)
// =============================================================================
pub const AXIS_LINE_WIDTH: f64 = 0.50;
pub const TICK_MARK_WIDTH: f64 = 0.50;
pub const DATA_LINE_WIDTH: f64 = 1.00;
pub const MIN_ALLOWED_LINE_WIDTH: f64 = 0.50;

// =============================================================================
// Accessible Color Palette: Okabe-Ito (8 colors)
// =============================================================================
pub const PALETTE: &[(RGBColor, &str, &str)] = &[
    (plotters::style::RGBColor(0, 114, 178), "#0072B2", "Blue"),
    (plotters::style::RGBColor(213, 94, 0), "#D55E00", "Vermilion"),
    (plotters::style::RGBColor(0, 158, 115), "#009E73", "Bluish Green"),
    (plotters::style::RGBColor(240, 228, 66), "#F0E442", "Yellow"),
    (plotters::style::RGBColor(86, 180, 233), "#56B4E9", "Sky Blue"),
    (plotters::style::RGBColor(230, 159, 0), "#E69F00", "Orange"),
    (plotters::style::RGBColor(204, 121, 167), "#CC79A7", "Reddish Purple"),
    (plotters::style::RGBColor(0, 0, 0), "#000000", "Black"),
];

/// Retrieve palette colors as a vector of RGBColor.
pub fn get_palette() -> Vec<RGBColor> {
    PALETTE.iter().map(|(c, _, _)| *c).collect()
}

/// Primary highlight color from the selected palette.
pub fn primary_color() -> RGBColor {
    PALETTE[0].0
}

/// Secondary highlight color from the selected palette.
pub fn secondary_color() -> RGBColor {
    if PALETTE.len() > 1 {
        PALETTE[1].0
    } else {
        PALETTE[0].0
    }
}

/// Returns compliant font style description for axis labels.
pub fn axis_title_style<'a>() -> TextStyle<'a> {
    (PRIMARY_FONT, AXIS_TITLE_FONT_SIZE).into()
}

/// Returns compliant font style description for tick marks.
pub fn tick_label_style<'a>() -> TextStyle<'a> {
    (PRIMARY_FONT, TICK_LABEL_FONT_SIZE).into()
}

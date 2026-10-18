//! Production Rust Plotters Compliance Module for Science
//! Publisher: American Association for the Advancement of Science (AAAS)
//! Official Guidelines: https://www.science.org/content/page/science-information-authors
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
pub const JOURNAL_NAME: &str = "Science";
pub const PUBLISHER: &str = "American Association for the Advancement of Science (AAAS)";
pub const SINGLE_COLUMN_WIDTH_MM: f64 = 55.0;
pub const ONE_AND_HALF_COLUMN_WIDTH_MM: f64 = 120.0;
pub const DOUBLE_COLUMN_WIDTH_MM: f64 = 175.0;
pub const MAX_HEIGHT_MM: f64 = 230.0;
pub const TARGET_LINE_DPI: u32 = 1000;

// Recommended raster canvas sizes at 300 DPI
pub const SINGLE_COLUMN_PX: (u32, u32) = (650, 488);
pub const DOUBLE_COLUMN_PX: (u32, u32) = (2067, 1240);

// =============================================================================
// Typography Specifications (Points)
// =============================================================================
pub const PRIMARY_FONT: &str = "Helvetica";
pub const PANEL_LABEL_FONT_SIZE: f64 = 9.0;
pub const AXIS_TITLE_FONT_SIZE: f64 = 7.5;
pub const TICK_LABEL_FONT_SIZE: f64 = 6.5;
pub const LEGEND_TEXT_FONT_SIZE: f64 = 6.5;
pub const MIN_ALLOWED_FONT_SIZE: f64 = 5.5;

// =============================================================================
// Line Weight Specifications (Points)
// =============================================================================
pub const AXIS_LINE_WIDTH: f64 = 0.50;
pub const TICK_MARK_WIDTH: f64 = 0.50;
pub const DATA_LINE_WIDTH: f64 = 1.00;
pub const MIN_ALLOWED_LINE_WIDTH: f64 = 0.25;

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

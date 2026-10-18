//! Bridge connecting JournalTemplate specifications to the Plotters visualization library.

use crate::models::JournalTemplate;
use crate::palettes::{get_palette, Palette, OKABE_ITO};
use plotters::prelude::*;
use plotters::style::RGBColor;

#[derive(Debug, Clone)]
pub struct JournalPlotConfig {
    pub journal_name: String,
    pub width_mm: f64,
    pub max_height_mm: f64,
    pub width_px: u32,
    pub height_px: u32,
    pub font_family: String,
    pub panel_label_size: f64,
    pub axis_title_size: f64,
    pub tick_label_size: f64,
    pub min_allowed_font_size: f64,
    pub axis_line_width: f64,
    pub data_line_width: f64,
    pub palette_colors: Vec<RGBColor>,
}

impl JournalPlotConfig {
    /// Create a Plotters configuration for a template with a given column layout and DPI.
    pub fn from_template(
        template: &JournalTemplate,
        column_key: &str,
        dpi: u32,
        palette_name: Option<&str>,
    ) -> Self {
        let geom = &template.figure_geometry;
        let col_detail = geom
            .column_widths
            .get(column_key)
            .or_else(|| geom.column_widths.get("single_column"))
            .expect("Valid column layout required");

        let width_mm = col_detail.width;
        let width_px = ((width_mm / 25.4) * (dpi as f64)).round() as u32;
        // Default height with 4:3 or ~0.7 aspect ratio, capped at max_height_mm
        let height_mm = (width_mm * 0.7).min(geom.max_height);
        let height_px = ((height_mm / 25.4) * (dpi as f64)).round() as u32;

        let typo = &template.figure_typography;
        let font_family = typo.family_preferences.primary.clone();
        let sizes = &typo.font_sizes;

        let palette: &Palette = palette_name
            .and_then(get_palette)
            .unwrap_or(&OKABE_ITO);

        Self {
            journal_name: template.metadata.journal_name.clone(),
            width_mm,
            max_height_mm: geom.max_height,
            width_px,
            height_px,
            font_family,
            panel_label_size: sizes.panel_label.size,
            axis_title_size: sizes.axis_title.size,
            tick_label_size: sizes.tick_label.size,
            min_allowed_font_size: sizes.min_allowed_size,
            axis_line_width: template.line_weights.axis_lines,
            data_line_width: template.line_weights.data_lines_normal,
            palette_colors: palette.to_rgb_colors(),
        }
    }

    /// Build a font style description for axis labels
    pub fn axis_title_style<'a>(&'a self) -> TextStyle<'a> {
        (self.font_family.as_str(), self.axis_title_size).into()
    }

    /// Build a font style description for tick marks
    pub fn tick_label_style<'a>(&'a self) -> TextStyle<'a> {
        (self.font_family.as_str(), self.tick_label_size).into()
    }

    /// Primary palette color (first color in selected palette)
    pub fn primary_color(&self) -> RGBColor {
        self.palette_colors
            .first()
            .copied()
            .unwrap_or(RGBColor(0, 114, 178))
    }

    /// Secondary palette color
    pub fn secondary_color(&self) -> RGBColor {
        if self.palette_colors.len() > 1 {
            self.palette_colors[1]
        } else {
            self.primary_color()
        }
    }
}

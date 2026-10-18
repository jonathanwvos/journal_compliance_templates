//! Curated accessible scientific color palettes with color conversion and plotters integration.

use plotters::style::RGBColor;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct PaletteColor {
    pub name: &'static str,
    pub hex: &'static str,
    pub r: u8,
    pub g: u8,
    pub b: u8,
}

impl PaletteColor {
    pub const fn new(name: &'static str, hex: &'static str, r: u8, g: u8, b: u8) -> Self {
        Self { name, hex, r, g, b }
    }

    pub fn to_rgb_color(&self) -> RGBColor {
        RGBColor(self.r, self.g, self.b)
    }

    pub fn normalized_rgb(&self) -> (f64, f64, f64) {
        (
            self.r as f64 / 255.0,
            self.g as f64 / 255.0,
            self.b as f64 / 255.0,
        )
    }
}

#[derive(Debug, Clone, Serialize, PartialEq)]
pub struct Palette {
    pub name: &'static str,
    pub colors: &'static [PaletteColor],
}

impl Palette {
    pub fn to_rgb_colors(&self) -> Vec<RGBColor> {
        self.colors.iter().map(|c| c.to_rgb_color()).collect()
    }

    pub fn hex_codes(&self) -> Vec<&'static str> {
        self.colors.iter().map(|c| c.hex).collect()
    }
}

// Okabe-Ito (Nature Standard)
pub static OKABE_ITO_COLORS: [PaletteColor; 8] = [
    PaletteColor::new("Blue", "#0072B2", 0, 114, 178),
    PaletteColor::new("Vermilion", "#D55E00", 213, 94, 0),
    PaletteColor::new("Bluish Green", "#009E73", 0, 158, 115),
    PaletteColor::new("Yellow", "#F0E442", 240, 228, 66),
    PaletteColor::new("Sky Blue", "#56B4E9", 86, 180, 233),
    PaletteColor::new("Orange", "#E69F00", 230, 159, 0),
    PaletteColor::new("Reddish Purple", "#CC79A7", 204, 121, 167),
    PaletteColor::new("Black", "#000000", 0, 0, 0),
];

pub static OKABE_ITO: Palette = Palette {
    name: "Okabe-Ito",
    colors: &OKABE_ITO_COLORS,
};

// Viridis (Perceptually Uniform)
pub static VIRIDIS_COLORS: [PaletteColor; 5] = [
    PaletteColor::new("Deep Purple", "#440154", 68, 1, 84),
    PaletteColor::new("Navy Blue", "#3B528B", 59, 82, 139),
    PaletteColor::new("Viridis Teal", "#21918C", 33, 145, 140),
    PaletteColor::new("Spring Green", "#5EC962", 94, 201, 98),
    PaletteColor::new("Lemon Yellow", "#FDE725", 253, 231, 37),
];

pub static VIRIDIS: Palette = Palette {
    name: "Viridis",
    colors: &VIRIDIS_COLORS,
};

// Tol Bright (High Contrast)
pub static TOL_BRIGHT_COLORS: [PaletteColor; 7] = [
    PaletteColor::new("Tol Blue", "#4477AA", 68, 119, 170),
    PaletteColor::new("Tol Cyan", "#66CCEE", 102, 204, 238),
    PaletteColor::new("Tol Green", "#228833", 34, 136, 51),
    PaletteColor::new("Tol Yellow", "#CCBB44", 204, 187, 68),
    PaletteColor::new("Tol Red", "#EE6677", 238, 102, 119),
    PaletteColor::new("Tol Purple", "#AA3377", 170, 51, 119),
    PaletteColor::new("Tol Grey", "#BBBBBB", 187, 187, 187),
];

pub static TOL_BRIGHT: Palette = Palette {
    name: "Tol-Bright",
    colors: &TOL_BRIGHT_COLORS,
};

pub static ALL_PALETTES: [&Palette; 3] = [&OKABE_ITO, &VIRIDIS, &TOL_BRIGHT];

pub fn get_palette(name: &str) -> Option<&'static Palette> {
    let lower = name.to_lowercase().replace(['-', '_', ' '], "");
    match lower.as_str() {
        "okabeito" => Some(&OKABE_ITO),
        "viridis" => Some(&VIRIDIS),
        "tolbright" => Some(&TOL_BRIGHT),
        _ => None,
    }
}

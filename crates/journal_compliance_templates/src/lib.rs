//! # Journal Compliance Templates (Rust)
//!
//! Standardized, machine-readable formatting & figure compliance specifications
//! for major scientific publishers (Nature Portfolio, IEEE, ACS, AAAS/Science, Cell Press, ASCO).
//!
//! This crate provides strongly-typed models, built-in accessible color palettes (Okabe-Ito,
//! Viridis, Tol-Bright), and a bridge for the Plotters visualization engine.
//!
//! ## Example
//!
//! ```rust
//! use journal_compliance_templates::{get_builtin, JournalPlotConfig};
//!
//! let template = get_builtin("nature").expect("Nature template exists");
//! assert_eq!(template.metadata.journal_name, "Nature");
//!
//! let config = JournalPlotConfig::from_template(&template, "single_column", 300, Some("Okabe-Ito"));
//! assert_eq!(config.width_mm, 89.0);
//! ```

pub mod loader;
pub mod models;
pub mod palettes;
pub mod plotters_bridge;

pub use loader::{from_file, from_json_str, from_yaml_str, get_builtin, list_builtin};
pub use models::*;
pub use palettes::{
    get_palette, Palette, PaletteColor, ALL_PALETTES, OKABE_ITO, TOL_BRIGHT, VIRIDIS,
};
pub use plotters_bridge::JournalPlotConfig;

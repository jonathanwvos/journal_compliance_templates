//! Data models for journal compliance specifications adhering to compliance_schema_v1.json.

use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct JournalTemplate {
    pub schema_version: String,
    pub metadata: Metadata,
    pub figure_geometry: FigureGeometry,
    pub figure_typography: FigureTypography,
    pub line_weights: LineWeights,
    pub panel_labeling: PanelLabeling,
    pub color_specifications: ColorSpecifications,
    pub export_requirements: ExportRequirements,
    pub manuscript_layout: ManuscriptLayout,
    pub ai_policy: AiPolicy,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub naming_conventions: Option<NamingConventions>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct NamingConventions {
    pub figures: Vec<NamingRule>,
    pub captions: Vec<NamingRule>,
    pub tables: Vec<NamingRule>,
    pub supplementary: Vec<NamingRule>,
    pub filenames: Vec<NamingRule>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub extended_data: Option<Vec<NamingRule>>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct NamingRule {
    pub id: String,
    pub guidance: String,
    pub status: NamingStatus,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub source_url: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub source_section: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub verified_on: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub pattern: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub numbering: Option<NamingNumbering>,
    pub examples: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum NamingStatus {
    PublisherRequirement,
    ProjectRecommendation,
    Unverified,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct NamingNumbering {
    pub style: NumberingStyle,
    pub start: u32,
    pub order: NumberingOrder,
    pub sequence: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum NumberingStyle {
    Arabic,
    RomanUpper,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum NumberingOrder {
    FirstCitation,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct Metadata {
    pub publisher: String,
    pub journal_name: String,
    #[serde(default)]
    pub issn: Option<String>,
    pub guidelines_url: String,
    pub last_verified: String,
    #[serde(default)]
    pub notes: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct FigureGeometry {
    pub default_unit: String,
    pub max_height: f64,
    pub column_widths: HashMap<String, ColumnWidthDetail>,
    #[serde(default)]
    pub panel_spacing: Option<PanelSpacing>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct ColumnWidthDetail {
    pub width: f64,
    pub description: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct PanelSpacing {
    #[serde(default)]
    pub minimum_gutter: Option<f64>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct FigureTypography {
    pub family_preferences: FamilyPreferences,
    pub font_sizes: FontSizes,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct FamilyPreferences {
    pub primary: String,
    pub fallback: Vec<String>,
    #[serde(default)]
    pub serif_alternative: Option<String>,
    #[serde(default)]
    pub symbol_font: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct FontSizes {
    pub unit: String,
    pub panel_label: FontSpec,
    pub axis_title: FontSpec,
    pub tick_label: FontSpec,
    #[serde(default)]
    pub legend_title: Option<FontSpec>,
    pub legend_text: FontSpec,
    #[serde(default)]
    pub annotation: Option<FontSpec>,
    pub min_allowed_size: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct FontSpec {
    pub size: f64,
    pub weight: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct LineWeights {
    pub unit: String,
    pub axis_lines: f64,
    pub tick_marks: f64,
    pub data_lines_normal: f64,
    #[serde(default)]
    pub data_lines_thick: Option<f64>,
    #[serde(default)]
    pub grid_lines: Option<f64>,
    pub min_allowed_weight: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct PanelLabeling {
    #[serde(rename = "case")]
    pub label_case: String,
    pub weight: String,
    #[serde(default)]
    pub punctuation: Option<String>,
    pub position: String,
    #[serde(default)]
    pub font_family: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct ColorSpecifications {
    pub accepted_modes: AcceptedModes,
    pub color_blind_safe_required: bool,
    #[serde(default)]
    pub recommended_palettes: Vec<String>,
    #[serde(default)]
    pub black_white_contrast_ratio: Option<f64>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct AcceptedModes {
    pub initial_submission: Vec<String>,
    pub final_production: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct ExportRequirements {
    pub preferred_vector_formats: Vec<VectorFormat>,
    pub accepted_raster_formats: Vec<RasterFormat>,
    pub resolution_dpi: ResolutionDpi,
    #[serde(default)]
    pub max_file_size_mb: Option<f64>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct VectorFormat {
    pub format: String,
    #[serde(default)]
    pub notes: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct RasterFormat {
    pub format: String,
    #[serde(default)]
    pub compression: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct ResolutionDpi {
    pub line_art: u32,
    pub combination_art: u32,
    pub photographic_halftone: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct ManuscriptLayout {
    pub page: PageLayout,
    pub spacing: SpacingLayout,
    pub body_typography: BodyTypography,
    #[serde(default)]
    pub heading_hierarchy: Option<HeadingHierarchy>,
    #[serde(default)]
    pub limits: Option<ManuscriptLimits>,
    pub required_sections: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct PageLayout {
    pub size: String,
    pub margins_mm: MarginsMm,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct MarginsMm {
    pub top: f64,
    pub bottom: f64,
    pub left: f64,
    pub right: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct SpacingLayout {
    pub line_spacing: String,
    pub line_numbering: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct BodyTypography {
    pub font_family: String,
    pub font_size_pt: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct HeadingHierarchy {
    #[serde(default)]
    pub title: Option<HeadingSpec>,
    #[serde(default)]
    pub h1: Option<HeadingSpec>,
    #[serde(default)]
    pub h2: Option<HeadingSpec>,
    #[serde(default)]
    pub h3: Option<HeadingSpec>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct HeadingSpec {
    pub size_pt: f64,
    pub weight: String,
    #[serde(default)]
    pub numbered: Option<bool>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct ManuscriptLimits {
    #[serde(default)]
    pub abstract_max_words: Option<u32>,
    #[serde(default)]
    pub main_text_max_words: Option<u32>,
    #[serde(default)]
    pub max_display_items: Option<u32>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct AiPolicy {
    pub authorship_eligible: bool,
    pub generative_imagery_allowed: bool,
    #[serde(default)]
    pub generative_imagery_exceptions: Option<String>,
    pub text_and_code_disclosure_required: bool,
    pub preferred_disclosure_placement: String,
    #[serde(default)]
    pub policy_url: Option<String>,
    pub official_statement_template: String,
}

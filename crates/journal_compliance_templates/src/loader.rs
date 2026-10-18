//! Template loading utilities for parsing YAML and JSON compliance specifications.

use crate::models::JournalTemplate;
use std::fs;
use std::path::Path;

pub const BUILTIN_NATURE_YAML: &str = include_str!("../../../templates/nature/nature.yaml");
pub const BUILTIN_IEEE_YAML: &str = include_str!("../../../templates/ieee/ieee_transactions.yaml");
pub const BUILTIN_JACS_YAML: &str = include_str!("../../../templates/acs/jacs.yaml");
pub const BUILTIN_SCIENCE_YAML: &str = include_str!("../../../templates/science/science.yaml");
pub const BUILTIN_CELL_YAML: &str = include_str!("../../../templates/elsevier/cell.yaml");
pub const BUILTIN_JCO_YAML: &str = include_str!("../../../templates/asco/jco.yaml");

pub static BUILTIN_KEYS: &[&str] = &["nature", "ieee", "jacs", "science", "cell", "jco"];

/// Parse a template from a YAML string.
pub fn from_yaml_str(yaml_str: &str) -> Result<JournalTemplate, serde_yaml::Error> {
    serde_yaml::from_str(yaml_str)
}

/// Parse a template from a JSON string.
pub fn from_json_str(json_str: &str) -> Result<JournalTemplate, serde_json::Error> {
    serde_json::from_str(json_str)
}

/// Load and parse a template file (supports .yaml, .yml, or .json based on extension).
pub fn from_file<P: AsRef<Path>>(path: P) -> Result<JournalTemplate, Box<dyn std::error::Error>> {
    let path_ref = path.as_ref();
    let content = fs::read_to_string(path_ref)?;
    if path_ref.extension().and_then(|s| s.to_str()) == Some("json") {
        Ok(from_json_str(&content)?)
    } else {
        Ok(from_yaml_str(&content)?)
    }
}

/// Retrieve a pre-compiled built-in journal template.
pub fn get_builtin(key: &str) -> Option<JournalTemplate> {
    let clean_key = key.to_lowercase().replace(['-', '_', ' '], "");
    let yaml = match clean_key.as_str() {
        "nature" => BUILTIN_NATURE_YAML,
        "ieee" | "ieeetransactions" => BUILTIN_IEEE_YAML,
        "jacs" | "acs" => BUILTIN_JACS_YAML,
        "science" | "aaas" => BUILTIN_SCIENCE_YAML,
        "cell" | "elsevier" => BUILTIN_CELL_YAML,
        "jco" | "asco" => BUILTIN_JCO_YAML,
        _ => return None,
    };
    from_yaml_str(yaml).ok()
}

/// List available built-in journal keys.
pub fn list_builtin() -> &'static [&'static str] {
    BUILTIN_KEYS
}

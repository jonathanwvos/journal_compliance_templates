use journal_compliance_templates::{
    get_builtin, list_builtin, JournalPlotConfig, OKABE_ITO, VIRIDIS, TOL_BRIGHT,
};
use plotters::prelude::*;
use std::fs;
use tempfile::NamedTempFile;

#[test]
fn test_all_builtin_templates_load_successfully() {
    let keys = list_builtin();
    assert_eq!(keys.len(), 6);

    for key in keys {
        let template = get_builtin(key)
            .unwrap_or_else(|| panic!("Failed to load built-in template for '{}'", key));
        assert_eq!(template.schema_version, "1.1.0");
        assert!(!template.metadata.journal_name.is_empty());
        assert!(!template.metadata.publisher.is_empty());
        assert!(template.figure_geometry.column_widths.contains_key("single_column"));
        assert!(template.figure_geometry.column_widths.contains_key("double_column"));
        assert!(template.figure_typography.font_sizes.min_allowed_size >= 4.0);
        assert!(template.line_weights.min_allowed_weight >= 0.25);
    }
}

#[test]
fn test_jco_specific_metrics() {
    let jco = get_builtin("jco").expect("JCO template should exist");
    assert_eq!(jco.metadata.journal_name, "Journal of Clinical Oncology");
    let single = jco.figure_geometry.column_widths.get("single_column").unwrap();
    assert_eq!(single.width, 84.6);
    let double = jco.figure_geometry.column_widths.get("double_column").unwrap();
    assert_eq!(double.width, 169.4);
    assert_eq!(jco.figure_typography.family_preferences.primary, "Arial");
    assert!(!jco.ai_policy.authorship_eligible);
    assert!(!jco.ai_policy.generative_imagery_allowed);
    assert!(jco.ai_policy.text_and_code_disclosure_required);
}

#[test]
fn test_naming_round_trip_and_legacy_compatibility() {
    use journal_compliance_templates::{from_json_str, from_yaml_str, NamingStatus, NumberingStyle};
    for key in list_builtin() {
        let template = get_builtin(key).expect("Template loads");
        let naming = template.naming_conventions.as_ref().expect("Naming guidance exists");
        assert_eq!(naming.extended_data.is_some(), *key == "nature");
        let json = serde_json::to_string(&template).expect("Serialize JSON");
        assert_eq!(from_json_str(&json).unwrap(), template);
        let yaml = serde_yaml::to_string(&template).expect("Serialize YAML");
        assert_eq!(from_yaml_str(&yaml).unwrap(), template);

        let mut legacy: serde_json::Value = serde_json::from_str(&json).unwrap();
        legacy.as_object_mut().unwrap().remove("naming_conventions");
        legacy["schema_version"] = "1.0.0".into();
        let loaded = from_json_str(&legacy.to_string()).unwrap();
        assert!(loaded.naming_conventions.is_none());
        assert!(serde_json::to_value(loaded).unwrap().get("naming_conventions").is_none());
    }
    let ieee = get_builtin("ieee").unwrap().naming_conventions.unwrap();
    assert_eq!(ieee.tables[0].status, NamingStatus::PublisherRequirement);
    assert_eq!(ieee.tables[0].numbering.as_ref().unwrap().style, NumberingStyle::RomanUpper);
    assert_eq!(ieee.tables[0].examples, ["TABLE I", "TABLE II", "TABLE III"]);
}

#[test]
fn test_accessible_palettes() {
    assert_eq!(OKABE_ITO.colors.len(), 8);
    assert_eq!(VIRIDIS.colors.len(), 5);
    assert_eq!(TOL_BRIGHT.colors.len(), 7);

    // Test first Okabe-Ito color is Blue #0072B2 (0, 114, 178)
    assert_eq!(OKABE_ITO.colors[0].hex, "#0072B2");
    assert_eq!(OKABE_ITO.colors[0].r, 0);
    assert_eq!(OKABE_ITO.colors[0].g, 114);
    assert_eq!(OKABE_ITO.colors[0].b, 178);

    let rgb_colors = OKABE_ITO.to_rgb_colors();
    assert_eq!(rgb_colors.len(), 8);
}

#[test]
fn test_plotters_bridge_svg_rendering() {
    let nature = get_builtin("nature").expect("Nature template exists");
    let config = JournalPlotConfig::from_template(&nature, "single_column", 300, Some("Okabe-Ito"));

    assert_eq!(config.width_mm, 89.0);
    assert!(config.width_px > 0);
    assert!(config.height_px > 0);

    let temp_file = NamedTempFile::new().expect("Create temporary file");
    let file_path = temp_file.path().with_extension("svg");

    {
        let root = SVGBackend::new(&file_path, (config.width_px, config.height_px)).into_drawing_area();
        root.fill(&WHITE).expect("Fill white background");

        let mut chart = ChartBuilder::on(&root)
            .caption(&config.journal_name, (config.font_family.as_str(), config.panel_label_size).into_font())
            .margin(10)
            .x_label_area_size(40)
            .y_label_area_size(40)
            .build_cartesian_2d(0.0..10.0, 0.0..100.0)
            .expect("Build cartesian 2d");

        chart
            .configure_mesh()
            .x_desc("Time (h)")
            .y_desc("Response (%)")
            .axis_style(ShapeStyle::from(&BLACK).stroke_width(config.axis_line_width as u32))
            .draw()
            .expect("Draw mesh");

        let primary_color = config.primary_color();
        chart
            .draw_series(LineSeries::new(
                (0..=10).map(|x| (x as f64, (x as f64).powi(2))),
                ShapeStyle::from(&primary_color).stroke_width(config.data_line_width as u32),
            ))
            .expect("Draw series");

        root.present().expect("Present root drawing area");
    }

    let svg_content = fs::read_to_string(&file_path).expect("Read generated SVG");
    assert!(svg_content.contains("<svg"));
    assert!(svg_content.contains("Nature"));

    let _ = fs::remove_file(file_path);
}

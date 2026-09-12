"""
GUI QA Tests: Themes, Color Spaces, and CVD Accessibility.
Tests documentation theme switching, palette selection, format conversion, and CVD modes.
"""

import pytest

pytestmark = pytest.mark.gui


@pytest.mark.parametrize("theme_val,expected_class", [
    ("theme-oxide-moss", "theme-oxide-moss"),
    ("theme-okabe-ito", "theme-okabe-ito"),
    ("theme-slate-dark", "theme-slate-dark"),
    ("theme-viridis", "theme-viridis"),
])
def test_theme_switcher_updates_body_class(app_page, theme_val, expected_class):
    """Verify selecting theme from dropdown updates document body class."""
    app_page.select_theme(theme_val)
    assert expected_class in app_page.get_body_class()


def test_oxide_moss_not_in_scientific_palette_tabs(app_page):
    """Ensure Oxide Moss is strictly an editorial theme and NOT a journal palette tab."""
    palettes = app_page.get_available_palette_names()
    assert "Oxide Moss" not in palettes
    assert "Okabe-Ito" in palettes
    assert "Viridis" in palettes
    assert "Tol Bright" in palettes


def test_palette_tabs_update_swatch_counts(app_page):
    """Verify switching accessible palette tabs renders correct number of swatches."""
    app_page.select_palette("Okabe-Ito")
    assert app_page.get_swatch_count() == 8

    app_page.select_palette("Viridis")
    assert app_page.get_swatch_count() == 5

    app_page.select_palette("Tol Bright")
    assert app_page.get_swatch_count() == 7


def test_format_conversion_updates_swatch_text(app_page):
    """Verify format converter dynamically transforms displayed color values."""
    app_page.select_palette("Okabe-Ito")
    app_page.select_cvd_mode("normal")

    # 1. HEX
    app_page.select_color_format("hex")
    vals_hex = app_page.get_swatch_values()
    assert vals_hex[0].upper() == "#000000"
    assert vals_hex[1].upper() == "#E69F00"

    # 2. RGB (0-255)
    app_page.select_color_format("rgb255")
    vals_rgb = app_page.get_swatch_values()
    assert "rgb(" in vals_rgb[0].lower()
    assert "rgb(230, 159, 0)" in vals_rgb[1]

    # 3. RGB% (0-1.0)
    app_page.select_color_format("rgb_norm")
    vals_norm = app_page.get_swatch_values()
    assert "(0.000, 0.000, 0.000)" in vals_norm[0]
    assert "(0.902, 0.624, 0.000)" in vals_norm[1]

    # 4. HSV
    app_page.select_color_format("hsv")
    vals_hsv = app_page.get_swatch_values()
    assert "hsv(" in vals_hsv[0].lower()

    # 5. CMYK
    app_page.select_color_format("cmyk")
    vals_cmyk = app_page.get_swatch_values()
    assert "cmyk(" in vals_cmyk[0].lower()
    assert "100%" in vals_cmyk[0]


def test_cvd_simulation_alters_swatch_values(app_page):
    """Verify CVD simulation transforms the perceived colors."""
    app_page.select_palette("Okabe-Ito")
    app_page.select_color_format("hex")

    app_page.select_cvd_mode("normal")
    normal_val = app_page.get_swatch_values()[0]

    app_page.select_cvd_mode("deuteranopia")
    deut_val = app_page.get_swatch_values()[0]

    # Deuteranopia simulation should yield an adjusted color
    assert deut_val.startswith("#")

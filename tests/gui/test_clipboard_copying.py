"""
GUI QA Tests: Clipboard Copy Actions.
Validates 1-click clipboard copy for AI statements, code snippets, and color palettes.
"""

import pytest

pytestmark = pytest.mark.gui


def test_copy_ai_disclosure_statement(app_page):
    """Verify clicking 'Copy Statement' copies declaration template to clipboard."""
    clipboard = app_page.copy_ai_statement()
    assert "During the preparation of this manuscript, the author(s) used" in clipboard
    assert "take full responsibility" in clipboard
    assert "Copied AI Disclosure Statement!" in app_page.get_toast_text()


@pytest.mark.parametrize("tab_key,expected_snippet_text", [
    ("matplotlib", "import matplotlib.pyplot as plt"),
    ("r_ggplot2", "library(ggplot2)"),
    ("latex", r"\usepackage{graphicx}"),
    ("yaml", "schema_version:"),
])
def test_copy_code_snippets_across_languages(app_page, tab_key, expected_snippet_text):
    """Verify copying code snippets across Matplotlib, R, LaTeX, and YAML tabs."""
    app_page.select_snippet_tab(tab_key)
    clipboard = app_page.copy_code_snippet()
    assert expected_snippet_text in clipboard
    assert "Copied code snippet!" in app_page.get_toast_text()


def test_copy_palette_includes_color_comments(app_page):
    """Verify copying entire palette includes helpful color name comments."""
    app_page.select_palette("Okabe-Ito")
    app_page.select_cvd_mode("normal")
    app_page.select_color_format("hex")

    clipboard = app_page.copy_palette_formatted()
    assert "#000000" in clipboard
    assert "Black" in clipboard
    assert "Orange" in clipboard


def test_quick_copy_palette_respects_format_without_defaulting_to_hex(app_page):
    """Verify quick copy buttons copy actual RGB, HSV, CMYK rather than HEX."""
    app_page.select_palette("Okabe-Ito")

    # RGB 0-255
    clip_rgb = app_page.copy_palette_quick("rgb255")
    assert "rgb(" in clip_rgb

    # RGB Normalized (0-1.0)
    clip_norm = app_page.copy_palette_quick("rgb_norm")
    assert "(0." in clip_norm or "(0.000" in clip_norm

    # HSV
    clip_hsv = app_page.copy_palette_quick("hsv")
    assert "hsv(" in clip_hsv

    # CMYK
    clip_cmyk = app_page.copy_palette_quick("cmyk")
    assert "cmyk(" in clip_cmyk


def test_copy_palette_with_cvd_simulation_preserves_simulated_values(app_page):
    """Verify copying palette under CVD simulation includes simulated values and header."""
    app_page.select_palette("Okabe-Ito")
    app_page.select_cvd_mode("deuteranopia")

    clipboard = app_page.copy_palette_formatted()
    assert "deuteranopia" in clipboard.lower()


def test_click_individual_swatch_card_copies_color(app_page):
    """Verify clicking an individual color swatch card copies that single color."""
    app_page.select_palette("Okabe-Ito")
    app_page.select_color_format("hex")
    app_page.select_cvd_mode("normal")

    clipboard = app_page.copy_swatch(index=0)
    assert clipboard.upper() == "#000000"
    assert "Copied Black" in app_page.get_toast_text()

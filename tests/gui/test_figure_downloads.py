"""
GUI QA Tests: Figure Asset 1-Click Downloads.
Validates that download buttons point to actual generated files and never 404.
"""

import pytest

pytestmark = pytest.mark.gui


def test_nature_figure_download_buttons_and_urls(app_page):
    """Verify Nature figure asset download buttons point to existing static files."""
    app_page.select_journal("nature")

    # 1. Matplotlib Stylesheet
    mpl_info = app_page.get_mplstyle_download_info()
    assert "nature.mplstyle" in mpl_info["download"]
    
    # Request file via Playwright HTTP client
    mpl_resp = app_page.fetch_relative_url(mpl_info["href"])
    assert mpl_resp.status == 200
    assert "axes.prop_cycle" in mpl_resp.text()

    # 2. R ggplot2 Theme Script
    r_info = app_page.get_r_download_info()
    assert "theme_nature.R" in r_info["download"]
    
    r_resp = app_page.fetch_relative_url(r_info["href"])
    assert r_resp.status == 200
    assert "theme_nature" in r_resp.text()

    # 3. Vector SVG Grids
    svg_btns = app_page.get_svg_download_buttons()
    assert len(svg_btns) == 3  # single, 1.5, and double column for Nature
    for btn in svg_btns:
        svg_resp = app_page.fetch_relative_url(btn["href"])
        assert svg_resp.status == 200
        assert "<svg" in svg_resp.text()


def test_switching_to_ieee_updates_download_targets(app_page):
    """Verify switching to IEEE updates download filenames and links."""
    app_page.select_journal("ieee")

    mpl_info = app_page.get_mplstyle_download_info()
    assert "ieee.mplstyle" in mpl_info["download"]
    mpl_resp = app_page.fetch_relative_url(mpl_info["href"])
    assert mpl_resp.status == 200

    r_info = app_page.get_r_download_info()
    assert "theme_ieee.R" in r_info["download"]
    r_resp = app_page.fetch_relative_url(r_info["href"])
    assert r_resp.status == 200

    svg_btns = app_page.get_svg_download_buttons()
    assert len(svg_btns) == 2  # IEEE only has single and double column
    for btn in svg_btns:
        svg_resp = app_page.fetch_relative_url(btn["href"])
        assert svg_resp.status == 200

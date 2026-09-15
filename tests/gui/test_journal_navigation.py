"""
GUI QA Tests: Journal Navigation and Metric Inspections.
Tests tab switching, metadata headers, column geometry toggles, and metrics.
"""

import pytest

pytestmark = pytest.mark.gui


def test_initial_page_load_defaults_to_nature(app_page):
    """Verify page loads with Nature as default active journal."""
    assert app_page.get_active_journal_name() == "Nature"
    assert "Nature Portfolio" in app_page.get_active_publisher()
    assert "89 mm" in app_page.get_metric("1-Column Width")
    assert "225 mm" in app_page.get_metric("Max Figure Height")
    assert "Helvetica" in app_page.get_metric("Primary Typeface")
    assert "5 pt" in app_page.get_metric("Min Allowed Font")
    assert "1000 DPI" in app_page.get_metric("Vector / Line DPI")


@pytest.mark.parametrize("journal_key,expected_title,expected_width,expected_font", [
    ("nature", "Nature", "89 mm", "Helvetica"),
    ("ieee", "IEEE Transactions", "88.9 mm", "Times New Roman"),
    ("acs", "Journal of the American Chemical Society", "82.5 mm", "Arial"),
    ("science", "Science", "55 mm", "Helvetica"),
    ("cell", "Cell", "85 mm", "Arial"),
    ("jco", "Journal of Clinical Oncology", "84.6 mm", "Arial"),
])
def test_switching_journal_tabs_updates_header_and_metrics(
    app_page, journal_key, expected_title, expected_width, expected_font
):
    """Verify clicking each journal tab correctly updates titles and metrics."""
    app_page.select_journal(journal_key)
    assert app_page.get_active_journal_name() == expected_title
    assert expected_width in app_page.get_metric("1-Column Width")
    assert expected_font in app_page.get_metric("Primary Typeface")


def test_column_visualizer_toggles_and_conditional_15_column(app_page):
    """Verify column width selector updates figure box and hides 1.5 col for IEEE."""
    # Nature supports 1.5 column
    app_page.select_journal("nature")
    assert app_page.is_one_and_half_column_available() is True
    
    app_page.select_column("double_column")
    assert "180 mm" in app_page.get_figure_box_text()
    
    app_page.select_column("one_and_half_column")
    assert "120 mm" in app_page.get_figure_box_text()

    # IEEE Transactions uses standard 2-column layout (no 1.5 column)
    app_page.select_journal("ieee")
    assert app_page.is_one_and_half_column_available() is False
    assert "88.9 mm" in app_page.get_figure_box_text()
    
    app_page.select_column("double_column")
    assert "181.9 mm" in app_page.get_figure_box_text()

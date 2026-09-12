# Browser GUI & End-to-End QA Testing Framework

This testing framework provides automated and manual browser-based QA verification for the **Journal Compliance Explorer** using [Playwright](https://playwright.dev/python/) and [pytest](https://docs.pytest.org/).

It automatically manages an ephemeral local web server, sets up clipboard permissions, and provides a fluent **Page Object Model** (`ExplorerPage`) designed for rapid, human-readable test authoring.

---

## 1. Running GUI QA Tests

### Run Headless (fast background execution)
```bash
# Using the cross-platform shell script:
./scripts/test_gui.sh

# Or via Python CLI:
uv run jct test-gui

# Or via pytest directly:
uv run pytest tests/gui/ -v
```

### Run Headed (watch the browser in real time)
To watch Chromium open, click through tabs, convert colors, and copy snippets:
```bash
# Using the script:
./scripts/test_gui.sh --headed

# Or via CLI:
uv run jct test-gui --headed

# Or via pytest:
uv run pytest tests/gui/ -v --headed
```

### Run a specific test or test file
```bash
# Run only clipboard tests:
uv run pytest tests/gui/test_clipboard_copying.py -v

# Run a specific test function:
uv run pytest tests/gui/test_journal_navigation.py -k "test_switching_journal_tabs" -v
```

---

## 2. Directory Structure

```
tests/gui/
├── conftest.py                      # Server fixture, browser context, clipboard permissions
├── README.md                        # This manual & API guide
├── pages/
│   ├── __init__.py
│   └── explorer_page.py             # ExplorerPage Page Object Model
├── test_journal_navigation.py       # QA: Tab switching, metadata, column widths
├── test_themes_and_accessibility.py # QA: Theme switcher, CVD simulation, color spaces
├── test_clipboard_copying.py        # QA: 1-click clipboard copy (AI, code, swatches)
├── test_figure_downloads.py         # QA: 1-click downloads (.mplstyle, .R, .svg)
└── test_citations_and_links.py      # QA: APA/BibTeX copying & non-404 link checks
```

---

## 3. How to Manually Code a New QA Test

Writing a new test is as simple as creating a function in any `test_*.py` file inside `tests/gui/` taking the `app_page` fixture.

### Example: Testing a New Journal or Feature

```python
import pytest

pytestmark = pytest.mark.gui

def test_my_custom_qa_flow(app_page):
    # 1. Switch to a journal
    app_page.select_journal("nature")
    assert app_page.get_active_journal_name() == "Nature"

    # 2. Select an accessible palette and color format
    app_page.select_palette("Okabe-Ito")
    app_page.select_color_format("rgb255")

    # 3. Simulate deuteranopia vision
    app_page.select_cvd_mode("deuteranopia")

    # 4. Copy the entire palette to clipboard
    clipboard_content = app_page.copy_palette_formatted()
    assert "rgb(" in clipboard_content
    assert "deuteranopia" in clipboard_content.lower()

    # 5. Check toast feedback
    assert "Copied to clipboard" in app_page.get_toast_text()
```

---

## 4. `ExplorerPage` API Quick Reference

The `app_page` fixture injects an `ExplorerPage` instance with the following methods:

### Journal Navigation & Geometry
- `select_journal(key_or_name)`: Click a journal tab (`'nature'`, `'ieee'`, `'acs'`, `'science'`, `'cell'`).
- `get_active_journal_name() -> str`: Title of the active journal (e.g. `'IEEE Transactions'`).
- `get_active_publisher() -> str`: Name of publisher (e.g. `'Nature Portfolio'`).
- `get_metric(label) -> str`: Value of a quick metric box (e.g. `get_metric('1-Column Width')`).
- `select_column(col_key)`: Click column button (`'single_column'`, `'one_and_half_column'`, `'double_column'`).
- `get_figure_box_text() -> str`: Current rendered dimension in visualizer (e.g. `'89 mm'`).
- `is_one_and_half_column_available() -> bool`: Returns whether 1.5-column is supported.

### Themes & Color Spaces
- `select_theme(theme_val)`: Switch doc theme (`'theme-oxide-moss'`, `'theme-okabe-ito'`, `'theme-slate-dark'`, `'theme-viridis'`).
- `get_body_class() -> str`: Returns class string on `<body>`.
- `select_palette(name)`: Click palette tab (`'Okabe-Ito'`, `'Viridis'`, `'Tol Bright'`).
- `get_available_palette_names() -> list[str]`: List active palette tab names.
- `select_color_format(fmt)`: Change format (`'hex'`, `'rgb255'`, `'rgb_norm'`, `'rgb_percent'`, `'hsv'`, `'cmyk'`).
- `select_cvd_mode(cvd)`: Change CVD simulation (`'normal'`, `'deuteranopia'`, `'protanopia'`, `'tritanopia'`).
- `get_swatch_count() -> int`: Number of swatches currently displayed.
- `get_swatch_values() -> list[str]`: Formatted color strings shown on the swatches.
- `get_swatch_names() -> list[str]`: Color names shown on the swatches.

### Clipboard & Copy Actions
- `copy_ai_statement() -> str`: Clicks 'Copy Statement' in the AI card and reads clipboard.
- `copy_code_snippet() -> str`: Clicks 'Copy Code' in the exporter card and reads clipboard.
- `copy_palette_formatted() -> str`: Clicks primary 'Copy Palette' button and reads clipboard.
- `copy_palette_quick(fmt) -> str`: Clicks format button in Quick Copy row and reads clipboard.
- `copy_palette_for_python() -> str`: Clicks 'Copy for Python' button and reads clipboard.
- `copy_palette_for_r() -> str`: Clicks 'Copy for R' button and reads clipboard.
- `copy_palette_for_latex() -> str`: Clicks 'Copy for LaTeX' button and reads clipboard.
- `copy_swatch(index=0) -> str`: Clicks an individual swatch card to copy its value.
- `copy_apa_citation() -> str`: Clicks 'Copy APA' button and reads clipboard.
- `copy_bibtex_citation() -> str`: Clicks 'Copy BibTeX' button and reads clipboard.
- `get_toast_text() -> str`: Text of floating toast message.
- `read_clipboard() -> str`: Low-level reader for the current system clipboard text.

### Code Snippets & Downloads
- `select_snippet_tab(tab)`: Select tab (`'matplotlib'`, `'r_ggplot2'`, `'latex'`, `'yaml'`).
- `get_code_display_text() -> str`: Raw text inside code snippet block.
- `get_mplstyle_download_info() -> dict`: Returns `{'href', 'download', 'text'}` for `.mplstyle`.
- `get_r_download_info() -> dict`: Returns `{'href', 'download', 'text'}` for `.R`.
- `get_svg_download_buttons() -> list[dict]`: Returns list of `{'href', 'download', 'text'}` for SVG buttons.
- `fetch_relative_url(rel_url)`: Makes an HTTP GET request to verify a download or asset URL returns status 200.

### Direct Playwright Access
You can also bypass the Page Object and use Playwright directly:
```python
def test_direct_playwright_example(app_page):
    page = app_page.page
    page.locator("#journal-name").wait_for(state="visible")
    assert page.is_visible("#theme-selector")
```

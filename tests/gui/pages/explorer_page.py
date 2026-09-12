"""
Page Object Model for the Scientific Journal Compliance Explorer.
Provides high-level helper methods for manual and automated GUI QA testing.
"""

from typing import Dict, List, Optional
from playwright.sync_api import Page, Locator, expect


class ExplorerPage:
    """Helper wrapper around Playwright Page for Journal Compliance Explorer."""

    def __init__(self, page: Page):
        self.page = page

    # -------------------------------------------------------------------------
    # Core Wait & Readiness
    # -------------------------------------------------------------------------
    def wait_until_ready(self, timeout: float = 5000):
        """Wait until the web app has loaded data and rendered initial view."""
        self.page.wait_for_selector("#journal-name", state="visible", timeout=timeout)
        self.page.wait_for_function("() => document.getElementById('journal-name').textContent.length > 0")

    # -------------------------------------------------------------------------
    # Journal Navigation
    # -------------------------------------------------------------------------
    def select_journal(self, key_or_name: str):
        """
        Select a journal tab by key ('nature', 'ieee', 'acs', 'science', 'cell')
        or by visible text.
        """
        key = key_or_name.lower().strip()
        # Direct key match on data-journal attribute
        tab = self.page.locator(f".journal-tab[data-journal='{key}']")
        if tab.count() > 0:
            tab.first.click()
        else:
            # Fallback search by visible text
            self.page.locator(".journal-tab").filter(has_text=key_or_name).first.click()
        self.page.wait_for_timeout(100)

    def get_active_journal_name(self) -> str:
        return self.page.locator("#journal-name").inner_text().strip()

    def get_active_publisher(self) -> str:
        return self.page.locator("#publisher-name").inner_text().strip()

    def get_issn(self) -> str:
        return self.page.locator("#issn-val").inner_text().strip()

    def get_verified_date(self) -> str:
        return self.page.locator("#verified-val").inner_text().strip()

    def get_guidelines_url(self) -> str:
        return self.page.locator("#guidelines-link").get_attribute("href") or ""

    # -------------------------------------------------------------------------
    # Quick Metrics
    # -------------------------------------------------------------------------
    def get_metric(self, label: str) -> str:
        """
        Get the value of a metric box by label:
        e.g. '1-Column Width', 'Max Figure Height', 'Primary Typeface',
             'Min Allowed Font', 'Vector / Line DPI'
        """
        box = self.page.locator(".metric-box").filter(has_text=label)
        val_el = box.locator(".metric-value")
        return val_el.inner_text().strip()

    # -------------------------------------------------------------------------
    # Column Visualizer
    # -------------------------------------------------------------------------
    def select_column(self, col_key: str):
        """Select column width ('single_column', 'one_and_half_column', 'double_column')."""
        self.page.locator(f".col-btn[data-col='{col_key}']").click()
        self.page.wait_for_timeout(100)

    def get_figure_box_text(self) -> str:
        return self.page.locator("#figure-box-render").inner_text().strip()

    def is_one_and_half_column_available(self) -> bool:
        btn = self.page.locator(".col-btn[data-col='one_and_half_column']")
        if btn.count() == 0:
            return False
        return btn.is_visible()

    # -------------------------------------------------------------------------
    # Documentation Color Theme
    # -------------------------------------------------------------------------
    def select_theme(self, theme_value: str):
        """Select theme ('theme-oxide-moss', 'theme-okabe-ito', 'theme-slate-dark', 'theme-viridis')."""
        self.page.locator("#theme-selector").select_option(value=theme_value)
        self.page.wait_for_timeout(100)

    def get_body_class(self) -> str:
        return self.page.locator("body").get_attribute("class") or ""

    # -------------------------------------------------------------------------
    # Color Palettes, Formats & CVD
    # -------------------------------------------------------------------------
    def select_palette(self, palette_name: str):
        """Select accessible palette tab ('Okabe-Ito', 'Viridis', 'Tol Bright')."""
        self.page.locator(f".palette-tab-btn[data-palette='{palette_name}']").click()
        self.page.wait_for_timeout(100)

    def get_available_palette_names(self) -> List[str]:
        btns = self.page.locator(".palette-tab-btn")
        names = []
        for i in range(btns.count()):
            names.append(btns.nth(i).get_attribute("data-palette") or "")
        return names

    def select_color_format(self, fmt_key: str):
        """Select color format: 'hex', 'rgb255', 'rgb_norm', 'rgb_percent', 'hsv', 'cmyk'."""
        self.page.locator(f".fmt-btn[data-fmt='{fmt_key}']").click()
        self.page.wait_for_timeout(100)

    def select_cvd_mode(self, cvd_key: str):
        """Select CVD simulation: 'normal', 'deuteranopia', 'protanopia', 'tritanopia'."""
        self.page.locator(f".cvd-btn[data-cvd='{cvd_key}']").click()
        self.page.wait_for_timeout(100)

    def get_swatch_count(self) -> int:
        return self.page.locator(".swatch-card").count()

    def get_swatch_values(self) -> List[str]:
        """Return the color values displayed in the swatch cards."""
        cards = self.page.locator(".swatch-card")
        values = []
        for i in range(cards.count()):
            val_el = cards.nth(i).locator(".swatch-code")
            values.append(val_el.inner_text().strip())
        return values

    def get_swatch_names(self) -> List[str]:
        """Return the color names displayed in the swatch cards."""
        cards = self.page.locator(".swatch-card")
        return [cards.nth(i).locator(".swatch-name").inner_text().strip() for i in range(cards.count())]

    # -------------------------------------------------------------------------
    # Clipboard & Copy Actions
    # -------------------------------------------------------------------------
    def read_clipboard(self) -> str:
        """Read current system/browser clipboard text."""
        return self.page.evaluate("navigator.clipboard.readText()")

    def copy_ai_statement(self) -> str:
        """Click 'Copy Statement' in AI card and return clipboard text."""
        self.page.locator("#copy-statement-btn").click()
        self.page.wait_for_timeout(150)
        return self.read_clipboard()

    def copy_code_snippet(self) -> str:
        """Click 'Copy Code' in exporter card and return clipboard text."""
        self.page.locator("#copy-code-btn").click()
        self.page.wait_for_timeout(150)
        return self.read_clipboard()

    def copy_palette_formatted(self) -> str:
        """Click the primary 'Copy Palette (<Format> Array)' button and return clipboard text."""
        self.page.locator("#copy-palette-formatted").click()
        self.page.wait_for_timeout(150)
        return self.read_clipboard()

    def copy_palette_quick(self, fmt_key: str) -> str:
        """Click a format button in 'Quick Copy Palette' row and return clipboard text."""
        self.page.locator(f"button[data-copy-fmt='{fmt_key}']").click()
        self.page.wait_for_timeout(150)
        return self.read_clipboard()

    def copy_palette_for_python(self) -> str:
        """Click 'Copy for Python' button and return clipboard text."""
        self.page.locator("#copy-palette-python").click()
        self.page.wait_for_timeout(150)
        return self.read_clipboard()

    def copy_palette_for_r(self) -> str:
        """Click 'Copy for R' button and return clipboard text."""
        self.page.locator("#copy-palette-r").click()
        self.page.wait_for_timeout(150)
        return self.read_clipboard()

    def copy_palette_for_latex(self) -> str:
        """Click 'Copy for LaTeX' button and return clipboard text."""
        self.page.locator("#copy-palette-latex").click()
        self.page.wait_for_timeout(150)
        return self.read_clipboard()

    def copy_swatch(self, index: int = 0) -> str:
        """Click an individual swatch card to copy its value and return clipboard text."""
        self.page.locator(".swatch-card").nth(index).click()
        self.page.wait_for_timeout(150)
        return self.read_clipboard()

    def copy_apa_citation(self) -> str:
        """Click 'Copy APA' button and return clipboard text."""
        self.page.locator("#copy-apa-btn").click()
        self.page.wait_for_timeout(150)
        return self.read_clipboard()

    def copy_bibtex_citation(self) -> str:
        """Click 'Copy BibTeX' button and return clipboard text."""
        self.page.locator("#copy-bibtex-btn").click()
        self.page.wait_for_timeout(150)
        return self.read_clipboard()

    def get_toast_text(self) -> str:
        toast = self.page.locator("#copy-toast")
        return toast.inner_text().strip()

    # -------------------------------------------------------------------------
    # Exporter Snippets
    # -------------------------------------------------------------------------
    def select_snippet_tab(self, tab_key: str):
        """Select code tab: 'matplotlib', 'r_ggplot2', 'latex', 'yaml'."""
        self.page.locator(f".tab-btn[data-tab='{tab_key}']").click()
        self.page.wait_for_timeout(100)

    def get_code_display_text(self) -> str:
        return self.page.locator("#code-display").inner_text()

    # -------------------------------------------------------------------------
    # Figure Asset Downloads
    # -------------------------------------------------------------------------
    def get_mplstyle_download_info(self) -> Dict[str, str]:
        btn = self.page.locator("#btn-dl-mpl")
        return {
            "href": btn.get_attribute("href") or "",
            "download": btn.get_attribute("download") or "",
            "text": btn.inner_text().strip(),
        }

    def get_r_download_info(self) -> Dict[str, str]:
        btn = self.page.locator("#btn-dl-r")
        return {
            "href": btn.get_attribute("href") or "",
            "download": btn.get_attribute("download") or "",
            "text": btn.inner_text().strip(),
        }

    def get_svg_download_buttons(self) -> List[Dict[str, str]]:
        btns = self.page.locator("#svg-dl-button-group .svg-dl-btn")
        res = []
        for i in range(btns.count()):
            b = btns.nth(i)
            res.append({
                "href": b.get_attribute("href") or "",
                "download": b.get_attribute("download") or "",
                "text": b.inner_text().strip(),
            })
        return res

    def fetch_relative_url(self, rel_url: str):
        """Fetch a relative resource URL using the current origin."""
        base = self.page.url.rsplit("/", 1)[0]
        full_url = f"{base}/{rel_url.lstrip('/')}"
        return self.page.request.get(full_url)

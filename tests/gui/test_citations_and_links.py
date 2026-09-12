"""
GUI QA Tests: Citations, Navigation Bar, and Documentation Links.
Validates citation copy buttons and verifies that schema and documentation links do not 404.
"""

import json
import pytest

pytestmark = pytest.mark.gui


def test_copy_apa_citation(app_page):
    """Verify clicking 'Copy APA' copies formatted reference to clipboard."""
    clipboard = app_page.copy_apa_citation()
    assert "Vos, J. W." in clipboard
    assert "Journal Compliance Templates" in clipboard
    assert "Copied APA citation!" in app_page.get_toast_text()


def test_copy_bibtex_citation(app_page):
    """Verify clicking 'Copy BibTeX' copies BibTeX entry to clipboard."""
    clipboard = app_page.copy_bibtex_citation()
    assert "@software{vos2026journalcompliance" in clipboard
    assert "author" in clipboard
    assert "Copied BibTeX entry!" in app_page.get_toast_text()


def test_schema_link_returns_valid_json(app_page):
    """Verify the Schema navbar link serves the valid JSON schema (no 404)."""
    resp = app_page.fetch_relative_url("schemas/compliance_schema_v1.json")
    assert resp.status == 200
    data = json.loads(resp.text())
    assert data["title"] == "JournalComplianceSpecification"


def test_documentation_and_license_links_not_404(app_page):
    """Verify Roadmap, LICENSE, and CITATION.cff static links are accessible."""
    # Project plan / roadmap
    plan_resp = app_page.fetch_relative_url("docs/project_plan.md")
    assert plan_resp.status == 200
    assert len(plan_resp.text()) > 500

    # MIT License
    lic_resp = app_page.fetch_relative_url("docs/LICENSE")
    assert lic_resp.status == 200
    assert "MIT License" in lic_resp.text()

    # CITATION.cff
    cff_resp = app_page.fetch_relative_url("docs/CITATION.cff")
    assert cff_resp.status == 200
    assert "cff-version" in cff_resp.text()

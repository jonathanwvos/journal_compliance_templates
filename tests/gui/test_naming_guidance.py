"""Naming examples stay journal-specific across HTTP and offline data loading."""
import json
import re

import pytest
from playwright.sync_api import expect

pytestmark = pytest.mark.gui


@pytest.mark.parametrize('offline', [False, True], ids=['json', 'fallback'])
def test_journal_naming_and_evidence(page, web_server_url, offline):
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    if offline:
        page.route('**/data/all_journals.json', lambda route: route.abort())
    page.goto(web_server_url)
    panel = page.locator('#naming-guidance')
    expect(panel).to_contain_text('Fig. 1')
    for key, figure, table in [
        ('nature', 'Fig. 1', 'Table 1'),
        ('ieee', 'Fig. 1', 'TABLE I'),
        ('acs', 'Figure 1', 'Table 1'),
        ('science', 'Fig. 1', 'Table 1'),
        ('cell', 'Figure 1', 'Table 1'),
        ('jco', 'Fig. 1', 'Table 1'),
    ]:
        page.locator(f'.journal-tab[data-journal="{key}"]').click()
        expect(panel.locator('[data-rule-id="figure_numbering"]')).to_contain_text(figure)
        panel.locator('[data-naming-group="tables"] summary').click()
        expect(panel.locator('[data-rule-id="table_numbering"]')).to_contain_text(table)
        expect(panel.locator('[data-naming-group="extended_data"]')).to_have_count(1 if key == 'nature' else 0)
        if key == 'ieee':
            expect(panel.locator('[data-rule-id="table_numbering"]')).to_contain_text('Publisher requirement')
            expect(panel.locator('[data-rule-id="table_numbering"]')).to_contain_text('Verified 2026-10-18')
            expect(panel.locator('[data-rule-id="table_numbering"] a')).to_have_attribute('href', re.compile(r'https://journals\.ieeeauthorcenter\.ieee\.org/'))
        if key == 'science':
            expect(panel.locator('[data-rule-id="figure_numbering"]')).to_contain_text('Unverified')
        panel.locator('[data-naming-group="filenames"] summary').click()
        expect(panel.locator('[data-rule-id="figure_filenames"]')).to_contain_text('figure_03.{ext}')
        expect(panel.locator('[data-rule-id="figure_filenames"]')).to_contain_text('Project recommendation')
    assert errors == []


def test_legacy_guidance_and_literal_text(page, web_server_url):
    def serve_legacy(route):
        data = route.fetch().json()
        data['nature'].pop('naming_conventions')
        data['ieee']['naming_conventions']['figures'][0]['guidance'] = '<img src=x onerror=alert(1)>'
        route.fulfill(content_type='application/json', body=json.dumps(data))
    page.route('**/data/all_journals.json', serve_legacy)
    page.goto(web_server_url)
    expect(page.locator('#naming-guidance')).to_have_text('Naming guidance is not available for this template version.')
    page.locator('.journal-tab[data-journal="ieee"]').click()
    expect(page.locator('#naming-guidance')).to_contain_text('<img src=x onerror=alert(1)>')
    expect(page.locator('#naming-guidance img')).to_have_count(0)

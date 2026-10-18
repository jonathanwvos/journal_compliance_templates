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
    expect(page.locator('#naming-preview .naming-paper-figure')).to_be_visible()
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
        expect(page.locator('#naming-series option[value="extended_data"]')).to_have_count(1 if key == 'nature' else 0)
        if key == 'ieee':
            expect(panel.locator('[data-rule-id="table_numbering"]')).to_contain_text('Publisher requirement')
            expect(panel.locator('[data-rule-id="table_numbering"]')).to_contain_text('Verified 2026-10-18')
            expect(panel.locator('[data-rule-id="table_numbering"] a')).to_have_attribute('href', re.compile(r'https://journals\.ieeeauthorcenter\.ieee\.org/'))
        if key == 'science':
            expect(panel.locator('[data-rule-id="figure_numbering"]')).to_contain_text('Unverified')
        panel.locator('[data-naming-group="filenames"] summary').click()
        expect(panel.locator('[data-rule-id="figure_filenames"]')).to_contain_text('gonza3.{ext}' if key == 'ieee' else 'figure_03.{ext}')
        expect(panel.locator('[data-rule-id="figure_filenames"]')).to_contain_text('Publisher requirement' if key == 'ieee' else 'Project recommendation')
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
    expect(page.locator('#naming-preview')).to_be_empty()
    page.locator('.journal-tab[data-journal="ieee"]').click()
    expect(page.locator('#naming-guidance')).to_contain_text('<img src=x onerror=alert(1)>')
    expect(page.locator('#naming-guidance img')).to_have_count(0)


def test_visual_names_stay_connected_and_link_to_rules(app_page):
    page = app_page.page
    preview = page.locator('#naming-preview')
    expect(preview.locator('.naming-panel-label')).to_have_text(['a', 'b', 'c'])
    expect(preview.locator('.naming-figure-caption')).to_contain_text('Fig. 1. Synthetic biology overview.')
    expect(preview.locator('.naming-file-link')).to_contain_text(['figure_01.{ext}', 'table_01.{ext}'])

    app_page.select_journal('ieee')
    page.locator('#naming-example-number').select_option(value='2')
    expect(preview.locator('.naming-panel-label')).to_have_text(['(a)', '(b)', '(c)'])
    expect(preview.locator('.naming-reference')).to_contain_text('Fig. 2')
    expect(preview.locator('.naming-reference')).to_contain_text('Table II')
    expect(preview.locator('.naming-figure-caption')).to_contain_text('Fig. 2.')
    expect(preview.locator('.naming-paper-table caption')).to_have_text('TABLE II\nSYNTHETIC CELL ATLAS')
    expect(preview.locator('.naming-file-link')).to_contain_text(['gonza2.{ext}', 'gonza.t2.{ext}'])
    expect(preview.locator('.naming-file-link').first).to_contain_text('gonza2_caption.docx')
    preview.locator('summary').filter(has_text='Table rules & filename').click()
    preview.get_by_role('button', name='Table title · Publisher requirement').click()
    target = page.locator('#naming-rule-table_title')
    expect(target).to_be_focused()
    expect(target).to_be_visible()
    expect(target).to_contain_text('Verified 2026-10-18')

    app_page.select_journal('cell')
    page.locator('#naming-example-number').select_option(value='3')
    expect(preview.locator('.naming-panel-label')).to_have_text(['A', 'B', 'C'])
    expect(preview.locator('.naming-figure-caption')).to_contain_text('Figure 3.')
    expect(preview.locator('.naming-paper-table caption')).to_contain_text('Table 3.')
    expect(preview.locator('.naming-file-link')).to_contain_text(['figure_03.{ext}', 'table_03.{ext}'])
    page.locator('#naming-series').select_option('supplementary')
    expect(preview.locator('.naming-figure-caption')).to_contain_text('Figure S3')

    page.set_viewport_size({'width': 390, 'height': 844})
    assert preview.evaluate('(el) => el.scrollWidth <= el.clientWidth')
    figure = preview.locator('.naming-display-card').first.bounding_box()
    table = preview.locator('.naming-display-card').last.bounding_box()
    assert table['y'] >= figure['y'] + figure['height']


def test_biological_layout_counts_and_series(app_page):
    page = app_page.page
    workspace = page.locator('#naming-figure-workspace')
    for series, name in [('main', 'Fig. 1'), ('supplementary', 'Supplementary Figure 1'), ('extended_data', 'Extended Data Figure 1')]:
        page.locator('#naming-series').select_option(series)
        for count in [1, 2, 3, 10]:
            page.locator('#naming-panel-count').select_option(str(count))
            figure = workspace.locator('.naming-paper-figure')
            expect(figure.locator('.biology-plot')).to_have_count(count)
            expect(figure.locator('.naming-panel-label')).to_have_count(count if count > 1 else 0)
            expect(figure.locator('figcaption')).to_contain_text(name)
            if count == 10:
                expect(figure.locator('.naming-panel-label').last).to_have_text('j')
                expect(figure.locator('figcaption')).to_contain_text('j Pathway enrichment')
                assert len(set(figure.locator('img').evaluate_all('(imgs) => imgs.map(i => i.src)'))) == 10
        expect(workspace.locator('.naming-file-link').first).to_contain_text(
            ('' if series == 'main' else series + '_') + 'figure_01.{ext}'
        )
    page.locator('#naming-panel-count').select_option(value='1')
    page.locator('#naming-first-plot').select_option(label='UMAP')
    expect(workspace.locator('.biology-plot')).to_have_attribute('src', 'images/biology/nature/1/umap.svg')
    expect(workspace.locator('figcaption')).to_contain_text('not a fitted embedding')
    for name in ['phylogeny', 'volcano', 'tsne', 'umap', 'pca', 'heatmap', 'expression', 'library-size', 'pseudotime', 'enrichment']:
        response = page.request.get(f'{page.url.rsplit("/", 1)[0]}/images/biology/nature/1/{name}.svg')
        assert response.ok
        assert '<svg' in response.text()
        assert 'Synthetic illustration' in response.text()


@pytest.mark.parametrize('offline', [False, True], ids=['json', 'fallback'])
def test_mock_report_contains_all_artifacts_and_adapts(page, web_server_url, offline):
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    if offline:
        page.route('**/data/all_journals.json', lambda route: route.abort())
    page.goto(web_server_url)
    page.get_by_role('button', name='Mock report', exact=True).click()
    report = page.locator('#naming-mock-report')
    expect(report).to_be_visible()
    expect(page.locator('#naming-figure-workspace')).to_be_hidden()
    expect(report.locator('figure')).to_have_count(12)
    expect(report.locator('table')).to_have_count(3)
    for series in ['main', 'supplementary', 'extended_data']:
        section = report.locator(f'[data-report-series="{series}"]')
        assert section.locator('figure').evaluate_all('(figs) => figs.map(f => Number(f.dataset.panelCount))') == [1, 2, 3, 10]
        for link in section.locator('.naming-report-lead a').all():
            expect(page.locator(link.get_attribute('href'))).to_have_count(1)
    expect(report.locator('#mock-main-figure-4 figcaption')).to_contain_text('Fig. 4.')
    expect(report.locator('#mock-supplementary-figure-4 figcaption')).to_contain_text('Supplementary Figure 4.')
    expect(report.locator('#mock-extended_data-figure-4 figcaption')).to_contain_text('Extended Data Figure 4.')
    expect(report.locator('#mock-extended_data-figure-4 .naming-file-link')).to_contain_text('extended_data_figure_04.{ext}')
    page.set_viewport_size({'width': 390, 'height': 844})
    card = page.locator('.naming-card')
    bounds = card.bounding_box()
    assert bounds['x'] >= 0 and bounds['x'] + bounds['width'] <= 391
    assert report.evaluate('(el) => el.scrollWidth <= el.clientWidth')
    ten = report.locator('#mock-main-figure-4')
    positions = ten.locator('.naming-panel').evaluate_all('(els) => els.map(e => e.getBoundingClientRect().top)')
    assert positions[0] == positions[1] == positions[2]
    assert positions[3] > positions[0]  # Scale the canonical three-column plate on mobile.
    page.locator('.journal-tab[data-journal="ieee"]').click()
    expect(report).to_be_visible()
    expect(report.locator('figure')).to_have_count(8)
    expect(report.locator('[data-report-series="extended_data"]')).to_have_count(0)
    expect(report.locator('.naming-panel-label').first).to_have_text('(a)')
    expect(report.locator('table caption').first).to_contain_text('TABLE I')
    page.get_by_role('button', name='Figure preview', exact=True).click()
    expect(report).to_be_hidden()
    expect(page.locator('#naming-figure-workspace')).to_be_visible()
    assert errors == []


@pytest.mark.parametrize('offline', [False, True], ids=['json', 'fallback'])
def test_every_journal_uses_its_own_artwork_and_typography(page, web_server_url, offline):
    if offline:
        page.route('**/data/all_journals.json', lambda route: route.abort())
    page.goto(web_server_url)
    for tab, key in [('nature', 'nature'), ('ieee', 'ieee_transactions'), ('acs', 'jacs'), ('science', 'science'), ('cell', 'cell'), ('jco', 'jco')]:
        page.locator(f'.journal-tab[data-journal="{tab}"]').click()
        preview = page.locator('#naming-preview')
        expect(preview).to_have_attribute('data-journal', key)
        for count in [1, 2, 3, 10]:
            page.locator('#naming-panel-count').select_option(str(count))
            figure = preview.locator('#naming-figure-workspace figure')
            expect(figure).to_have_attribute('data-journal', key)
            for image in figure.locator('img').all():
                assert f'/biology/{key}/{count}/' in image.get_attribute('src')
            plate = figure.locator('.naming-panels')
            dimensions = plate.bounding_box()
            ratio = float(figure.get_attribute('data-width-mm')) / float(figure.get_attribute('data-height-mm'))
            assert dimensions['width'] / dimensions['height'] == pytest.approx(ratio, rel=.015)
        page.get_by_role('button', name='Mock report', exact=True).click()
        report = page.locator('#naming-mock-report')
        assert report.locator('figure').evaluate_all('(figs) => figs.every(f => f.dataset.journal === "' + key + '")')
        if tab == 'nature':
            expect(report.locator('#mock-report-extended_data .naming-table-frame')).to_have_attribute('style', re.compile('--table-size: 7pt'))
        if tab == 'science':
            expect(report.locator('#mock-report-main table')).to_have_count(0)
            expect(report.locator('#mock-report-supplementary table')).to_have_count(1)
        page.get_by_role('button', name='Figure preview', exact=True).click()
    page.locator('.journal-tab[data-journal="ieee"]').click()
    page.locator('#naming-author').fill('Smithson')
    expect(page.locator('#naming-figure-workspace .naming-file-link').first).to_contain_text('smith1.{ext}')
    expect(page.locator('#naming-figure-workspace .naming-file-link').last).to_contain_text('smith.t1.{ext}')


def test_stale_artwork_is_not_shown_as_matching(page, web_server_url):
    def changed_template(route):
        data = route.fetch().json()
        data['nature']['figure_typography']['font_sizes']['axis_title']['size'] = 6.5
        route.fulfill(content_type='application/json', body=json.dumps(data))
    page.route('**/data/all_journals.json', changed_template)
    page.goto(web_server_url)
    expect(page.locator('#naming-preview')).to_contain_text('artwork needs rebuilding')
    expect(page.locator('#naming-preview img')).to_have_count(0)

"""Contract, compatibility, and publication consistency for naming guidance."""
import copy
import json
from pathlib import Path

import pytest
import yaml
from jsonschema import Draft202012Validator, ValidationError

from scripts.build_dist import write_web_data

ROOT = Path(__file__).resolve().parents[1]
TEMPLATES = sorted((ROOT / 'templates').glob('*/*.yaml'))
SCHEMA = json.loads((ROOT / 'schemas/compliance_schema_v1.json').read_text())
VALIDATOR = Draft202012Validator(SCHEMA)


def load(path):
    return yaml.safe_load(path.read_text())


def get_rule(naming, group, rule_id):
    return next(rule for rule in naming[group] if rule['id'] == rule_id)


@pytest.mark.parametrize('path', TEMPLATES, ids=lambda p: p.stem)
def test_naming_semantics_and_evidence(path):
    template = load(path)
    naming = template['naming_conventions']
    assert template['schema_version'] == '1.1.0'
    VALIDATOR.validate(template)
    ids, sequences, filenames = [], [], []
    for group, rules in naming.items():
        for rule in rules:
            ids.append(rule['id'])
            if 'numbering' in rule:
                sequences.append(rule['numbering']['sequence'])
                assert rule['numbering']['start'] == 1
                assert len(rule['examples']) >= 3
            if group == 'filenames':
                filenames.extend(rule['examples'])
                assert rule['status'] == ('publisher_requirement' if path.stem == 'ieee_transactions' and rule['id'] in ['figure_filenames', 'table_filenames'] else 'project_recommendation')
    assert len(ids) == len(set(ids))
    assert len(sequences) == len(set(sequences))
    assert len(filenames) == len(set(filenames))
    assert ('extended_data' in naming) == (path.stem == 'nature')

    figures = get_rule(naming, 'figures', 'figure_numbering')['examples']
    captions = get_rule(naming, 'captions', 'caption_heading')['examples']
    for figure, caption in zip(figures, captions):
        assert caption.startswith(figure + '.')
    panel_caption = get_rule(naming, 'captions', 'caption_panels')['examples'][0]
    letters = 'abc' if template['panel_labeling']['case'] == 'lowercase' else 'ABC'
    labels = [f'({c})' if template['panel_labeling'].get('punctuation') == '(a)' else c for c in letters]
    for label, description in zip(labels, ['Recruitment', 'Sampling', 'Analysis']):
        assert f'{label} {description}.' in panel_caption
    assert panel_caption.startswith(figures[0] + '.')
    expected = [f'gonza{n}.{{ext}}' if path.stem == 'ieee_transactions' else f'figure_{n:02d}.{{ext}}' for n in range(1, 4)]
    assert get_rule(naming, 'filenames', 'figure_filenames')['examples'] == expected
    caption_files = get_rule(naming, 'filenames', 'caption_filenames')['examples']
    assert all((f'gonza{n}_caption.docx' if path.stem == 'ieee_transactions' else f'figure_{n:02d}_caption.docx') in caption_files for n in range(1, 4))


@pytest.mark.parametrize('path', TEMPLATES, ids=lambda p: p.stem)
def test_legacy_templates_remain_valid(path):
    data = load(path)
    data.pop('naming_conventions')
    data['schema_version'] = '1.0.0'
    VALIDATOR.validate(data)


@pytest.mark.parametrize('mutation', [
    lambda n: n.pop('figures'),
    lambda n: n.update(figures=[]),
    lambda n: n['figures'][0].update(status='verified'),
    lambda n: n['figures'][0].update(examples='Figure 1'),
    lambda n: n['figures'][0]['numbering'].update(start=0),
    lambda n: n['figures'][0]['numbering'].update(style='letters'),
    lambda n: n['figures'][0].update(source_url='javascript:alert(1)'),
    lambda n: n['figures'][0].update(verified_on='yesterday'),
    lambda n: n['figures'][0].update(typo='unknown property'),
    lambda n: n['figures'][0].update(status='publisher_requirement', verified_on='2026-10-18', source_url=None),
    lambda n: n['figures'][0].update(status='unverified', verified_on='2026-10-18'),
])
def test_invalid_guidance_rejected(mutation):
    data = load(ROOT / 'templates/nature/nature.yaml')
    mutation(data['naming_conventions'])
    with pytest.raises(ValidationError):
        VALIDATOR.validate(data)


def test_requirements_need_complete_evidence():
    data = load(ROOT / 'templates/ieee/ieee_transactions.yaml')
    for field in ['source_url', 'source_section', 'verified_on']:
        broken = copy.deepcopy(data)
        broken['naming_conventions']['figures'][0].pop(field)
        with pytest.raises(ValidationError):
            VALIDATOR.validate(broken)


def test_ieee_table_and_caption_conventions():
    naming = load(ROOT / 'templates/ieee/ieee_transactions.yaml')['naming_conventions']
    tables = get_rule(naming, 'tables', 'table_numbering')
    assert tables['numbering']['style'] == 'roman_upper'
    assert tables['examples'] == ['TABLE I', 'TABLE II', 'TABLE III']
    assert get_rule(naming, 'captions', 'caption_heading')['pattern'] == 'Fig. {number}.\u2003{title}'


def test_web_publication_matches_templates_and_aliases(tmp_path):
    expected = {}
    for path in TEMPLATES:
        data = load(path)
        expected[path.stem] = data
        expected.setdefault(path.parent.name, data)
    write_web_data(expected, tmp_path)
    for name in ['all_journals.json', 'journals.js']:
        assert (tmp_path / name).read_bytes() == (ROOT / 'web/data' / name).read_bytes()
    fallback = (tmp_path / 'journals.js').read_text().split('window.JCT_FALLBACK_JOURNALS = ', 1)[1]
    assert json.loads(fallback.removesuffix(';\n')) == expected
    assert (ROOT / 'web/schemas/compliance_schema_v1.json').read_bytes() == (ROOT / 'schemas/compliance_schema_v1.json').read_bytes()

"""Inspect shipped artwork, not just generator settings, at its declared size."""
import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path

import pytest
import yaml

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'web/images/biology'
PROFILES = json.loads((ASSETS / 'profiles.js').read_text().split(' = ', 1)[1].rstrip(';\n'))


@pytest.mark.parametrize('path', sorted((ROOT / 'templates').glob('*/*.yaml')), ids=lambda p: p.stem)
def test_shipped_artwork_matches_template_and_physical_limits(path):
    data = yaml.safe_load(path.read_text())
    profile = PROFILES[data['metadata']['journal_name']]
    assert profile['source'] == {key: data[key] for key in profile['source']}, 'Regenerate biology assets after changing a template'
    floor = data['figure_typography']['font_sizes']['min_allowed_size']
    stroke_floor = data['line_weights']['min_allowed_weight']
    for count in [1, 2, 3, 10]:
        layout = profile['layouts'][str(count)]
        assert len(layout['checks']) == 10
        expected_width = data['figure_geometry']['column_widths']['single_column' if count == 1 else 'double_column']['width']
        assert layout['width_mm'] == expected_width
        assert layout['height_mm'] <= data['figure_geometry']['max_height']
        if path.stem == 'jacs':
            assert layout['height_mm'] + 55 <= data['figure_geometry']['max_height'] + 1e-8
        for check in layout['checks']:
            svg = (ASSETS / profile['key'] / str(count) / f'{check["plot"]}.svg').read_text()
            root = ET.fromstring(svg)
            assert float(root.attrib['width'].removesuffix('pt')) * 25.4 / 72 == pytest.approx(layout['panel_width_mm'], abs=1e-5)
            assert float(root.attrib['height'].removesuffix('pt')) * 25.4 / 72 == pytest.approx(layout['panel_height_mm'], abs=1e-5)
            assert '<image' not in svg, 'Scientific plots must remain vector, including heatmaps/colorbars'
            assert '@font-face' in svg and 'data:font/ttf;base64,' in svg
            assert '<text' in svg, 'Text must remain editable'
            assert check['text_inside'] and check['min_font_pt'] >= floor
            sizes = [float(value) for value in re.findall(r'font-size: ([\d.]+)px', svg)]
            assert sizes and min(sizes) >= floor
            strokes = [float(value) for value in re.findall(r'stroke-width: ([\d.]+)', svg)]
            assert all(value == 0 or value >= stroke_floor for value in strokes)
            if path.stem == 'nature':
                assert max(sizes) <= 7
                assert max(strokes) <= 1

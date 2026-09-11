"""
Pytest suite for Figure Plotting Exporters & Tooling Bridges (Milestone 3).
Validates Matplotlib .mplstyle, R ggplot2 themes, and vector SVG grids.
"""

import os
import xml.etree.ElementTree as ET
from pathlib import Path
import pytest
import yaml

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

from journal_compliance_templates import load_template, list_templates, TEMPLATES_DIR
from journal_compliance_templates.exporters.figures import (
    generate_mplstyle_content,
    save_mplstyle,
    get_figure_dimensions,
    generate_r_theme_content,
    save_r_theme,
    generate_svg_grid_content,
    save_svg_grid,
    generate_all_figure_assets,
    ACCESSIBLE_PALETTES,
)


@pytest.fixture(scope='session')
def all_templates():
    templates = {}
    for yf in TEMPLATES_DIR.glob('**/*.yaml'):
        with open(yf, 'r', encoding='utf-8') as f:
            templates[yf.stem] = yaml.safe_load(f)
    return templates


def test_accessible_palettes_presence():
    assert 'Okabe-Ito' in ACCESSIBLE_PALETTES
    assert 'Viridis' in ACCESSIBLE_PALETTES
    assert 'Tol-Bright' in ACCESSIBLE_PALETTES
    assert len(ACCESSIBLE_PALETTES['Okabe-Ito']) >= 8


@pytest.mark.parametrize('journal_key', ['nature', 'ieee_transactions', 'jacs', 'science', 'cell'])
def test_mplstyle_generation_and_properties(journal_key, all_templates):
    assert journal_key in all_templates
    data = all_templates[journal_key]
    style_text = generate_mplstyle_content(data, palette_name='Okabe-Ito')
    
    assert 'axes.prop_cycle' in style_text
    assert 'savefig.format: pdf' in style_text
    assert 'pdf.fonttype: 42' in style_text
    assert 'font.family' in style_text
    assert 'axes.linewidth' in style_text
    assert str(data['figure_typography']['font_sizes']['tick_label']['size']) in style_text


@pytest.mark.parametrize('journal_key', ['nature', 'ieee_transactions', 'jacs', 'science', 'cell'])
def test_mplstyle_loading_and_figure_rendering(journal_key, all_templates, tmp_path):
    data = all_templates[journal_key]
    style_file = tmp_path / f'{journal_key}.mplstyle'
    save_mplstyle(data, style_file)
    assert style_file.exists()
    
    # Verify matplotlib loads the stylesheet without syntax error
    plt.style.use(str(style_file))
    
    # Calculate exact column dimensions
    w_in, h_in = get_figure_dimensions(data, column='single_column')
    assert w_in > 0 and h_in > 0
    
    # Generate test figure
    fig, ax = plt.subplots(figsize=(w_in, h_in))
    ax.plot([0, 1, 2], [0, 1, 4], label='Data Series A')
    ax.plot([0, 1, 2], [2, 3, 1], label='Data Series B')
    ax.set_title('Figure 1 Test')
    ax.set_xlabel('Independent Variable (s)')
    ax.set_ylabel('Response Amplitude (a.u.)')
    ax.legend()
    
    pdf_out = tmp_path / f'{journal_key}_plot.pdf'
    fig.savefig(pdf_out)
    plt.close(fig)
    
    assert pdf_out.exists()
    assert pdf_out.stat().st_size > 500


@pytest.mark.parametrize('journal_key', ['nature', 'ieee_transactions', 'jacs', 'science', 'cell'])
def test_r_theme_generation(journal_key, all_templates, tmp_path):
    data = all_templates[journal_key]
    r_content = generate_r_theme_content(data, palette_name='Okabe-Ito')
    
    # Check that key R functions and objects exist
    assert 'palette_' in r_content
    assert 'theme_' in r_content
    assert 'scale_color_' in r_content
    assert 'scale_fill_' in r_content
    assert 'ggsave_' in r_content
    assert 'ggplot2::theme_classic' in r_content
    
    # Write and test existence
    r_file = tmp_path / f'theme_{journal_key}.R'
    save_r_theme(data, r_file)
    assert r_file.exists()
    assert r_file.stat().st_size > 1000


@pytest.mark.parametrize('journal_key', ['nature', 'ieee_transactions', 'jacs', 'science', 'cell'])
def test_svg_grid_generation_and_xml_structure(journal_key, all_templates, tmp_path):
    data = all_templates[journal_key]
    col_widths = data['figure_geometry']['column_widths']
    
    for col_mode in col_widths.keys():
        svg_content = generate_svg_grid_content(data, column=col_mode, palette_name='Okabe-Ito')
        
        # Parse XML to verify valid syntax
        root = ET.fromstring(svg_content)
        tag_name = root.tag.split('}')[-1]
        assert tag_name == 'svg'
        
        # Check viewBox and dimensions
        assert 'viewBox' in root.attrib
        assert 'width' in root.attrib
        assert 'height' in root.attrib
        
        # Check layers: guides and artwork
        layer_ids = [elem.attrib.get('id') for elem in root.findall('.//{http://www.w3.org/2000/svg}g') if 'id' in elem.attrib]
        assert 'layer-guides' in layer_ids
        assert 'layer-artwork' in layer_ids
        
        # Check swatches
        assert 'palette-swatches' in layer_ids
        
        # Save to disk test
        svg_file = tmp_path / f'{journal_key}_{col_mode}.svg'
        save_svg_grid(data, svg_file, column=col_mode)
        assert svg_file.exists()
        assert svg_file.stat().st_size > 1000


def test_generate_all_figure_assets_bulk(tmp_path):
    res = generate_all_figure_assets(TEMPLATES_DIR, tmp_path)
    assert len(res['matplotlib']) >= 5
    assert len(res['r']) >= 5
    assert len(res['svg']) >= 10
    
    for category, paths in res.items():
        for p in paths:
            assert p.exists()
            assert p.stat().st_size > 0

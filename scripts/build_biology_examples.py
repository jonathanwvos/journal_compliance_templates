"""Generate deterministic, synthetic biology illustrations for the local explorer.

Run with the project's dev dependencies. SVGs are checked in so the explorer works
without Python or a plotting library. No patient data or fitted embeddings are used.
"""
import json
import re
import warnings
from pathlib import Path

import matplotlib
import yaml

matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from matplotlib import font_manager
from matplotlib.colors import LinearSegmentedColormap, ListedColormap, to_hex, to_rgb
from matplotlib.lines import Line2D
from matplotlib.text import Text

DESTINATION = Path(__file__).resolve().parents[1] / 'web' / 'images' / 'biology'
COLORS = ['#0072B2', '#D55E00', '#009E73']
CELL_TYPES = ['T cells', 'B cells', 'Monocytes']

# Colour roles are independent of journal geometry. Neutral ink stays black/grey.
PALETTES = {
    'okabe-ito': {'series': COLORS, 'diverging': ['#0072B2', '#F7F7F7', '#D55E00'],
                  'sequential': ['#F7F7F7', '#0072B2']},
    'viridis': {'series': ['#440154', '#21918C', '#5EC962'],
                'diverging': ['#440154', '#F7F7F7', '#5EC962'],
                'sequential': ['#440154', '#3B528B', '#21918C', '#5EC962', '#FDE725']},
    'tol-bright': {'series': ['#4477AA', '#EE6677', '#228833'],
                   'diverging': ['#4477AA', '#F7F7F7', '#EE6677'],
                   'sequential': ['#F7F7F7', '#4477AA']},
}
CVD_MATRICES = {
    'normal': np.eye(3),
    'deuteranopia': [[.625, .375, 0], [.7, .3, 0], [0, .3, .7]],
    'protanopia': [[.567, .433, 0], [.558, .442, 0], [0, .242, .758]],
    'tritanopia': [[.95, .05, 0], [0, .433, .567], [0, .475, .525]],
}


def placeholder_map(prefix):
    """Unique colours let us preserve each quantitative value when styling SVGs."""
    return ListedColormap([f'#{prefix}{i:04x}' for i in range(256)])


def apply_palettes(svg):
    roles = {color.lower(): f'series-{i}' for i, color in enumerate(COLORS)}
    for prefix, role in [('a1', 'diverging'), ('a2', 'sequential')]:
        roles.update({f'#{prefix}{i:04x}': f'{role}-{i}' for i in range(256)})
    used = set()

    def replace_color(match):
        property_name, color = match.groups()
        role = roles.get(color.lower())
        if not role:
            return match.group(0)
        used.add(role)
        return f'{property_name}: var(--{role})'

    svg = re.sub(r'(fill|stroke): (#[0-9a-fA-F]{6})', replace_color, svg)
    styles, targets = [], []
    for palette, spec in PALETTES.items():
        values = {f'series-{i}': color for i, color in enumerate(spec['series'])}
        for role in ['diverging', 'sequential']:
            cmap = LinearSegmentedColormap.from_list(role, spec[role])
            values.update({f'{role}-{i}': to_hex(cmap(i / 255)) for i in range(256)})
        for mode, matrix in CVD_MATRICES.items():
            target = f'{palette}-{mode}'
            targets.append(f'<g id="{target}"/>')
            declarations = []
            for role in sorted(used):
                rgb = np.clip(np.floor(np.dot(matrix, to_rgb(values[role])) * 255 + .5), 0, 255).astype(int)
                color = '#' + ''.join(f'{channel:02x}' for channel in rgb)
                declarations.append(f'--{role}:{color}')
            selector = f'#{target}:target ~ #figure_1'
            if target == 'okabe-ito-normal':
                selector = f'#figure_1, {selector}'
            styles.append(f'{selector} {{{";".join(declarations)}}}')
    # Fragment targets work in external <img> SVGs, including file:// previews.
    return svg.replace('<g id="figure_1">', '<style>' + '\n'.join(styles) + '</style>\n'
                       + '\n'.join(targets) + '\n<g id="figure_1">', 1)


def layout_for(data, count):
    geometry = data['figure_geometry']
    width = geometry['column_widths']['single_column' if count == 1 else 'double_column']['width']
    columns = 1 if count == 1 else (2 if count in (2, 3) or data['metadata']['journal_name'] == 'IEEE Transactions' else 3)
    rows = int(np.ceil(count / columns))
    gutter = geometry.get('panel_spacing', {}).get('minimum_gutter', 3)
    label_height = 5 if count > 1 else 0
    panel_width = (width - gutter * (columns - 1)) / columns
    # Leave space for manuscript captions; ACS's depth includes the caption.
    height_limit = geometry['max_height'] - (55 if data['metadata']['journal_name'].startswith('Journal of the American Chemical') else 0)
    panel_height = min(panel_width * .78, (height_limit - gutter * (rows - 1)) / rows - label_height)
    return {'width_mm': width, 'height_mm': rows * (panel_height + label_height) + (rows - 1) * gutter,
                'panel_width_mm': panel_width, 'panel_height_mm': panel_height, 'label_height_mm': label_height,
                'columns': columns, 'rows': rows, 'gutter_mm': gutter}


def resolve_font(data):
    prefs = data['figure_typography']['family_preferences']
    substitute = 'Liberation Serif' if prefs['primary'] == 'Times New Roman' else 'Liberation Sans'
    for family in [prefs['primary'], substitute, *prefs['fallback']]:
        try:
            font_manager.findfont(family, fallback_to_default=False)
            return family
        except ValueError:
            pass
    raise RuntimeError('Install the journal typeface or the Liberation fonts before regenerating previews')


def make_examples(data, destination, layout, family):
    destination.mkdir(parents=True, exist_ok=True)
    sizes = data['figure_typography']['font_sizes']
    weights = data['line_weights']
    floor = weights['min_allowed_weight']
    plt.rcParams.update({
        'font.family': family, 'font.size': sizes['annotation']['size'],
        'axes.labelsize': sizes['axis_title']['size'],
        'axes.spines.top': False, 'axes.spines.right': False,
        'axes.linewidth': max(floor, weights['axis_lines']),
        'xtick.major.width': max(floor, weights['tick_marks']),
        'ytick.major.width': max(floor, weights['tick_marks']),
        'xtick.labelsize': sizes['tick_label']['size'], 'ytick.labelsize': sizes['tick_label']['size'],
        'legend.fontsize': sizes['legend_text']['size'], 'lines.linewidth': weights['data_lines_normal'],
        'svg.fonttype': 'none', 'svg.hashsalt': 'jct-biology-examples-v2',
        'pdf.fonttype': 42, 'savefig.bbox': None,
    })
    rng = np.random.default_rng(20261018)
    checks = []

    def canvas():
        fig, ax = plt.subplots(figsize=(layout['panel_width_mm'] / 25.4, layout['panel_height_mm'] / 25.4), layout='constrained')
        fig.get_layout_engine().set(w_pad=.025, h_pad=.025)
        fig.set_facecolor('white')
        return fig, ax

    def save(fig, name, description):
        for ax in fig.axes:
            for collection in ax.collections:
                collection.set_rasterized(False)
            for text in ax.texts:
                text.set_fontsize(sizes['annotation']['size'])
            for axis in (ax.xaxis, ax.yaxis):
                axis.label.set_fontsize(sizes['axis_title']['size'])
                axis.set_tick_params(labelsize=sizes['tick_label']['size'])
            legend = ax.get_legend()
            if legend:
                for text in legend.get_texts():
                    text.set_fontsize(sizes['legend_text']['size'])
            for line in ax.lines:
                line.set_linewidth(max(floor, weights['data_lines_normal']))
        for item in fig.findobj():
            if isinstance(item, Line2D):
                item.set_markeredgewidth(max(floor, item.get_markeredgewidth()))
            if hasattr(item, 'get_linewidth') and hasattr(item, 'set_linewidth'):
                value = item.get_linewidth()
                if np.isscalar(value) and value > 0:
                    item.set_linewidth(max(floor, min(value, weights['data_lines_thick'])))
        with warnings.catch_warnings():
            warnings.filterwarnings('error', message='Glyph .*missing from font')
            warnings.filterwarnings('error', message='constrained_layout not applied.*')
            fig.canvas.draw()
        texts = [item for item in fig.findobj(Text) if item.get_visible() and item.get_text()]
        minimum = min(text.get_fontsize() for text in texts)
        if minimum < sizes['min_allowed_size']:
            raise ValueError(f'{name}: text below template minimum')
        renderer = fig.canvas.get_renderer()
        legends = [text for ax in fig.axes if ax.get_legend() for text in ax.get_legend().get_texts()]
        checked_text = [text for text in texts if not text.get_clip_on() or text in legends]
        outside = [text.get_text() for text in checked_text
                   if not all(fig.bbox.contains(*point) for point in text.get_window_extent(renderer).get_points())]
        if outside:
            raise ValueError(f'{destination}/{name}: text outside figure: {outside}')
        fig.set_layout_engine('none')
        path = destination / f'{name}.svg'
        fig.savefig(path, metadata={
            'Date': None, 'Creator': 'scripts/build_biology_examples.py',
            'Description': f'Synthetic illustration. {description} Journal: {data["metadata"]["journal_name"]}. Font: {family}.',
        })
        # Keep text editable and embed a subset so browser font substitution cannot alter spacing.
        import base64
        import io

        from fontTools import subset
        from fontTools.ttLib import TTFont
        font = TTFont(font_manager.findfont(family, fallback_to_default=False), recalcTimestamp=False)
        options = subset.Options()
        options.drop_tables += ['FFTM']
        subsetter = subset.Subsetter(options=options)
        subsetter.populate(text=''.join(text.get_text() for text in texts))
        subsetter.subset(font)
        buffer = io.BytesIO()
        font.save(buffer)
        encoded = base64.b64encode(buffer.getvalue()).decode('ascii')
        svg = path.read_text()
        svg = svg.replace('<defs>', f'<defs><style>@font-face {{font-family: \'{family}\'; src: url(data:font/ttf;base64,{encoded});}}</style>', 1)
        path.write_text(apply_palettes(svg))
        checks.append({'plot': name, 'min_font_pt': minimum, 'text_inside': True, 'bytes': path.stat().st_size})
        plt.close(fig)
    fig, ax = canvas()
    # A synthetic rooted tree with branch lengths, not a species relationship claim.
    segments = [(0, 0.06, 2.5, 2.5), (0.06, 0.06, 1, 4),
                (0.06, 0.12, 1, 1), (0.12, 0.12, 0, 2),
                (0.12, 0.19, 0, 0), (0.12, 0.16, 2, 2),
                (0.16, 0.16, 1, 2), (0.16, 0.23, 1, 1), (0.16, 0.25, 2, 2),
                (0.06, 0.14, 4, 4), (0.14, 0.14, 3, 5),
                (0.14, 0.21, 3, 3), (0.14, 0.18, 5, 5),
                (0.18, 0.18, 4, 5), (0.18, 0.26, 4, 4), (0.18, 0.24, 5, 5)]
    for x1, x2, y1, y2 in segments:
        ax.plot([x1, x2], [y1, y2], color=COLORS[0], linewidth=1.3)
    for i, x in enumerate([0.19, 0.23, 0.25, 0.21, 0.26, 0.24]):
        ax.text(x + 0.008, i, f'Isolate {chr(65+i)}', va='center', fontsize=8)
    ax.set(xlim=(0, 0.36), ylim=(-0.5, 5.5), xlabel='Substitutions / site', yticks=[])
    ax.spines['left'].set_visible(False)
    save(fig, 'phylogeny', 'Hypothetical isolate phylogeny; branch lengths are simulated.')

    fig, ax = canvas()
    fold = rng.normal(0, 1.4, 420)
    significance = np.clip(abs(fold) * 1.25 + rng.normal(0, 0.9, len(fold)), 0.02, 7)
    colors = np.where((fold > 1) & (significance > 1.3), COLORS[1],
                      np.where((fold < -1) & (significance > 1.3), COLORS[0], '#AAB1BA'))
    ax.scatter(fold, significance, c=colors, s=9, alpha=0.75, linewidths=0)
    for x in [-1, 1]:
        ax.axvline(x, color='#64748B', linewidth=0.7, linestyle='--')
    ax.axhline(-np.log10(0.05), color='#64748B', linewidth=0.7, linestyle='--')
    ax.set(xlabel='log2 fold change', ylabel='−log10 adjusted P', xlim=(-4.5, 4.5), ylim=(0, 7))
    ax.text(-4.2, 6.3, 'Down', color='black', fontsize=8)
    ax.text(3, 6.3, 'Up', color='black', fontsize=8)
    save(fig, 'volcano', 'Simulated differential expression; guides at |log2FC|=1 and adjusted P=0.05.')

    for method, centers in [('tsne', [(-15, 12), (16, 10), (2, -17)]),
                            ('umap', [(-5, 2), (4, 4), (1, -4)]),
                            ('pca', [(-3, 2), (3, 1), (0, -3)])]:
        fig, ax = canvas()
        scale = {'tsne': 4, 'umap': 1.2, 'pca': 1.5}[method]
        for j, (cx, cy) in enumerate(centers):
            points = rng.normal(size=(85, 2)) * [scale * 1.3, scale * 0.7]
            angle = j * 0.8
            points = points @ np.array([[np.cos(angle), -np.sin(angle)], [np.sin(angle), np.cos(angle)]])
            ax.scatter(points[:, 0] + cx, points[:, 1] + cy, s=10, color=COLORS[j],
                       marker=['o', '^', 's'][j], alpha=0.7, linewidths=0, label=['T', 'B', 'Mono'][j])
        names = {'tsne': ('t-SNE 1', 't-SNE 2'), 'umap': ('UMAP 1', 'UMAP 2'), 'pca': ('PC 1', 'PC 2')}
        ax.set(xlabel=names[method][0], ylabel=names[method][1])
        ax.legend(loc='upper center', bbox_to_anchor=(0.5, 1.28), ncol=3, fontsize=sizes['legend_text']['size'],
                  frameon=False, handletextpad=0.2, columnspacing=0.6)
        save(fig, method, f'Schematic {method.upper()} coordinates of three cell populations; not a fitted embedding.')

    fig, ax = canvas()
    genes = ['CD3D', 'IL7R', 'MS4A1', 'CD79A', 'LYZ', 'S100A8']
    values = np.array([[2, -1, -0.8], [1.5, -0.7, -1], [-1, 2, -0.6], [-0.8, 1.7, -1], [-1, -0.9, 2], [-0.6, -1, 1.8]])
    values += rng.normal(0, 0.15, values.shape)
    cmap = placeholder_map('a1')
    im = ax.pcolormesh(np.arange(4) - .5, np.arange(7) - .5, values, cmap=cmap, vmin=-2, vmax=2, rasterized=False)
    ax.invert_yaxis()
    ax.set(xticks=range(3), xticklabels=['T', 'B', 'Mono'], yticks=range(6), yticklabels=genes)
    ax.tick_params(axis='both', length=0)
    fig.colorbar(im, ax=ax, shrink=0.85, label='Expression z-score')
    save(fig, 'heatmap', 'Synthetic marker-gene expression, scaled by gene.')

    fig, ax = canvas()
    samples = [rng.lognormal(0.5 + i * 0.45, 0.3, 24) for i in range(3)]
    box = ax.boxplot(samples, patch_artist=True, tick_labels=['Control', 'Low dose', 'High dose'], widths=0.5)
    for patch, color in zip(box['boxes'], COLORS):
        patch.set(facecolor=color, alpha=0.3)
    for i, values in enumerate(samples):
        ax.scatter(rng.normal(i + 1, 0.05, len(values)), values, s=8, color=COLORS[i], alpha=0.65)
    ax.set(ylabel='IFIT1 expression', xlabel='Treatment')
    save(fig, 'expression', 'Simulated IFIT1 expression; boxes show quartiles, center lines medians, whiskers 1.5 IQR.')

    fig, ax = canvas()
    ax.bar(['D1', 'D2', 'D3', 'D4', 'D5', 'D6'], [32, 45, 38, 52, 41, 47], color=COLORS[0], width=0.65)
    ax.set(xlabel='Donor', ylabel='Reads / cell (×10³)', ylim=(0, 60))
    save(fig, 'library-size', 'Synthetic sequencing depth across six mock donors.')

    fig, ax = canvas()
    time = np.linspace(0, 1, 70)
    for i, (gene, curve) in enumerate([('IL7R', 1.1 - time), ('LYZ', time**2), ('MKI67', np.exp(-((time-0.5)/0.18)**2))]):
        ax.plot(time, curve, color=COLORS[i], label=gene, linestyle=['-', '--', ':'][i], linewidth=1.8)
    ax.set(xlabel='Pseudotime', ylabel='Scaled expression')
    ax.legend(frameon=False, fontsize=sizes['legend_text']['size'], loc='upper center', bbox_to_anchor=(.5, 1.28), ncol=3, handlelength=1.2, handletextpad=.3, columnspacing=.6)
    save(fig, 'pseudotime', 'Schematic marker trajectories; no trajectory inference was performed.')

    fig, ax = canvas()
    pathways = ['Interferon', 'Antigen\npresentation', 'Cell cycle', 'Chemotaxis', 'Translation']
    ratios = [0.31, 0.24, 0.19, 0.16, 0.11]
    scores = [5.3, 4.1, 3.2, 2.6, 1.8]
    points = ax.scatter(ratios, range(5), s=[150, 120, 90, 65, 45], c=scores, cmap=placeholder_map('a2'), vmin=1, vmax=6)
    ax.set(yticks=range(5), yticklabels=pathways, xlabel='Gene ratio', xlim=(0.05, 0.37), ylim=(-0.5, 4.5))
    fig.colorbar(points, ax=ax, shrink=0.85, label='−log10 adjusted P')
    ax.text(0.06, 4.35, 'Area: gene count', fontsize=7)
    save(fig, 'enrichment', 'Synthetic pathway enrichment. Dot area encodes gene count; color encodes adjusted P.')
    return checks


if __name__ == '__main__':
    manifest = {}
    for template in sorted((DESTINATION.parents[2] / 'templates').glob('*/*.yaml')):
        data = yaml.safe_load(template.read_text())
        family = resolve_font(data)
        profile = {'key': template.stem, 'font': family, 'requested_font': data['figure_typography']['family_preferences']['primary'],
                       'source': {key: data[key] for key in ['figure_geometry', 'figure_typography', 'line_weights', 'panel_labeling', 'manuscript_layout']}, 'layouts': {}}
        for count in [1, 2, 3, 10]:
            layout = layout_for(data, count)
            with plt.rc_context():
                layout['checks'] = make_examples(data, DESTINATION / template.stem / str(count), layout, family)
            profile['layouts'][str(count)] = layout
        manifest[data['metadata']['journal_name']] = profile
        print(f'Generated and checked {template.stem}: 40 plot assets', flush=True)
    target = DESTINATION / 'profiles.js'
    target.write_text('// Generated by scripts/build_biology_examples.py.\nwindow.JCT_BIOLOGY_PROFILES = ' + json.dumps(manifest, indent=2) + ';\n')

/* Biological figure layouts and mock report. SVG sources: scripts/build_biology_examples.py. */
window.JCT_NAMING_PREVIEW = (() => {
  const PLOTS = [
    ['phylogeny', 'Phylogenetic tree', 'Hypothetical isolate relationships; branch lengths are simulated.'],
    ['volcano', 'Volcano plot', 'Simulated differential expression; dashed guides mark |log₂FC| = 1 and adjusted P = 0.05.'],
    ['tsne', 't-SNE', 'Schematic cell populations; coordinates are illustrative, not a fitted embedding.'],
    ['umap', 'UMAP', 'Schematic cell populations; coordinates are illustrative, not a fitted embedding.'],
    ['pca', 'PCA', 'Schematic principal-component coordinates for three cell populations.'],
    ['heatmap', 'Expression heatmap', 'Synthetic marker-gene expression, scaled by gene.'],
    ['expression', 'Gene expression', 'Simulated IFIT1 expression; boxes show quartiles and medians, whiskers 1.5 IQR.'],
    ['library-size', 'Sequencing depth', 'Simulated reads per cell across six mock donors.'],
    ['pseudotime', 'Pseudotime', 'Schematic expression trajectories; no trajectory inference was performed.'],
    ['enrichment', 'Pathway enrichment', 'Synthetic enrichment; dot area represents gene count and color represents adjusted P.'],
  ].map(([id, title, description]) => ({ id, title, description }));
  const SERIES = { main: 'Main manuscript', supplementary: 'Supplementary', extended_data: 'Extended Data' };
  const STATUS = { publisher_requirement: 'Publisher requirement', project_recommendation: 'Project recommendation', unverified: 'Unverified' };
  const state = { series: 'main', number: 1, count: 3, start: 0, view: 'preview', author: 'Gonzalez' };
  let colourOptions = { palette: 'Okabe-Ito', cvd: 'normal' };

  function applyColours(preview, options = colourOptions) {
    colourOptions = options;
    const palette = options.palette.toLowerCase().replaceAll(' ', '-');
    // An absent fragment uses the SVG's default Okabe-Ito palette.
    const fragment = palette === 'okabe-ito' && options.cvd === 'normal' ? '' : `#${palette}-${options.cvd}`;
    preview.dataset.palette = options.palette;
    preview.dataset.cvd = options.cvd;
    preview.querySelectorAll('img.biology-plot').forEach(image => {
      image.src = image.getAttribute('src').split('#')[0] + fragment;
    });
    const label = preview.querySelector('.naming-colour-label');
    if (label) label.textContent = `Figure palette: ${options.palette}${options.cvd === 'normal' ? '' : ` · ${options.cvd} simulation`}`;
  }

  function el(tag, className = '', text) {
    const node = document.createElement(tag);
    node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function roman(number) {
    return ['I', 'II', 'III', 'IV'][number - 1] || String(number);
  }
  function format(pattern, number, title = '') {
    return pattern.replaceAll('{number:02d}', String(number).padStart(2, '0'))
      .replaceAll('{number}', String(number)).replaceAll('{title}', title);
  }
  function disclosure(title, ...children) {
    const details = el('details', 'naming-preview-details');
    details.append(el('summary', '', title), ...children);
    return details;
  }
  function evidence(rule, label) {
    if (!rule) return el('span', 'naming-status', 'Guidance unavailable');
    const button = el('button', 'naming-evidence', `${label} · ${STATUS[rule.status] || 'Unverified'} ↗`);
    button.type = 'button';
    button.addEventListener('click', () => {
      const target = document.getElementById(`naming-rule-${rule.id}`);
      if (!target) return;
      target.closest('details').open = true;
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: 'center' });
    });
    return button;
  }

  function render(preview, data, options = colourOptions) {
    colourOptions = options;
    preview.replaceChildren();
    const naming = data.naming_conventions;
    const profile = window.JCT_BIOLOGY_PROFILES?.[data.metadata.journal_name];
    const sourceMatches = profile && Object.entries(profile.source).every(([key, value]) => JSON.stringify(value) === JSON.stringify(data[key]));
    if (!sourceMatches) {
      preview.append(el('p', 'naming-profile-warning', 'Journal artwork needs rebuilding for these settings. Run scripts/build_biology_examples.py.'));
      return;
    }
    preview.dataset.journal = profile.key;
    preview.style.setProperty('--journal-caption-leading', profile.key === 'jco' ? '2' : '1.25');
    const typography = data.figure_typography.font_sizes;
    const manuscript = data.manuscript_layout;
    const body = manuscript.body_typography;
    const fontStack = family => `"${family}", ${family.includes('Times') || family.includes('Roman') ? '"Liberation Serif", serif' : '"Liberation Sans", Arial, sans-serif'}`;
    preview.style.setProperty('--journal-font', fontStack(profile.font));
    preview.style.setProperty('--journal-body-font', fontStack(body.font_family));
    preview.style.setProperty('--journal-body-size', `${body.font_size_pt}pt`);
    preview.style.setProperty('--journal-line-height', manuscript.spacing.line_spacing === 'double' ? '2' : '1');
    preview.style.setProperty('--journal-title-size', `${manuscript.heading_hierarchy.title.size_pt}pt`);
    preview.style.setProperty('--journal-heading-size', `${manuscript.heading_hierarchy.h1.size_pt}pt`);
    preview.style.setProperty('--journal-rule-width', `${data.line_weights.axis_lines}pt`);

    const rule = (group, id) => naming[group]?.find(item => item.id === id);
    const availableSeries = ['main', 'supplementary', ...(naming.extended_data ? ['extended_data'] : [])];
    if (!availableSeries.includes(state.series)) state.series = 'main';

    function conventions(series) {
      const main = series === 'main';
      return {
        figure: rule(main ? 'figures' : series, main ? 'figure_numbering' : `${series}_figure_numbering`),
        table: rule(main ? 'tables' : series, main ? 'table_numbering' : `${series}_table_numbering`),
        caption: rule(main ? 'captions' : series, main ? 'caption_heading' : `${series}_captions`),
        tableTitle: rule(main ? 'tables' : series, main ? 'table_title' : `${series}_captions`),
        figureFiles: rule('filenames', main ? 'figure_filenames' : `${series}_filenames`),
        tableFiles: rule('filenames', main ? 'table_filenames' : `${series}_filenames`),
      };
    }
    function identifier(item, number) {
      if (!item?.pattern) return 'Example unavailable';
      return format(item.pattern, item.numbering?.style === 'roman_upper' ? roman(number) : number);
    }
    function filename(series, kind, number, caption = false) {
      const prefix = series === 'main' ? '' : `${series}_`;
      const item = conventions(series)[kind === 'figure' ? 'figureFiles' : 'tableFiles'];
      if (item?.pattern) {
        const author5 = state.author.replace(/[^a-z]/gi, '').slice(0, 5).toLowerCase() || 'author';
        const name = format(item.pattern, number).replaceAll('{author5}', author5);
        return caption ? name.replace('.{ext}', '_caption.docx') : name;
      }
      return `${prefix}${kind}_${String(number).padStart(2, '0')}${caption ? '_caption.docx' : '.{ext}'}`;
    }
    function panelLetter(index) {
      let letter = String.fromCharCode(97 + index);
      if (data.panel_labeling.case === 'uppercase') letter = letter.toUpperCase();
      return (data.panel_labeling.punctuation || 'a').replace(/a/gi, letter);
    }
    function createFigure(series, number, count, start = 0) {
      const rules = conventions(series);
      const figure = el('figure', 'naming-paper-figure');
      figure.dataset.series = series;
      figure.dataset.panelCount = count;
      const layout = profile.layouts[count];
      figure.dataset.journal = profile.key;
      figure.dataset.widthMm = layout.width_mm;
      figure.dataset.heightMm = layout.height_mm;
      figure.style.maxWidth = `${layout.width_mm * 5 + 44}px`;
      const plate = el('div', 'naming-plate');
      plate.style.maxWidth = `${layout.width_mm * 5}px`;
      const panels = el('div', 'naming-panels');
      panels.style.gridTemplateColumns = `repeat(${layout.columns}, minmax(0, 1fr))`;
      panels.style.gap = `${layout.gutter_mm / layout.width_mm * 100}cqw`;
      panels.style.setProperty('--panel-label-size', `${typography.panel_label.size * 25.4 / 72 / layout.width_mm * 100}cqw`);
      panels.style.setProperty('--panel-label-height', `${layout.label_height_mm / layout.width_mm * 100}cqw`);
      panels.dataset.labelPosition = data.panel_labeling.position;
      panels.style.setProperty('--panel-label-weight', data.panel_labeling.weight === 'bold' ? '700' : '400');
      panels.dataset.panelCount = count;
      const plots = Array.from({ length: count }, (_, i) => PLOTS[(start + i) % PLOTS.length]);
      plots.forEach((plot, index) => {
        const panel = el('div', 'naming-panel');
        panel.dataset.plot = plot.id;
        const heading = el('h5', 'naming-plot-heading');
        if (count > 1) heading.append(el('strong', 'naming-panel-label', panelLetter(index)));
        heading.append(el('span', 'naming-plot-title', plot.title));
        heading.title = plot.title;
        const image = el('img', 'biology-plot');
        image.src = `images/biology/${profile.key}/${count}/${plot.id}.svg`;
        image.alt = `${plot.title}. ${plot.description}`;
        image.width = Math.round(layout.panel_width_mm * 10);
        image.height = Math.round(layout.panel_height_mm * 10);
        image.loading = 'lazy';
        panel.append(heading, image);
        panels.append(panel);
      });
      const title = count === 1 ? `${plots[0].title}.` : 'Synthetic biology overview.';
      const caption = el('figcaption', 'naming-figure-caption');
      const heading = series === 'main' && rules.caption?.pattern
        ? format(rules.caption.pattern, number, title)
        : `${identifier(rules.figure, number)}. ${title}`;
      caption.append(el('strong', '', heading));
      caption.append(el('span', 'naming-panel-descriptions', plots.map((plot, index) =>
        `${count > 1 ? `${panelLetter(index)} ` : ''}${count === 10 ? plot.title + '.' : plot.description}`).join(' ')));
      if (count === 10) caption.append(el('span', 'naming-panel-descriptions', 'All values are synthetic; embeddings and trajectories are schematic. T, T cells; B, B cells; Mono, monocytes (85 points each). Expression: 24 simulated values per condition; boxes show quartiles and medians, whiskers 1.5 IQR. Enrichment: dot area shows gene count; color shows −log₁₀ adjusted P.'));
      plate.append(panels);
      figure.append(plate, caption);
      return figure;
    }
    function createTable(series, number) {
      const rules = conventions(series);
      const frame = el('div', 'naming-table-frame');
      frame.dataset.series = series;
      frame.dataset.journal = profile.key;
      frame.dataset.widthMm = data.figure_geometry.column_widths.double_column.width;
      if (series === 'extended_data') {
        frame.style.setProperty('--table-font', fontStack(profile.font));
        frame.style.setProperty('--table-size', '7pt');
      }
      const table = el('table', 'naming-paper-table');
      const title = 'Synthetic cell atlas';
      const isRoman = rules.table?.numbering?.style === 'roman_upper';
      const heading = series === 'main' && rules.tableTitle?.pattern
        ? format(rules.tableTitle.pattern, isRoman ? roman(number) : number, isRoman ? title.toUpperCase() : title)
        : `${identifier(rules.table, number)}. ${title}`;
      table.append(el('caption', isRoman ? 'naming-table-roman' : '', heading));
      const head = el('thead');
      const headRow = el('tr');
      ['Population', 'Cells', 'Example marker'].forEach(text => {
        const cell = el('th', '', text);
        cell.scope = 'col';
        headRow.append(cell);
      });
      head.append(headRow);
      const body = el('tbody');
      [['T cells', '85', 'CD3D'], ['B cells', '85', 'MS4A1'], ['Monocytes', '85', 'LYZ']].forEach(values => {
        const row = el('tr');
        values.forEach((value, index) => {
          const cell = el(index === 0 ? 'th' : 'td', '', value);
          if (index === 0) cell.scope = 'row';
          row.append(cell);
        });
        body.append(row);
      });
      table.append(head, body);
      frame.append(table, el('p', 'naming-table-note', 'Synthetic counts; markers are illustrative. T, T cells; B, B cells; Mono, monocytes.'));
      return frame;
    }
    function figureDetails(series, number) {
      const rules = conventions(series);
      const files = el('div', 'naming-file-link');
      files.append(el('code', '', filename(series, 'figure', number)), evidence(rules.figureFiles, 'Filename'),
        el('span', '', 'If individual captions are requested'), el('code', '', filename(series, 'figure', number, true)));
      return disclosure('Figure rules & filenames', evidence(rules.figure, 'Numbering'),
        evidence(rules.caption, 'Caption heading'), files);
    }
    function tableDetails(series, number) {
      const rules = conventions(series);
      const files = el('div', 'naming-file-link');
      files.append(el('code', '', filename(series, 'table', number)), evidence(rules.tableFiles, 'Filename'));
      return disclosure('Table rules & filename', evidence(rules.table, 'Numbering'), evidence(rules.tableTitle, 'Table title'), files);
    }

    const viewControls = el('div', 'naming-view-controls');
    const previewButton = el('button', 'btn-pill', 'Figure preview');
    const reportButton = el('button', 'btn-pill', 'Mock report');
    previewButton.type = reportButton.type = 'button';
    previewButton.setAttribute('aria-controls', 'naming-figure-workspace');
    reportButton.setAttribute('aria-controls', 'naming-mock-report');
    viewControls.append(previewButton, reportButton, el('span', 'naming-demo-label', 'Synthetic data · journal settings applied'));
    preview.append(viewControls);
    const settings = el('div', 'naming-applied-settings');
    const fonts = typography;
    settings.append(el('p', '', `${data.metadata.journal_name} · labels ${fonts.panel_label.size} pt · axes ${fonts.axis_title.size} pt · ticks ${fonts.tick_label.size} pt · minimum stroke ${data.line_weights.min_allowed_weight} pt`));
    settings.append(el('p', 'naming-colour-label'));
    const details = disclosure('Applied settings & source guidance',
      el('p', '', `Artwork: ${profile.font}${profile.font !== profile.requested_font ? ` (${profile.requested_font} substitute)` : ''}. Embedded editable text; vector plots. Panel layouts scale together on smaller screens.`),
      el('p', '', `Captions and main tables use the manuscript font: ${body.font_family}, ${body.font_size_pt} pt. Report text uses ${manuscript.spacing.line_spacing} spacing. Nature Extended Data tables use 7 pt sans-serif text.`),
      el('p', '', 'SVGs are browser previews. Submission files must use the formats listed below. Naming rules marked unverified still need publisher confirmation.'),
      el('p', '', 'Figure colours follow the scientific palette selector above. Heatmaps use palette-derived colours around a neutral zero; enrichment uses a sequential scale. Colour-vision simulations also apply to plots and colour bars. These palette choices are examples, not journal-mandated colours.'),
      el('p', '', `Main figure vector formats: ${data.export_requirements.preferred_vector_formats.map(item => item.format).join(', ')}. Raster resolution: ${data.export_requirements.resolution_dpi.line_art} dpi (line art), ${data.export_requirements.resolution_dpi.combination_art} dpi (mixed artwork), ${data.export_requirements.resolution_dpi.photographic_halftone} dpi (photographs).`));
    const source = el('a', '', 'Publisher instructions ↗');
    source.href = data.metadata.guidelines_url;
    source.target = '_blank';
    source.rel = 'noopener noreferrer';
    details.append(source);
    if (['science', 'cell'].includes(profile.key)) details.append(el('p', '', 'Current publisher pages were unavailable during this review; these figures apply the existing template settings.'));
    if (naming.extended_data) details.append(el('p', '', 'Nature Extended Data: maximum 180 × 170 mm; strokes 0.25–1 pt; tables 7 pt. Final files: JPEG, TIFF or EPS, at most 10 MB.'));
    settings.append(details);
    preview.append(settings);
    const workspace = el('div');
    workspace.id = 'naming-figure-workspace';
    const controls = el('div', 'naming-preview-controls');
    function select(id, title, options, value, onChange) {
      const group = el('div', 'naming-control');
      const label = el('label', '', title);
      label.htmlFor = id;
      const input = el('select');
      input.id = id;
      options.forEach(([key, text]) => {
        const option = el('option', '', text);
        option.value = key;
        input.append(option);
      });
      input.value = value;
      input.addEventListener('change', () => { onChange(input.value); draw(); });
      group.append(label, input);
      controls.append(group);
    }
    select('naming-series', 'Series', availableSeries.map(key => [key, SERIES[key]]), state.series, value => { state.series = value; });
    select('naming-example-number', 'Item', [1, 2, 3].map(number => [number, String(number)]), state.number, value => { state.number = Number(value); });
    select('naming-panel-count', 'Plots per figure', [1, 2, 3, 10].map(n => [n, n]), state.count, value => { state.count = Number(value); });
    select('naming-first-plot', 'First plot', PLOTS.map((plot, i) => [i, plot.title]), state.start, value => { state.start = Number(value); });
    if (conventions('main').figureFiles?.pattern?.includes('{author5}')) {
      const group = el('div', 'naming-control');
      const label = el('label', '', 'Primary author surname');
      label.htmlFor = 'naming-author';
      const input = el('input');
      input.id = 'naming-author';
      input.value = state.author;
      input.addEventListener('input', () => { state.author = input.value; report.replaceChildren(); draw(); });
      group.append(label, input);
      controls.append(group);
    }
    const canvas = el('div', 'naming-preview-canvas');
    canvas.setAttribute('aria-live', 'polite');
    workspace.append(controls, canvas);
    const report = el('article', 'naming-report');
    report.id = 'naming-mock-report';
    preview.append(workspace, report);

    function draw() {
      canvas.replaceChildren();
      const rules = conventions(state.series);
      const grid = el('div', 'naming-preview-grid');
      grid.dataset.panelCount = state.count;
      grid.dataset.previewSequence = state.series;
      const figureCard = el('div', 'naming-display-card');
      figureCard.append(el('h4', '', 'Figure & caption'), createFigure(state.series, state.number, state.count, state.start), figureDetails(state.series, state.number));
      const tableCard = el('div', 'naming-display-card naming-table-card');
      tableCard.append(el('h4', '', 'Table & title'), createTable(state.series, state.number), tableDetails(state.series, state.number));
      grid.append(figureCard, tableCard);
      const reference = disclosure('In-text references', el('p', '', `See ${identifier(rules.figure, state.number)} and ${identifier(rules.table, state.number).replace(/^TABLE /, 'Table ')}.`),
        evidence(rules.figure, 'Figure identifier'), evidence(rules.table, 'Table identifier'),
        el('p', 'naming-preview-note', 'Separate-file examples use {ext} for a journal-accepted format.'));
      reference.classList.add('naming-reference');
      const layout = profile.layouts[state.count];
      canvas.append(el('p', 'naming-dimensions', `${layout.width_mm.toFixed(1)} × ${layout.height_mm.toFixed(1)} mm artwork · ${layout.columns} ${layout.columns === 1 ? 'column' : 'columns'} of panels · caption below`), grid, reference);
      applyColours(preview);
    }
    function buildReport() {
      report.replaceChildren();
      const heading = el('div', 'naming-report-header');
      heading.append(el('p', 'naming-report-kicker', `${data.metadata.journal_name} · MOCK REPORT`),
        el('h3', '', 'A synthetic atlas of immune-cell diversity'),
        el('p', '', 'Illustrative isolate relationships, cell populations and molecular readouts. All values are synthetic; embeddings are schematic, not fitted analyses.'));
      const nav = el('nav', 'naming-report-nav');
      nav.setAttribute('aria-label', 'Mock report sections');
      availableSeries.forEach(series => {
        const link = el('a', '', SERIES[series]);
        link.href = `#mock-report-${series}`;
        nav.append(link);
      });
      heading.append(nav);
      report.dataset.lineNumbering = manuscript.spacing.line_numbering;
      report.dataset.pageSize = manuscript.page.size;
      report.append(heading);
      const required = el('ol');
      manuscript.required_sections.forEach(text => required.append(el('li', '', text)));
      report.append(disclosure('Manuscript structure & limits',
        el('p', '', `${manuscript.page.size}; margins ${Object.entries(manuscript.page.margins_mm).map(([edge, mm]) => `${edge} ${mm} mm`).join(', ')}; ${manuscript.spacing.line_numbering} line numbering.`),
        el('p', '', `Abstract ≤ ${manuscript.limits.abstract_max_words} words; main text ≤ ${manuscript.limits.main_text_max_words} words; main display items ≤ ${manuscript.limits.max_display_items}. This report presents layout examples, not a complete manuscript.`), required));
      for (const series of availableSeries) {
        const section = el('section', 'naming-report-section');
        section.id = `mock-report-${series}`;
        section.dataset.reportSeries = series;
        const rules = conventions(series);
        section.append(el('h4', '', SERIES[series]));
        const lead = el('p', 'naming-report-lead', 'Layout examples: ');
        [1, 2, 3, 10].forEach((count, index) => {
          const link = el('a', '', `${identifier(rules.figure, index + 1)} (${count} ${count === 1 ? 'plot' : 'plots'})`);
          link.href = `#mock-${series}-figure-${index + 1}`;
          if (index) lead.append(' · ');
          lead.append(link);
        });
        section.append(lead, disclosure('Series rules', evidence(rules.figure, 'Figure numbering'), evidence(rules.caption, 'Captions'), evidence(rules.table, 'Table numbering')));
        [1, 2, 3, 10].forEach((count, index) => {
          const item = el('div', 'naming-report-item');
          item.id = `mock-${series}-figure-${index + 1}`;
          const figure = createFigure(series, index + 1, count, 0);
          item.append(figure, figureDetails(series, index + 1));
          section.append(item);
        });
        if (series === 'main' && manuscript.limits.max_display_items < 5) {
          section.append(el('p', 'naming-report-lead', 'The main display-item allowance is used by the four figure examples. The table appears in Supplementary.'));
          report.append(section);
          continue;
        }
        const tableItem = el('div', 'naming-report-table');
        tableItem.append(createTable(series, 1), tableDetails(series, 1));
        section.append(tableItem);
        report.append(section);
      }
      const notes = disclosure('About these illustrations',
        el('p', '', 'Single-panel figures omit panel letters; multi-panel captions follow the selected journal’s panel labels. Tables, supplementary items and Extended Data have independent number sequences. This is a layout demonstration, not a submission-ready manuscript.'),
        el('p', '', 'Plots were generated reproducibly with Matplotlib. No clinical data, differential-expression tests, dimensionality reduction, or phylogenetic inference were performed.'));
      report.append(notes);
      applyColours(preview);
    }
    function setView(view) {
      state.view = view;
      workspace.hidden = view !== 'preview';
      report.hidden = view !== 'report';
      previewButton.setAttribute('aria-pressed', String(view === 'preview'));
      reportButton.setAttribute('aria-pressed', String(view === 'report'));
      if (view === 'report' && !report.childElementCount) buildReport();
    }
    previewButton.addEventListener('click', () => setView('preview'));
    reportButton.addEventListener('click', () => setView('report'));
    draw();
    setView(state.view);
  }
  return { render, applyColours };
})();

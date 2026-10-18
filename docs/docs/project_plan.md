# Scientific Journal Compliance Templates: Project Plan & Specification

## 1. Executive Summary & Vision

Academics and researchers routinely spend tens of hours formatting and re-formatting figures, charts, and manuscripts to satisfy stringent author guidelines across different journals. Reviewers and production editors ("sticklers") enforce strict constraints on column widths, typeface hierarchies, stroke weights, color spaces, resolution (DPI), line spacing, and document structure.

In parallel, the rapid adoption of AI tools across academia has introduced strict **AI compliance guidelines**: top publishers now strictly ban generative AI for scientific figures and require formal disclosure statements for text or code generation to prevent desk rejections and research integrity flags.

The objective of this project is to build an open-source, standardized repository containing **machine-readable and human-auditable compliance templates** for all major scientific journals, starting with Tier 1 flagships (*Nature*, *IEEE*, *ACS*, *Science/AAAS*, *Cell/Elsevier*).

To maximize contact surface and adoption across diverse scientific disciplines, the repository provides:
1. **Human-auditable templates (YAML)** with full source annotations, quotations, and official guideline citations.
2. An **interactive HTML documentation interface** for visually browsing, inspecting, and copying requirements.
3. **Automated figure exporters** for primary plotting stacks:
   - **Python**: Matplotlib stylesheets (`.mplstyle`) and Seaborn configurations.
   - **R**: `ggplot2` custom theme functions (`theme_nature()`, `theme_ieee()`).
   - **Vector Design**: Inkscape/Illustrator blank canvas templates with pre-aligned column grids and guide rulers.
   - **Modern Typesetting**: LaTeX (`tikz`, `pgfplots`, dimension macros) and Typst figure modules.
   - **Scientific GUIs**: Presets and reference cards for GraphPad Prism and Origin.
4. **Pre-populated manuscript starter generators**:
   - **Word (`.docx`)**: Automated generation of pre-styled `.docx` templates with exact publisher margins, body font, 1.5/double line spacing, continuous line numbers, heading hierarchies, required disclosure sections (Data Availability, Competing Interests), and official **AI declaration statements**.
   - **LaTeX (`.tex`) & Typst (`.typ`)**: Standalone, clean starter documents preconfigured with journal-specific document classes, packages, and formatting conventions.
5. **AI Usage Compliance & Formal Disclosure Boilerplates**: Explicit tracking of publisher-specific AI policies (authorship bans, generative image prohibitions, and verbatim declaration statements).
6. **Pre-flight verification tools** (CLI linter) to validate figures and manuscripts prior to submission.

---

## 2. Template Format Strategy: YAML vs. JSON & The Interactive Doc Interface

To satisfy both stringent human scrutiny ("sticklers") and automated tooling:

### 2.1 Format Choice: Annotated YAML as Source of Truth
* **Why YAML for Authoring**:
  - **Inline comments & citations**: YAML natively supports `#` comments. Every rule (e.g., minimum line width: 0.25 pt, column width: 89 mm, abstract word limit: 150, AI figure policy) includes the exact page number, quotation, and URL from the publisher's author guide.
  - **Readability**: No noisy curly braces, brackets, or quoted keys; clean indentation minimizes cognitive overhead.
* **Dual Output (Automatic JSON generation)**:
  - YAML files are 1:1 serializable to JSON. A build step generates corresponding JSON schemas and artifacts in `dist/json/` for web tools, APIs, and automated validation pipelines.

### 2.2 Interactive HTML Documentation & Template Viewer
To elevate aesthetics and maximize readability:
* A lightweight, zero-dependency (or static-site) **HTML/CSS/JS Template Explorer** will be hosted directly via GitHub Pages.
* **Features**:
  - **Visual Column Comparison**: Interactive visualizer showing how single, 1.5, and 2-column figures look relative to page size.
  - **Typography Scale Visualizer**: Live rendered preview of figure labels, axis titles, tick marks, and captions at actual point sizes.
  - **Color Palette & Accessibility Inspector**: Displays recommended palettes (e.g. Okabe-Ito, Viridis) with live color blindness simulation (Deuteranopia, Protanopia, Tritanopia).
  - **AI Compliance Badges & Boilerplate**: Highlights journal-specific AI policies (e.g., whether generative figures are prohibited) and provides copy-paste approved declaration statements.
  - **One-Click Snippet & Template Download**: Copy-paste buttons for Matplotlib code, R ggplot2 code, raw YAML/JSON, and one-click download of prepopulated `.docx` and `.tex` manuscripts.
  - **Direct Guideline Audit Trail**: Links directly to the exact publisher documentation source with last-verified timestamps.

---

## 3. Researcher Tooling Matrix: Expanding the Contact Surface

Different academic fields rely on distinct software stacks. To maximize utility, the project provides export bridges for the dominant tools:

| Domain / Stack | Specific Tools | Export Format / Deliverable | Primary Use Case |
| :--- | :--- | :--- | :--- |
| **Python Ecosystem** | Matplotlib, Seaborn, Plotly | `.mplstyle` files, `journal_style()` Python context manager | Computational physics, data science, machine learning, bioinformatics. |
| **R Ecosystem** | R, `ggplot2`, `cowplot`, `patchwork` | R package / standalone script (`theme_nature.R`, `theme_ieee.R`) | Biostatistics, ecology, genomics, social sciences. |
| **Manuscript Word Processors** | Microsoft Word, LibreOffice, Google Docs | Pre-styled `.docx` templates (via `python-docx`) with journal fonts, line numbering, spacing, required sections, and AI disclosure placeholders | General wet-lab biology, clinical/medical research, cross-disciplinary authors. |
| **Academic Document Typesetting** | LaTeX, Typst, Overleaf | Pre-configured `.tex` starter files (document classes, `lineno`, `setspace`, AI declaration block) and `.typ` Typst modules | Theoretical physics, CS, engineering, mathematics. |
| **Vector Graphics** | Inkscape, Adobe Illustrator, Affinity | Scalable `.svg` & `.ai` figure templates with configured artboards, guide lines, and color swatches | Multipanel schematics, biological diagrams, composite figures. |
| **Scientific GUI Plotters** | GraphPad Prism, OriginLab | Prism XML theme/palette files, Origin template instructions (`.otpu`) | Molecular biology, pharmacology, wet-lab benchwork, experimental materials science. |

---

## 4. Scope & Journal Prioritization

### Tier 1 (Immediate Focus)
1. **Nature Portfolio** (*Nature*, *Nature Communications*, *Nature Methods*, *Scientific Reports*)
   - Figures: Widths 89 mm (1-col), 120 mm (1.5-col), 180 mm (2-col). Max height: 225 mm. Helvetica / Arial (5–8 pt). Panel labels: lowercase bold (`a`, `b`, `c`).
   - Manuscript: Double-spaced or 1.5, continuous line numbering, strict abstract limits (≤150 words unreferenced in Nature), explicit Data & Code Availability sections.
   - AI Policy: AI tools ineligible for authorship; generative AI images strictly prohibited (with narrow exceptions for research *on* AI); AI usage in writing/analysis must be disclosed in Methods/Acknowledgments.
2. **IEEE** (*IEEE Transactions*, *IEEE Open Access*, Conference Proceedings)
   - Figures: Widths 3.5 in / 88.9 mm (1-col), 7.16 in / 181.8 mm (2-col). Times New Roman / Helvetica. Strict line weight (>0.5 pt), high DPI TIFF/EPS.
   - Manuscript: IEEEtran document class, 2-column layout, Roman numeral section headings, strict author bio format.
   - AI Policy: AI ineligible for authorship; disclosure required in Acknowledgments or Methods; synthetic data/figures must be explicitly documented.
3. **ACS (American Chemical Society)** (*JACS*, *ACS Nano*, *Nano Letters*)
   - Figures: Widths 3.25 in / 82.5 mm (1-col), 4.5 in / 114 mm (1.5-col), 7 in / 178 mm (2-col). Arial / Helvetica or Times (6–10 pt). Standardized chemical structure formatting.
   - Manuscript: Double spacing, line numbering, graphic Table of Contents (TOC) / Abstract graphic dimensions (3.25 × 1.75 in).
   - AI Policy: AI cannot be listed as author; disclosure required in manuscript acknowledgments or dedicated note.
4. **AAAS / Science** (*Science*, *Science Advances*)
   - Figures: Widths 55 mm (1-col), 120 mm (1.5-col), 175 mm (full page). Helvetica / Arial (6–9 pt). Bold panel identifiers.
   - Manuscript: Double spaced, line numbering, structured one-sentence summaries, short abstracts (≤125 words).
   - AI Policy: Strict prohibition on AI-generated images/figures; text generation must be disclosed and cited; AI ineligible for authorship.
5. **Elsevier / Cell Press** (*Cell*, *Neuron*, *Molecular Cell*, General Elsevier)
   - Figures: Widths 85 mm (1-col), 114 mm (1.5-col), 174 mm (2-col). Strict accessibility/contrast guidelines.
   - Manuscript: STAR Methods format (for Cell Press), Key Resources Table, Lead Contact designation, graphical abstract specifications.
   - AI Policy: Mandatory standalone section *"Declaration of Generative AI and AI-assisted technologies in the writing process"*; complete ban on generative AI images for scientific figures.

### Tier 2 (Next Milestone)
- **PLOS** (*PLOS ONE*, *PLOS Biology*)
- **PNAS** (*Proceedings of the National Academy of Sciences*)
- **Springer Nature Book Series & Open Journals**
- **APS** (*Physical Review Letters*, *Phys. Rev. B/D*)
- **RSC** (*Chemical Science*, *ChemComm*)

---

## 5. Canonical Specification Schema (v1.0)

Every journal configuration file adheres to this structured schema, incorporating **figure geometry**, **manuscript layout**, and **AI usage policies**:

```yaml
schema_version: "1.0.0"

metadata:
  publisher: "Nature Portfolio"
  journal_name: "Nature"
  issn: "1476-4687"
  guidelines_url: "https://www.nature.com/nature/for-authors/final-submission"
  last_verified: "2026-09-11"
  notes: "Applies to primary research articles and communications."

figure_geometry:
  default_unit: "mm"
  max_height: 225.0
  column_widths:
    single_column:
      width: 89.0
      description: "Standard 1-column"
    one_and_half_column:
      width: 120.0
      description: "Intermediate 1.5-column"
    double_column:
      width: 180.0
      description: "Full-width 2-column spread"
  panel_spacing:
    minimum_gutter: 3.0

figure_typography:
  family_preferences:
    primary: "Helvetica"
    fallback: ["Arial"]
    serif_alternative: "Times New Roman"
  font_sizes:
    unit: "pt"
    panel_label:
      size: 8.0
      weight: "bold"
    axis_title:
      size: 7.0
      weight: "regular"
    tick_label:
      size: 6.0
      weight: "regular"
    legend_title:
      size: 6.5
      weight: "bold"
    legend_text:
      size: 6.0
      weight: "regular"
    annotation:
      size: 5.5
      weight: "regular"
    min_allowed_size: 5.0

line_weights:
  unit: "pt"
  axis_lines: 0.5
  tick_marks: 0.5
  data_lines_normal: 1.0
  data_lines_thick: 1.5
  grid_lines: 0.25
  min_allowed_weight: 0.25

panel_labeling:
  case: "lowercase"   # 'a', 'b', 'c'
  weight: "bold"
  punctuation: ""     # No brackets, no periods
  position: "top_left_outside"
  font_family: "Helvetica"

color_specifications:
  accepted_modes:
    initial_submission: ["RGB"]
    final_production: ["RGB", "CMYK"]
  color_blind_safe_required: true
  recommended_palettes:
    - "Okabe-Ito"
    - "Viridis"
  black_white_contrast_ratio: 4.5

export_requirements:
  preferred_vector_formats:
    - format: "PDF"
      notes: "All fonts embedded or converted to outlines"
    - format: "EPS"
      notes: "Vector text converted to curves"
  accepted_raster_formats:
    - format: "TIFF"
      compression: "LZW"
  resolution_dpi:
    line_art: 1000
    combination_art: 600
    photographic_halftone: 300
  max_file_size_mb: 50

manuscript_layout:
  page:
    size: "A4" # or "Letter"
    margins_mm:
      top: 25.4
      bottom: 25.4
      left: 25.4
      right: 25.4
  spacing:
    line_spacing: "double" # 'double', '1.5', 'single'
    line_numbering: "continuous" # 'continuous', 'per_page', 'none'
  body_typography:
    font_family: "Times New Roman"
    font_size_pt: 12.0
  heading_hierarchy:
    title: { size_pt: 18.0, weight: "bold" }
    h1: { size_pt: 14.0, weight: "bold", numbered: false }
    h2: { size_pt: 12.0, weight: "bold", numbered: false }
    h3: { size_pt: 12.0, weight: "italic", numbered: false }
  limits:
    abstract_max_words: 150
    main_text_max_words: 5000
    max_display_items: 6 # Figures + Tables combined
  required_sections:
    - "Title, Authors, Affiliations"
    - "Abstract"
    - "Introduction"
    - "Results"
    - "Discussion"
    - "Methods"
    - "Data Availability"
    - "Code Availability"
    - "References"
    - "Author Contributions"
    - "Competing Interests"

ai_policy:
  authorship_eligible: false
  generative_imagery_allowed: false
  generative_imagery_exceptions: "Permissible only when the manuscript specifically investigates generative AI models."
  text_and_code_disclosure_required: true
  preferred_disclosure_placement: "Methods" # Nature: Methods/Acknowledgments, Elsevier: Dedicated section
  policy_url: "https://www.nature.com/nature-portfolio/editorial-policies/ai"
  official_statement_template: >
    During the preparation of this manuscript, the author(s) used [TOOL NAME, VERSION, e.g., Claude 3.5 Sonnet / ChatGPT]
    in order to [SPECIFY PURPOSE: e.g., refine grammar and style / assist in drafting Python data analysis routines].
    The author(s) reviewed and edited the output as needed and take full responsibility for the integrity and accuracy
    of all published material.
```

---

## 6. Repository Architecture

```
journal_compliance_templates/
├── .github/
│   └── workflows/
│       ├── test_and_validate.yml  # Validates all YAMLs against JSON schema
│       └── deploy_docs.yml        # Automatically deploys HTML interface to GitHub Pages
├── schemas/
│   └── compliance_schema_v1.json  # Formal JSON Schema
├── templates/
│   ├── nature/
│   │   ├── nature.yaml
│   │   ├── nature_communications.yaml
│   │   └── scientific_reports.yaml
│   ├── ieee/
│   │   ├── ieee_transactions.yaml
│   │   └── ieee_conference.yaml
│   ├── acs/
│   │   ├── jacs.yaml
│   │   └── acs_nano.yaml
│   ├── science/
│   │   ├── science.yaml
│   │   └── science_advances.yaml
│   └── elsevier/
│       ├── cell.yaml
│       └── elsevier_standard.yaml
├── exporters/                     # Multi-tool export bridges
│   ├── figures/
│   │   ├── python/                # Matplotlib .mplstyle & Seaborn theme generator
│   │   ├── r/                     # R ggplot2 theme generator
│   │   └── vector/                # Inkscape & Illustrator SVG grid generator
│   └── manuscript/
│       ├── docx_generator.py      # Produces pre-styled Word (.docx) with line numbers, styles, & AI declaration
│       ├── tex_generator.py       # Produces pre-configured LaTeX (.tex) starter files with AI disclosure block
│       └── typst_generator.py     # Produces pre-configured Typst (.typ) templates
├── web/                           # Interactive HTML Documentation & Template Explorer
│   ├── index.html                 # Sleek UI for viewing and filtering templates
│   ├── app.js                     # Dynamic rendering and snippet generator
│   └── styles.css                 # Clean modern responsive layout
├── tests/
│   ├── test_schema_validity.py    # Pytest schema conformance
│   ├── test_figure_exporters.py   # Verifies generated styles render valid figures
│   └── test_manuscript_gen.py     # Verifies generated .docx/.tex files compile/open cleanly
├── docs/
│   ├── contributing_guidelines.md
│   └── schema_documentation.md
├── pyproject.toml
└── README.md
```

---

## 7. Phased Implementation Roadmap

```mermaid
flowchart TD
    subgraph Phase 1: Core Foundation & Web Viewer
        A[JSON Schema v1.0 with AI Policy] --> B[Interactive HTML Doc Viewer]
        B --> C[CI Schema Validation Pipeline]
    end

    subgraph Phase 2: Tier 1 Journal Authoring
        C --> D1[Nature Portfolio YAMLs]
        C --> D2[IEEE YAMLs]
        C --> D3[ACS YAMLs]
        C --> D4[Science/AAAS YAMLs]
        C --> D5[Cell/Elsevier YAMLs]
    end

    subgraph Phase 3: Figure Tooling Exporters
        D1 & D2 & D3 & D4 & D5 --> E1[Python Matplotlib & Seaborn Bridge]
        D1 & D2 & D3 & D4 & D5 --> E2[R ggplot2 Exporter]
        D1 & D2 & D3 & D4 & D5 --> E3[Inkscape/Illustrator Grid SVG Generator]
    end

    subgraph Phase 4: Manuscript Starters .docx, .tex, .typ
        E1 & E2 & E3 --> M1[Python python-docx Generator with Baked-in Styles & AI Declarations]
        E1 & E2 & E3 --> M2[LaTeX .tex Template Generator with lineno/setspace/AI Block]
        E1 & E2 & E3 --> M3[Typst .typ Layout Generator]
    end

    subgraph Phase 5: Verification Linter & Ecosystem
        M1 & M2 & M3 --> F[CLI Figure & Manuscript Compliance Linter]
        F --> G[Tier 2 Journals & Community PRs]
    end
```

### Detailed Milestones:

- **Milestone 1: Schema & HTML Viewer Scaffold (Sprint 1)** ✅ *COMPLETED*
  - Establish `schemas/compliance_schema_v1.json` encompassing figure geometry, typography, line weights, color, manuscript formatting rules, and AI usage policies.
  - Build the interactive `web/index.html` viewer with live visual column, typography, and AI policy badges.
  - Set up automated CI testing for schema conformity.

- **Milestone 2: Tier 1 Template Authoring (Sprint 2)** ✅ *COMPLETED*
  - Author audited, verified YAML files for Nature, IEEE, ACS, Science, and Cell/Elsevier with direct citations, official URLs, and specific AI policy declarations.
  - Generate corresponding JSON files in `dist/`.

- **Milestone 3: Figure Plotting Exporters (Sprint 3)** ✅ *COMPLETED*
  - Matplotlib `.mplstyle` generator (`mplstyle_generator.py`) with DPI, font embedding (type 42), line weights, and accessible color cycler.
  - R ggplot2 theme generator (`r_theme_generator.py`) providing `theme_<journal>()`, color/fill scales, and `ggsave_<journal>()` helper.
  - Inkscape & Illustrator vector SVG grid generator (`svg_grid_generator.py`) with locked guide layers, dimension limits, gutters, typographical ladders, and embedded swatches.
  - Unified CLI export command `jct export-figures` supporting format filtering and custom accessible palettes.
  - Automated test suite `tests/test_figure_exporters.py` (33 total tests passing).
  - Interactive Web Viewer integration with 1-click download cards for `.mplstyle`, `.R`, and `.svg` canvases.

- **Milestone 4: Pre-Populated Manuscript Generators (Sprint 4)**
  - Implement `docx_generator.py`: builds `.docx` templates pre-configured with the journal's exact margins, body font, heading hierarchy, 1.5/double spacing, continuous line numbering, mandatory disclosure sections, and **formal AI usage declaration template**.
  - Implement `tex_generator.py` and `typst_generator.py`: generates starter `.tex` and `.typ` manuscript files.
  - Add one-click download buttons in the HTML web viewer for `.docx` and `.tex` starters.

- **Milestone 5: Pre-Flight Linter CLI & Tier 2 Scaling (Sprint 5)**
  - Develop `journal-lint` CLI to inspect output PDFs/TIFFs for DPI, font embedding, and physical dimensions before submission.
  - Expand to Tier 2 journals (PLOS, PNAS, Springer, APS, RSC).

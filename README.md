# Scientific Journal Compliance Templates

> **Standardized, machine-readable, and human-auditable formatting & compliance templates for major scientific journals.**

Academics and researchers expend immense effort re-formatting figures, charts, and manuscripts to comply with strict publisher guidelines. This repository provides canonical specifications in annotated **YAML** and compiled **JSON**, paired with automated exporters for **Python (Matplotlib/Seaborn)**, **R (ggplot2)**, **Vector design (Inkscape/Illustrator)**, and **Manuscript processors (.docx, .tex)**.

---

## Features

- 📑 **Human-Auditable & Citation-Backed**: Every rule is documented with page numbers, quotations, and official author guideline URLs.
- 📐 **Rigorous Figure Geometry**: Exact column widths (single, 1.5, double column), gutters, and maximum heights.
- 🔤 **Typographical Hierarchies**: Complete font specifications for panel labels, axis titles, tick labels, legends, and minimum rejection thresholds.
- 🎨 **Color & Accessibility**: Enforces color-blind safe palettes (Okabe-Ito, Viridis) and color space rules (RGB vs. CMYK).
- 🤖 **AI Compliance & Declarations**: Formally captures publisher-specific AI policies, generative image bans, and approved disclosure statements.
- 🌐 **Interactive Documentation Explorer**: A visual web interface to browse requirements, preview column widths and font scales, and copy code snippets.
- 🔄 **Multi-Tool Bridges**: Exporters generating `.mplstyle` presets, `ggplot2` themes, `.docx` templates, and LaTeX starter files.

---

## Supported Journals (Tier 1 Flagships)

| Publisher | Journal | Template | Status |
| :--- | :--- | :--- | :--- |
| **Nature Portfolio** | *Nature* | [`templates/nature/nature.yaml`](templates/nature/nature.yaml) | ✅ Verified |
| **IEEE** | *IEEE Transactions* | [`templates/ieee/ieee_transactions.yaml`](templates/ieee/ieee_transactions.yaml) | ✅ Verified |
| **ACS** | *JACS* | [`templates/acs/jacs.yaml`](templates/acs/jacs.yaml) | ✅ Verified |
| **AAAS / Science** | *Science* | [`templates/science/science.yaml`](templates/science/science.yaml) | ✅ Verified |
| **Elsevier / Cell Press** | *Cell* | [`templates/elsevier/cell.yaml`](templates/elsevier/cell.yaml) | ✅ Verified |

---

## Quickstart

### 1. Installation
Clone the repository and install dependencies using [uv](https://docs.astral.sh/uv/):

```bash
git clone https://github.com/jono/journal_compliance_templates.git
cd journal_compliance_templates
uv sync --all-extras
```

### 2. Cross-Platform Scripts & Quick Commands

Zero-configuration scripts are provided for **Linux**, **macOS**, and **Windows**:

| Action | Linux / macOS (Bash) | Windows (CMD Batch) | Windows (PowerShell) | Python CLI (`jct`) |
| :--- | :--- | :--- | :--- | :--- |
| **Start Server** | `./scripts/serve.sh` | `scripts\serve.bat` | `scripts\serve.ps1` | `uv run jct serve` |
| **Build Assets** | `./scripts/build.sh` | `scripts\build.bat` | `scripts\build.ps1` | `uv run jct build` |
| **Run Tests** | `./scripts/test.sh` | `scripts\test.bat` | `scripts\test.ps1` | `uv run jct test` |
| **CLI Dispatcher** | `./scripts/jct.sh [cmd]` | `scripts\jct.bat [cmd]` | `scripts\jct.ps1 [cmd]` | `uv run jct [cmd]` |

### 3. Interactive Web Documentation Explorer
Run the server script or CLI:
```bash
./scripts/serve.sh
# or on Windows:
# scripts\serve.bat
```
Then navigate to `http://localhost:8000` (or `http://localhost:8080`) to interactively explore templates, test CVD simulations, copy palette formats, and export snippets.

---

## Project Structure

```
├── schemas/
│   └── compliance_schema_v1.json    # JSON Schema definition
├── templates/
│   ├── nature/                      # Nature Portfolio templates
│   ├── ieee/                        # IEEE publishing templates
│   ├── acs/                         # ACS journal templates
│   ├── science/                     # Science / AAAS templates
│   └── elsevier/                    # Cell Press / Elsevier templates
├── scripts/
│   └── build_dist.py                # YAML -> JSON compiler and validator
├── web/
│   ├── index.html                   # Interactive Template Explorer UI
│   ├── styles.css                   # Modern academic interface styling
│   └── app.js                       # Dynamic rendering & snippet generation
├── tests/
│   └── test_schema_validity.py      # Automated schema conformance tests
├── project_plan.md                  # Comprehensive project plan & roadmap
└── pyproject.toml
```

---

## Citation

If you use these compliance templates or framework in your research, academic publications, or plotting workflows, please cite this project as:

### APA
> Vos, J. W. (2026). *Journal Compliance Templates: Machine-Readable Formatting Specifications for Scientific Publishing*. GitHub. https://github.com/jonathanwvos/journal_compliance_templates

### BibTeX
```bibtex
@software{vos2026journalcompliance,
  author       = {Vos, Jonathan W.},
  title        = {Journal Compliance Templates: Machine-Readable Formatting Specifications for Scientific Publishing},
  year         = {2026},
  publisher    = {GitHub},
  url          = {https://github.com/jonathanwvos/journal_compliance_templates}
}
```

---

## License & Contributing

Contributions are welcome! See [`project_plan.md`](project_plan.md) for our roadmap and schema standards.
Licensed under the [MIT License](LICENSE).

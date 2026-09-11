/**
 * Journal Compliance Templates - Interactive Explorer
 */

// Fallback data in case opened directly via file:// protocol
const FALLBACK_JOURNAL = {
  nature: {
    schema_version: "1.0.0",
    metadata: {
      publisher: "Nature Portfolio (Springer Nature)",
      journal_name: "Nature",
      issn: "1476-4687",
      guidelines_url: "https://www.nature.com/nature/for-authors/final-submission",
      last_verified: "2026-09-11",
      notes: "Official guidelines for primary research articles and brief communications."
    },
    figure_geometry: {
      default_unit: "mm",
      max_height: 225.0,
      column_widths: {
        single_column: { width: 89.0, description: "Standard single column width (89 mm / 3.5 in)" },
        one_and_half_column: { width: 120.0, description: "Intermediate 1.5-column width (120 mm / 4.7 in)" },
        double_column: { width: 180.0, description: "Full text-width page spread (180 mm / 7.1 in)" }
      },
      panel_spacing: { minimum_gutter: 3.0 }
    },
    figure_typography: {
      family_preferences: {
        primary: "Helvetica",
        fallback: ["Arial"],
        serif_alternative: "Times New Roman"
      },
      font_sizes: {
        unit: "pt",
        panel_label: { size: 8.0, weight: "bold" },
        axis_title: { size: 7.0, weight: "regular" },
        tick_label: { size: 6.0, weight: "regular" },
        legend_title: { size: 6.5, weight: "bold" },
        legend_text: { size: 6.0, weight: "regular" },
        annotation: { size: 5.5, weight: "regular" },
        min_allowed_size: 5.0
      }
    },
    line_weights: {
      unit: "pt",
      axis_lines: 0.5,
      tick_marks: 0.5,
      data_lines_normal: 1.0,
      data_lines_thick: 1.5,
      grid_lines: 0.25,
      min_allowed_weight: 0.25
    },
    panel_labeling: {
      case: "lowercase",
      weight: "bold",
      punctuation: "",
      position: "top_left_outside",
      font_family: "Helvetica"
    },
    color_specifications: {
      accepted_modes: {
        initial_submission: ["RGB"],
        final_production: ["RGB", "CMYK"]
      },
      color_blind_safe_required: true,
      recommended_palettes: ["Okabe-Ito", "Viridis", "ColorBrewer-Set2"],
      black_white_contrast_ratio: 4.5
    },
    export_requirements: {
      preferred_vector_formats: [
        { format: "PDF", notes: "Vector PDF with all fonts embedded or outlined." },
        { format: "EPS", notes: "Encapsulated PostScript with fonts converted to curves." }
      ],
      accepted_raster_formats: [{ format: "TIFF", compression: "LZW" }],
      resolution_dpi: {
        line_art: 1000,
        combination_art: 600,
        photographic_halftone: 300
      },
      max_file_size_mb: 50
    },
    manuscript_layout: {
      page: { size: "A4", margins_mm: { top: 25.4, bottom: 25.4, left: 25.4, right: 25.4 } },
      spacing: { line_spacing: "double", line_numbering: "continuous" },
      body_typography: { font_family: "Times New Roman", font_size_pt: 12.0 },
      heading_hierarchy: {
        title: { size_pt: 18.0, weight: "bold", numbered: false },
        h1: { size_pt: 14.0, weight: "bold", numbered: false },
        h2: { size_pt: 12.0, weight: "bold", numbered: false },
        h3: { size_pt: 12.0, weight: "italic", numbered: false }
      },
      limits: { abstract_max_words: 150, main_text_max_words: 5000, max_display_items: 6 },
      required_sections: [
        "Title, Authors, Affiliations",
        "Abstract",
        "Main Text (Introduction, Results, Discussion)",
        "Methods",
        "Data Availability",
        "Code Availability",
        "References",
        "Acknowledgements",
        "Author Contributions",
        "Ethics Declarations / Competing Interests"
      ]
    },
    ai_policy: {
      authorship_eligible: false,
      generative_imagery_allowed: false,
      generative_imagery_exceptions: "Permissible only when the manuscript specifically investigates generative AI models.",
      text_and_code_disclosure_required: true,
      preferred_disclosure_placement: "Methods",
      policy_url: "https://www.nature.com/nature-portfolio/editorial-policies/ai",
      official_statement_template:
        "During the preparation of this manuscript, the author(s) used [TOOL NAME, VERSION, e.g., Claude 3.5 Sonnet / ChatGPT] in order to [SPECIFY PURPOSE: e.g., refine prose for readability / assist in drafting Python data processing routines]. The author(s) reviewed and edited the output as needed and take full responsibility for the integrity and accuracy of all published material."
    }
  }
};

const PALETTES = {
  "Okabe-Ito": [
    { hex: "#000000", name: "Black" },
    { hex: "#E69F00", name: "Orange" },
    { hex: "#56B4E9", name: "Sky Blue" },
    { hex: "#009E73", name: "Bluish Green" },
    { hex: "#F0E442", name: "Yellow" },
    { hex: "#0072B2", name: "Blue" },
    { hex: "#D55E00", name: "Vermilion" },
    { hex: "#CC79A7", name: "Reddish Purple" }
  ]
};

// State
let currentJournalKey = "nature";
let currentJournalData = FALLBACK_JOURNAL.nature;
let currentColumnMode = "single_column";
let activeSnippetTab = "matplotlib";
let currentCvdMode = "normal";

// Initialize App
document.addEventListener("DOMContentLoaded", async () => {
  await loadData();
  renderJournalView();
  setupEventListeners();
});

async function loadData() {
  try {
    const res = await fetch("data/all_journals.json");
    if (res.ok) {
      const data = await res.json();
      if (data && data.nature) {
        window.JOURNALS_DATA = data;
        currentJournalData = data[currentJournalKey] || data.nature;
        return;
      }
    }
  } catch (e) {
    console.log("Using embedded fallback data (direct file or network offline).");
  }
  window.JOURNALS_DATA = FALLBACK_JOURNAL;
  currentJournalData = FALLBACK_JOURNAL.nature;
}

function renderJournalView() {
  const data = currentJournalData;

  // Header & Meta
  document.getElementById("journal-name").textContent = data.metadata.journal_name;
  document.getElementById("publisher-name").textContent = data.metadata.publisher;
  document.getElementById("issn-val").textContent = data.metadata.issn || "N/A";
  document.getElementById("verified-val").textContent = data.metadata.last_verified;
  document.getElementById("guidelines-link").href = data.metadata.guidelines_url;

  // Metrics
  document.getElementById("single-width-val").textContent =
    data.figure_geometry.column_widths.single_column.width + " mm";
  document.getElementById("max-height-val").textContent =
    data.figure_geometry.max_height + " mm";
  document.getElementById("font-family-val").textContent =
    data.figure_typography.family_preferences.primary;
  document.getElementById("min-font-val").textContent =
    data.figure_typography.font_sizes.min_allowed_size + " pt";
  document.getElementById("lineart-dpi-val").textContent =
    data.export_requirements.resolution_dpi.line_art + " DPI";

  // Geometry Visualizer
  updateVisualizer();

  // Typography Preview
  renderTypographyPreview();

  // Color Swatches
  renderColorSwatches();

  // AI Policy Box
  renderAiPolicy();

  // Code Snippet
  renderCodeSnippet();
}

function updateVisualizer() {
  const geom = currentJournalData.figure_geometry;
  const col = geom.column_widths[currentColumnMode];
  const box = document.getElementById("figure-box-render");
  const desc = document.getElementById("visualizer-desc");

  // Visual width scaling relative to page width (180mm full width = 100%)
  const maxWidth = geom.column_widths.double_column.width;
  const percent = Math.min(100, Math.round((col.width / maxWidth) * 100));

  box.style.width = `${percent}%`;
  const inches = (col.width / 25.4).toFixed(2);
  box.innerHTML = `<strong>${col.width} mm</strong><span style="font-size:0.65rem; opacity:0.85;">(${inches} in)</span>`;
  desc.textContent = `${col.description} — Page proportion: ${percent}% of full text spread.`;
}

function renderTypographyPreview() {
  const typo = currentJournalData.figure_typography.font_sizes;
  const stage = document.getElementById("typo-stage");
  stage.innerHTML = `
    <div class="typo-row">
      <span class="typo-label">Panel Label (${typo.panel_label.size} pt ${typo.panel_label.weight})</span>
      <span class="typo-preview" style="font-size: ${typo.panel_label.size * 2}px; font-weight: ${typo.panel_label.weight === 'bold' ? '700' : '400'};">a</span>
    </div>
    <div class="typo-row">
      <span class="typo-label">Axis Title (${typo.axis_title.size} pt)</span>
      <span class="typo-preview" style="font-size: ${typo.axis_title.size * 2}px;">Concentration (µmol · L⁻¹)</span>
    </div>
    <div class="typo-row">
      <span class="typo-label">Tick Labels (${typo.tick_label.size} pt)</span>
      <span class="typo-preview" style="font-size: ${typo.tick_label.size * 2}px;">0.0 &nbsp; 0.5 &nbsp; 1.0 &nbsp; 1.5 &nbsp; 2.0</span>
    </div>
    <div class="typo-row">
      <span class="typo-label">Legend (${typo.legend_title.size} pt / ${typo.legend_text.size} pt)</span>
      <span class="typo-preview" style="font-size: ${typo.legend_text.size * 2}px;"><strong style="font-size:${typo.legend_title.size * 2}px;">Treatment:</strong> Control vs. Inhibitor</span>
    </div>
    <div class="typo-row">
      <span class="typo-label">Annotation (${typo.annotation.size} pt)</span>
      <span class="typo-preview" style="font-size: ${typo.annotation.size * 2}px; color: #475569;">* p < 0.01, two-tailed unpaired t-test</span>
    </div>
    <div class="typo-row" style="background: #fff1f2; padding: 6px; border-radius: 4px; border: 1px solid #fecdd3;">
      <span class="typo-label" style="color: #e11d48; font-weight: 700;">Rejection Floor</span>
      <span class="typo-preview" style="font-size: 11px; color: #9f1239;">Text < ${typo.min_allowed_size} pt triggers automated production rejection.</span>
    </div>
  `;
}

function renderColorSwatches() {
  const container = document.getElementById("swatch-container");
  const swatches = PALETTES["Okabe-Ito"];
  container.innerHTML = "";

  swatches.forEach((c) => {
    const el = document.createElement("div");
    el.className = "swatch";
    const simHex = simulateCVD(c.hex, currentCvdMode);
    el.style.backgroundColor = simHex;
    el.title = `${c.name} (${c.hex})`;
    el.textContent = c.hex.slice(1);
    container.appendChild(el);
  });
}

// Simple color blindness simulation transform
function simulateCVD(hex, mode) {
  if (mode === "normal") return hex;
  const rgb = hexToRgb(hex);
  let r = rgb.r, g = rgb.g, b = rgb.b;

  if (mode === "deuteranopia") {
    // Green-weak
    r = 0.625 * rgb.r + 0.375 * rgb.g;
    g = 0.700 * rgb.r + 0.300 * rgb.g;
    b = 0.000 * rgb.r + 0.300 * rgb.g + 0.700 * rgb.b;
  } else if (mode === "protanopia") {
    // Red-weak
    r = 0.567 * rgb.r + 0.433 * rgb.g;
    g = 0.558 * rgb.r + 0.442 * rgb.g;
    b = 0.242 * rgb.g + 0.758 * rgb.b;
  } else if (mode === "tritanopia") {
    // Blue-weak
    r = 0.950 * rgb.r + 0.050 * rgb.g;
    g = 0.433 * rgb.g + 0.567 * rgb.b;
    b = 0.475 * rgb.g + 0.525 * rgb.b;
  }
  return rgbToHex(Math.min(255, Math.round(r)), Math.min(255, Math.round(g)), Math.min(255, Math.round(b)));
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function renderAiPolicy() {
  const ai = currentJournalData.ai_policy;
  document.getElementById("ai-statement-text").textContent = ai.official_statement_template.trim();
  document.getElementById("ai-placement-val").textContent = ai.preferred_disclosure_placement;
}

function renderCodeSnippet() {
  const codeBlock = document.getElementById("code-display");
  const data = currentJournalData;

  if (activeSnippetTab === "matplotlib") {
    const singleInches = (data.figure_geometry.column_widths.single_column.width / 25.4).toFixed(2);
    const doubleInches = (data.figure_geometry.column_widths.double_column.width / 25.4).toFixed(2);
    codeBlock.textContent = `# Matplotlib configuration for ${data.metadata.journal_name}
import matplotlib.pyplot as plt

# Dimensions (in inches)
# Single column: ${singleInches} in (${data.figure_geometry.column_widths.single_column.width} mm)
# Double column: ${doubleInches} in (${data.figure_geometry.column_widths.double_column.width} mm)

plt.rcParams.update({
    "font.family": "${data.figure_typography.family_preferences.fallback[0]}",
    "font.sans-serif": ["${data.figure_typography.family_preferences.primary}", "Arial"],
    "font.size": ${data.figure_typography.font_sizes.tick_label.size},
    "axes.labelsize": ${data.figure_typography.font_sizes.axis_title.size},
    "axes.titlesize": ${data.figure_typography.font_sizes.panel_label.size},
    "legend.fontsize": ${data.figure_typography.font_sizes.legend_text.size},
    "xtick.labelsize": ${data.figure_typography.font_sizes.tick_label.size},
    "ytick.labelsize": ${data.figure_typography.font_sizes.tick_label.size},
    "axes.linewidth": ${data.line_weights.axis_lines},
    "lines.linewidth": ${data.line_weights.data_lines_normal},
    "figure.dpi": 300,
    "savefig.dpi": ${data.export_requirements.resolution_dpi.line_art},
    "savefig.bbox": "tight",
})

fig, ax = plt.subplots(figsize=(${singleInches}, 2.5))
ax.plot([0, 1, 2], [10, 20, 15], color="#0072B2") # Okabe-Ito Blue
plt.savefig("figure1.pdf")`;
  } else if (activeSnippetTab === "r_ggplot2") {
    codeBlock.textContent = `# R ggplot2 theme for ${data.metadata.journal_name}
library(ggplot2)

theme_nature <- function() {
  theme_classic(base_size = ${data.figure_typography.font_sizes.tick_label.size}, base_family = "${data.figure_typography.family_preferences.fallback[0]}") +
    theme(
      axis.title = element_text(size = ${data.figure_typography.font_sizes.axis_title.size}),
      axis.text = element_text(size = ${data.figure_typography.font_sizes.tick_label.size}),
      legend.title = element_text(size = ${data.figure_typography.font_sizes.legend_title.size}, face = "bold"),
      legend.text = element_text(size = ${data.figure_typography.font_sizes.legend_text.size}),
      axis.line = element_line(linewidth = ${data.line_weights.axis_lines * 0.353}), # pt to mm
      plot.tag = element_text(size = ${data.figure_typography.font_sizes.panel_label.size}, face = "bold")
    )
}

# Save compliant PDF:
# ggsave("fig1.pdf", width = ${data.figure_geometry.column_widths.single_column.width}, height = 65, units = "mm", dpi = 1000)`;
  } else if (activeSnippetTab === "latex") {
    codeBlock.textContent = `% LaTeX Figure snippet for ${data.metadata.journal_name}
\\usepackage{graphicx}
\\usepackage{lineno}
\\linenumbers % Required by Nature for review

\\begin{figure}[htbp]
  \\centering
  % Sized exactly to single column width (89mm)
  \\includegraphics[width=89mm]{figures/figure1.pdf}
  \\caption{\\textbf{a}, Main experimental result. \\textbf{b}, Comparative assay.}
  \\label{fig:main_result}
\\end{figure}`;
  } else if (activeSnippetTab === "yaml") {
    codeBlock.textContent = `# Full canonical YAML specification available in repository:
# templates/nature/nature.yaml
# Run \`python scripts/build_dist.py\` to compile.`;
  }
}

function setupEventListeners() {
  // Column buttons
  document.querySelectorAll(".col-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".col-btn").forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      currentColumnMode = e.target.dataset.col;
      updateVisualizer();
    });
  });

  // CVD buttons
  document.querySelectorAll(".cvd-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".cvd-btn").forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      currentCvdMode = e.target.dataset.cvd;
      renderColorSwatches();
    });
  });

  // Code snippet tabs
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      activeSnippetTab = e.target.dataset.tab;
      renderCodeSnippet();
    });
  });

  // Copy buttons
  document.getElementById("copy-statement-btn").addEventListener("click", () => {
    const text = document.getElementById("ai-statement-text").textContent;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById("copy-statement-btn");
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = "Copy Statement"), 1800);
    });
  });

  document.getElementById("copy-code-btn").addEventListener("click", () => {
    const text = document.getElementById("code-display").textContent;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById("copy-code-btn");
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = "Copy Code"), 1800);
    });
  });
}

/**
 * Journal Compliance Templates - Interactive Explorer
 * Supported Palettes: Oxide Moss, Okabe-Ito, Viridis, Tol Bright
 */

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
      recommended_palettes: ["Oxide-Moss", "Okabe-Ito", "Viridis", "Tol-Bright"],
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

// Curated Accessible Scientific Palettes
const PALETTES = {
  "Oxide Moss": [
    { name: "Oxide Primary", hex: "#C65D2E" },
    { name: "Oxide Dark", hex: "#9E4521" },
    { name: "Oxide Light", hex: "#DD8A62" },
    { name: "Moss Primary", hex: "#687A45" },
    { name: "Moss Dark", hex: "#4D5C33" },
    { name: "Moss Light", hex: "#8D9B6C" },
    { name: "Charcoal Primary", hex: "#292724" },
    { name: "Charcoal Soft", hex: "#45413D" },
    { name: "Charcoal Muted", hex: "#6B6660" },
    { name: "Highlight Warm", hex: "#F3DED4" },
    { name: "Highlight Cool", hex: "#E2E7D8" }
  ],
  "Okabe-Ito": [
    { name: "Black", hex: "#000000" },
    { name: "Orange", hex: "#E69F00" },
    { name: "Sky Blue", hex: "#56B4E9" },
    { name: "Bluish Green", hex: "#009E73" },
    { name: "Yellow", hex: "#F0E442" },
    { name: "Blue", hex: "#0072B2" },
    { name: "Vermilion", hex: "#D55E00" },
    { name: "Reddish Purple", hex: "#CC79A7" }
  ],
  "Viridis": [
    { name: "Deep Purple", hex: "#440154" },
    { name: "Navy Blue", hex: "#3B528B" },
    { name: "Viridis Teal", hex: "#21918C" },
    { name: "Spring Green", hex: "#5EC962" },
    { name: "Lemon Yellow", hex: "#FDE725" }
  ],
  "Tol Bright": [
    { name: "Tol Blue", hex: "#4477AA" },
    { name: "Tol Cyan", hex: "#66CCEE" },
    { name: "Tol Green", hex: "#228833" },
    { name: "Tol Yellow", hex: "#CCBB44" },
    { name: "Tol Red", hex: "#EE6677" },
    { name: "Tol Purple", hex: "#AA3377" },
    { name: "Tol Grey", hex: "#BBBBBB" }
  ]
};

// Application State
let currentJournalKey = "nature";
let currentJournalData = FALLBACK_JOURNAL.nature;
let currentColumnMode = "single_column";
let activeSnippetTab = "matplotlib";
let activePalette = "Oxide Moss";
let activeColorFormat = "hex"; // 'hex', 'rgb255', 'rgb_norm', 'hsv', 'cmyk'
let currentCvdMode = "normal";

// Initialize App
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  await loadData();
  renderJournalView();
  setupEventListeners();
});

function initTheme() {
  const savedTheme = localStorage.getItem("jct-theme") || "theme-oxide-moss";
  document.body.className = savedTheme;
  const select = document.getElementById("theme-selector");
  if (select) select.value = savedTheme;
}

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
    console.log("Using embedded fallback data.");
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

  // Swatch Grid
  renderSwatches();

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
    <div class="typo-row" style="background: #FFF1F2; padding: 6px; border-radius: 4px; border: 1px solid #FECDD3;">
      <span class="typo-label" style="color: #E11D48; font-weight: 700;">Rejection Floor</span>
      <span class="typo-preview" style="font-size: 11px; color: #9F1239;">Text < ${typo.min_allowed_size} pt triggers automated production rejection.</span>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// Color Conversion Utilities
// ---------------------------------------------------------------------------

function hexToRgb(hex) {
  const cleanHex = hex.replace("#", "");
  const bigint = parseInt(cleanHex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function rgbToHsv(r, g, b) {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rNorm) h = ((gNorm - bNorm) / delta) % 6;
    else if (max === gNorm) h = (bNorm - rNorm) / delta + 2;
    else h = (rNorm - gNorm) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : Math.round((delta / max) * 100);
  const v = Math.round(max * 100);
  return { h, s, v };
}

function rgbToCmyk(r, g, b) {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const k = 1 - Math.max(rNorm, gNorm, bNorm);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };

  const c = Math.round(((1 - rNorm - k) / (1 - k)) * 100);
  const m = Math.round(((1 - gNorm - k) / (1 - k)) * 100);
  const y = Math.round(((1 - bNorm - k) / (1 - k)) * 100);
  return { c, m, y, k: Math.round(k * 100) };
}

function formatColor(hex, format) {
  const { r, g, b } = hexToRgb(hex);

  switch (format) {
    case "hex":
      return hex.toUpperCase();
    case "rgb255":
      return `rgb(${r}, ${g}, ${b})`;
    case "rgb_norm":
      return `(${(r / 255).toFixed(3)}, ${(g / 255).toFixed(3)}, ${(b / 255).toFixed(3)})`;
    case "hsv": {
      const hsv = rgbToHsv(r, g, b);
      return `hsv(${hsv.h}°, ${hsv.s}%, ${hsv.v}%)`;
    }
    case "cmyk": {
      const cmyk = rgbToCmyk(r, g, b);
      return `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
    }
    default:
      return hex;
  }
}

// CVD simulation
function simulateCVD(hex, mode) {
  if (mode === "normal") return hex;
  const { r, g, b } = hexToRgb(hex);
  let simR = r, simG = g, simB = b;

  if (mode === "deuteranopia") {
    simR = 0.625 * r + 0.375 * g;
    simG = 0.700 * r + 0.300 * g;
    simB = 0.000 * r + 0.300 * g + 0.700 * b;
  } else if (mode === "protanopia") {
    simR = 0.567 * r + 0.433 * g;
    simG = 0.558 * r + 0.442 * g;
    simB = 0.242 * r + 0.758 * g;
  } else if (mode === "tritanopia") {
    simR = 0.950 * r + 0.050 * g;
    simG = 0.433 * r + 0.567 * b;
    simB = 0.475 * r + 0.525 * b;
  }
  return rgbToHex(
    Math.min(255, Math.max(0, Math.round(simR))),
    Math.min(255, Math.max(0, Math.round(simG))),
    Math.min(255, Math.max(0, Math.round(simB)))
  );
}

// ---------------------------------------------------------------------------
// Swatch Grid Rendering
// ---------------------------------------------------------------------------

function renderSwatches() {
  const container = document.getElementById("swatch-grid");
  const swatches = PALETTES[activePalette] || PALETTES["Oxide Moss"];
  container.innerHTML = "";

  swatches.forEach((c) => {
    const card = document.createElement("div");
    card.className = "swatch-card";

    const simColor = simulateCVD(c.hex, currentCvdMode);
    const formattedVal = formatColor(c.hex, activeColorFormat);

    card.innerHTML = `
      <div class="swatch-color-box" style="background-color: ${simColor};">
        ${currentCvdMode !== 'normal' ? '<span>CVD</span>' : ''}
      </div>
      <div class="swatch-meta">
        <span class="swatch-name">${c.name}</span>
        <span class="swatch-code">${formattedVal}</span>
      </div>
      <span class="swatch-copy-hint">Click to copy</span>
    `;

    card.addEventListener("click", () => {
      copyToClipboard(formattedVal, `Copied ${c.name}: ${formattedVal}`);
    });

    container.appendChild(card);
  });
}

function showToast(message) {
  const toast = document.getElementById("copy-toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function copyToClipboard(text, successMsg = "Copied to clipboard!") {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg);
  });
}

// ---------------------------------------------------------------------------
// Bulk Palette Export Handlers
// ---------------------------------------------------------------------------

function copyPaletteAsHexArray() {
  const swatches = PALETTES[activePalette];
  const list = swatches.map((s) => `"${s.hex}"`).join(", ");
  const output = `[${list}]`;
  copyToClipboard(output, `Copied ${activePalette} as HEX array!`);
}

function copyPaletteForPython() {
  const swatches = PALETTES[activePalette];
  const tuples = swatches.map((s) => {
    const { r, g, b } = hexToRgb(s.hex);
    return `(${(r / 255).toFixed(3)}, ${(g / 255).toFixed(3)}, ${(b / 255).toFixed(3)})`;
  });
  const output = `# ${activePalette} Palette for Matplotlib\ncolors = [\n    ${tuples.join(",\n    ")}\n]`;
  copyToClipboard(output, `Copied ${activePalette} for Python / Matplotlib!`);
}

function copyPaletteForR() {
  const swatches = PALETTES[activePalette];
  const list = swatches.map((s) => `"${s.hex}"`).join(", ");
  const output = `# ${activePalette} Palette for R\npalette_${activePalette.toLowerCase().replace(/\s+/g, "_")} <- c(${list})`;
  copyToClipboard(output, `Copied ${activePalette} for R (ggplot2)!`);
}

// ---------------------------------------------------------------------------
// AI Policy & Code Snippets
// ---------------------------------------------------------------------------

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
# Using Oxide Moss Palette
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

# Example plot with Oxide Moss Palette
fig, ax = plt.subplots(figsize=(${singleInches}, 2.5))
ax.plot([0, 1, 2], [10, 20, 15], color="#C65D2E", label="Oxide Primary") # Oxide Primary
ax.plot([0, 1, 2], [5, 12, 18], color="#687A45", label="Moss Primary")   # Moss Primary
ax.legend(frameon=False)
plt.savefig("figure1.pdf")`;
  } else if (activeSnippetTab === "r_ggplot2") {
    codeBlock.textContent = `# R ggplot2 theme for ${data.metadata.journal_name} with Oxide Moss palette
library(ggplot2)

palette_oxide_moss <- c("#C65D2E", "#687A45", "#292724", "#9E4521", "#4D5C33")

theme_nature <- function() {
  theme_classic(base_size = ${data.figure_typography.font_sizes.tick_label.size}, base_family = "${data.figure_typography.family_preferences.fallback[0]}") +
    theme(
      axis.title = element_text(size = ${data.figure_typography.font_sizes.axis_title.size}),
      axis.text = element_text(size = ${data.figure_typography.font_sizes.tick_label.size}),
      legend.title = element_text(size = ${data.figure_typography.font_sizes.legend_title.size}, face = "bold"),
      legend.text = element_text(size = ${data.figure_typography.font_sizes.legend_text.size}),
      axis.line = element_line(linewidth = ${data.line_weights.axis_lines * 0.353}),
      plot.tag = element_text(size = ${data.figure_typography.font_sizes.panel_label.size}, face = "bold")
    )
}

# ggsave("fig1.pdf", width = ${data.figure_geometry.column_widths.single_column.width}, height = 65, units = "mm", dpi = 1000)`;
  } else if (activeSnippetTab === "latex") {
    codeBlock.textContent = `% LaTeX Figure snippet for ${data.metadata.journal_name}
\\usepackage{graphicx}
\\usepackage{lineno}
\\linenumbers % Required by Nature during review

\\begin{figure}[htbp]
  \\centering
  % Sized exactly to single column width (89mm)
  \\includegraphics[width=89mm]{figures/figure1.pdf}
  \\caption{\\textbf{a}, Experimental kinetics using Oxide Moss styling. \\textbf{b}, Quantitative response.}
  \\label{fig:main_result}
\\end{figure}`;
  } else if (activeSnippetTab === "yaml") {
    codeBlock.textContent = `# Full canonical YAML specification available in repository:
# templates/nature/nature.yaml
# Run \`python scripts/build_dist.py\` to compile into dist/json/.`;
  }
}

// ---------------------------------------------------------------------------
// Event Listeners Setup
// ---------------------------------------------------------------------------

function setupEventListeners() {
  // Theme selector dropdown
  const themeSelector = document.getElementById("theme-selector");
  if (themeSelector) {
    themeSelector.addEventListener("change", (e) => {
      const selected = e.target.value;
      document.body.className = selected;
      localStorage.setItem("jct-theme", selected);
      showToast(`Switched theme to ${e.target.options[e.target.selectedIndex].text}`);
    });
  }

  // Column mode buttons
  document.querySelectorAll(".col-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".col-btn").forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      currentColumnMode = e.target.dataset.col;
      updateVisualizer();
    });
  });

  // Palette tabs
  document.querySelectorAll(".palette-tab-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".palette-tab-btn").forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      activePalette = e.target.dataset.palette;
      renderSwatches();
    });
  });

  // Format buttons
  document.querySelectorAll(".fmt-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".fmt-btn").forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      activeColorFormat = e.target.dataset.fmt;
      renderSwatches();
    });
  });

  // CVD mode buttons
  document.querySelectorAll(".cvd-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".cvd-btn").forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      currentCvdMode = e.target.dataset.cvd;
      renderSwatches();
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

  // Bulk copy buttons
  document.getElementById("copy-palette-hex").addEventListener("click", copyPaletteAsHexArray);
  document.getElementById("copy-palette-python").addEventListener("click", copyPaletteForPython);
  document.getElementById("copy-palette-r").addEventListener("click", copyPaletteForR);

  // Statement & code copy buttons
  document.getElementById("copy-statement-btn").addEventListener("click", () => {
    const text = document.getElementById("ai-statement-text").textContent;
    copyToClipboard(text, "Copied AI Disclosure Statement!");
  });

  document.getElementById("copy-code-btn").addEventListener("click", () => {
    const text = document.getElementById("code-display").textContent;
    copyToClipboard(text, "Copied code snippet!");
  });
}

"""
R ggplot2 theme and scale generator for scientific journal compliance templates.
Produces standalone R scripts defining themes, palettes, and compliant ggsave helpers.
"""

from pathlib import Path
from typing import Dict, Any, Optional

from journal_compliance_templates.exporters.figures.mplstyle_generator import (
    ACCESSIBLE_PALETTES,
    get_palette_colors,
)

PALETTE_COLOR_NAMES: Dict[str, Dict[str, str]] = {
    "Okabe-Ito": {
        "blue": "#0072B2",
        "vermilion": "#D55E00",
        "bluish_green": "#009E73",
        "yellow": "#F0E442",
        "sky_blue": "#56B4E9",
        "orange": "#E69F00",
        "reddish_purple": "#CC79A7",
        "black": "#000000",
    },
    "Viridis": {
        "deep_purple": "#440154",
        "navy_blue": "#3B528B",
        "viridis_teal": "#21918C",
        "spring_green": "#5EC962",
        "lemon_yellow": "#FDE725",
    },
    "Tol-Bright": {
        "tol_blue": "#4477AA",
        "tol_cyan": "#66CCEE",
        "tol_green": "#228833",
        "tol_yellow": "#CCBB44",
        "tol_red": "#EE6677",
        "tol_purple": "#AA3377",
        "tol_grey": "#BBBBBB",
    }
}


def _get_slug(name: str) -> str:
    """Generate a clean identifier slug."""
    return name.lower().replace(" ", "_").replace("-", "_").replace("(", "").replace(")", "").replace("/", "_")


def generate_r_theme_content(journal_data: Dict[str, Any], palette_name: str = "Okabe-Ito") -> str:
    """
    Generate the R script content defining theme_<journal>, scales, and ggsave helpers.
    """
    meta = journal_data["metadata"]
    geom = journal_data["figure_geometry"]
    typo = journal_data["figure_typography"]
    sizes = typo["font_sizes"]
    weights = journal_data["line_weights"]
    export = journal_data["export_requirements"]
    
    journal_name = meta["journal_name"]
    slug = _get_slug(journal_name.split()[0]) # e.g. 'nature', 'ieee', 'journal', 'science', 'cell'
    if "ieee" in meta["journal_name"].lower():
        slug = "ieee"
    elif "chemical" in meta["journal_name"].lower() or "jacs" in meta["journal_name"].lower():
        slug = "jacs"
    elif "science" in meta["journal_name"].lower():
        slug = "science"
    elif "cell" in meta["journal_name"].lower():
        slug = "cell"
    elif "nature" in meta["journal_name"].lower():
        slug = "nature"

    primary_font = typo["family_preferences"]["primary"]
    base_family = primary_font if primary_font != "Helvetica" else "Arial"

    # Line weights converted from pt to mm (1 pt = 0.3528 mm)
    axis_line_mm = round(weights["axis_lines"] * 0.3528, 4)
    tick_line_mm = round(weights["tick_marks"] * 0.3528, 4)
    data_line_mm = round(weights["data_lines_normal"] * 0.3528, 4)

    # Column dimensions
    single_mm = geom["column_widths"]["single_column"]["width"]
    double_mm = geom["column_widths"]["double_column"]["width"]
    has_15 = "one_and_half_column" in geom["column_widths"]
    col_15_mm = geom["column_widths"]["one_and_half_column"]["width"] if has_15 else single_mm
    max_height_mm = geom["max_height"]

    # Palettes
    named_colors = PALETTE_COLOR_NAMES.get(palette_name, PALETTE_COLOR_NAMES["Okabe-Ito"])
    palette_lines = []
    for cname, chex in named_colors.items():
        palette_lines.append(f'  "{cname}" = "{chex}"')
    palette_vector_str = ",\n".join(palette_lines)

    content = f"""# ==============================================================================
# R ggplot2 Theme & Scale Bridge: {journal_name}
# Publisher: {meta['publisher']}
# Guidelines: {meta['guidelines_url']}
# Last Verified: {meta['last_verified']}
# ==============================================================================
# Sizing Reference:
#   Single column width: {single_mm:.1f} mm
#   Double column width: {double_mm:.1f} mm
#   Max figure height:   {max_height_mm:.1f} mm
#   Line art DPI:        {export['resolution_dpi']['line_art']}
# ==============================================================================

if (!requireNamespace("ggplot2", quietly = TRUE)) {{
  stop("The 'ggplot2' package is required. Install it using install.packages('ggplot2').")
}}

#' {journal_name} Compliant Color-Blind Safe Palette ({palette_name})
#' @export
palette_{slug} <- c(
{palette_vector_str}
)

#' {journal_name} Publication Theme for ggplot2
#'
#' @param base_size Base font size in points (default: {sizes['tick_label']['size']} pt)
#' @param base_family Base font family (default: "{base_family}")
#' @return A ggplot2 theme object
#' @export
theme_{slug} <- function(base_size = {sizes['tick_label']['size']}, base_family = "{base_family}") {{
  ggplot2::theme_classic(base_size = base_size, base_family = base_family) +
    ggplot2::theme(
      # Typography Hierarchy
      plot.title = ggplot2::element_text(
        size = {sizes['panel_label']['size']},
        face = "{sizes['panel_label']['weight']}",
        margin = ggplot2::margin(b = 4)
      ),
      plot.tag = ggplot2::element_text(
        size = {sizes['panel_label']['size']},
        face = "bold",
        hjust = 0,
        vjust = 1
      ),
      axis.title = ggplot2::element_text(
        size = {sizes['axis_title']['size']},
        face = "{sizes['axis_title']['weight']}"
      ),
      axis.title.x = ggplot2::element_text(margin = ggplot2::margin(t = 3)),
      axis.title.y = ggplot2::element_text(margin = ggplot2::margin(r = 3)),
      axis.text = ggplot2::element_text(
        size = {sizes['tick_label']['size']},
        color = "#000000"
      ),
      legend.title = ggplot2::element_text(
        size = {sizes['legend_title']['size']},
        face = "{sizes['legend_title']['weight']}"
      ),
      legend.text = ggplot2::element_text(
        size = {sizes['legend_text']['size']}
      ),
      legend.background = ggplot2::element_blank(),
      legend.key = ggplot2::element_blank(),
      legend.spacing.x = grid::unit(2, "pt"),
      legend.spacing.y = grid::unit(2, "pt"),
      
      # Axis Lines & Ticks (Thickness in mm: 1 pt = 0.3528 mm)
      axis.line = ggplot2::element_line(linewidth = {axis_line_mm}, color = "#000000"),
      axis.ticks = ggplot2::element_line(linewidth = {tick_line_mm}, color = "#000000"),
      axis.ticks.length = grid::unit(2.5, "pt"),
      
      # Plot Margins & Panel
      panel.background = ggplot2::element_blank(),
      plot.background = ggplot2::element_blank(),
      plot.margin = ggplot2::margin(3, 3, 3, 3, "pt")
    )
}}

#' Discrete Color Scale for {journal_name}
#' @param ... Arguments passed to ggplot2::scale_color_manual
#' @export
scale_color_{slug} <- function(...) {{
  ggplot2::scale_color_manual(values = palette_{slug}, ...)
}}

#' @rdname scale_color_{slug}
#' @export
scale_colour_{slug} <- scale_color_{slug}

#' Discrete Fill Scale for {journal_name}
#' @param ... Arguments passed to ggplot2::scale_fill_manual
#' @export
scale_fill_{slug} <- function(...) {{
  ggplot2::scale_fill_manual(values = palette_{slug}, ...)
}}

#' Save Plot to Journal-Compliant Physical Dimensions
#'
#' @param filename Destination file path (PDF or TIFF recommended)
#' @param plot Plot object to save (defaults to last_plot())
#' @param column Column layout: 'single', 'one_and_half', or 'double'
#' @param height_mm Target height in millimeters (defaults to 4:3 aspect ratio)
#' @param dpi Export resolution (defaults to publisher line art standard: {export['resolution_dpi']['line_art']} DPI)
#' @param ... Additional arguments forwarded to ggplot2::ggsave
#' @export
ggsave_{slug} <- function(filename,
                         plot = ggplot2::last_plot(),
                         column = c("single", "one_and_half", "double"),
                         height_mm = NULL,
                         dpi = {export['resolution_dpi']['line_art']},
                         ...) {{
  column <- match.arg(column)
  width_mm <- switch(
    column,
    single = {single_mm},
    one_and_half = {col_15_mm},
    double = {double_mm}
  )
  
  if (is.null(height_mm)) {{
    height_mm <- min({max_height_mm}, width_mm * 0.75)
  }} else {{
    height_mm <- min({max_height_mm}, height_mm)
  }}
  
  ggplot2::ggsave(
    filename = filename,
    plot = plot,
    width = width_mm,
    height = height_mm,
    units = "mm",
    dpi = dpi,
    ...
  )
}}
"""
    return content


def save_r_theme(
    journal_data: Dict[str, Any],
    output_path: Path,
    palette_name: str = "Okabe-Ito"
) -> Path:
    """Generate and write R theme script to disk."""
    content = generate_r_theme_content(journal_data, palette_name)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)
    return output_path

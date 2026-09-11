# ==============================================================================
# R ggplot2 Theme & Scale Bridge: Journal of the American Chemical Society
# Publisher: American Chemical Society (ACS)
# Guidelines: https://publish.acs.org/publish/author_guidelines?coden=jacsat
# Last Verified: 2026-09-11
# ==============================================================================
# Sizing Reference:
#   Single column width: 82.5 mm
#   Double column width: 177.8 mm
#   Max figure height:   235.0 mm
#   Line art DPI:        1200
# ==============================================================================

if (!requireNamespace("ggplot2", quietly = TRUE)) {
  stop("The 'ggplot2' package is required. Install it using install.packages('ggplot2').")
}

#' Journal of the American Chemical Society Compliant Color-Blind Safe Palette (Okabe-Ito)
#' @export
palette_jacs <- c(
  "blue" = "#0072B2",
  "vermilion" = "#D55E00",
  "bluish_green" = "#009E73",
  "yellow" = "#F0E442",
  "sky_blue" = "#56B4E9",
  "orange" = "#E69F00",
  "reddish_purple" = "#CC79A7",
  "black" = "#000000"
)

#' Journal of the American Chemical Society Publication Theme for ggplot2
#'
#' @param base_size Base font size in points (default: 7.0 pt)
#' @param base_family Base font family (default: "Arial")
#' @return A ggplot2 theme object
#' @export
theme_jacs <- function(base_size = 7.0, base_family = "Arial") {
  ggplot2::theme_classic(base_size = base_size, base_family = base_family) +
    ggplot2::theme(
      # Typography Hierarchy
      plot.title = ggplot2::element_text(
        size = 9.0,
        face = "bold",
        margin = ggplot2::margin(b = 4)
      ),
      plot.tag = ggplot2::element_text(
        size = 9.0,
        face = "bold",
        hjust = 0,
        vjust = 1
      ),
      axis.title = ggplot2::element_text(
        size = 8.0,
        face = "regular"
      ),
      axis.title.x = ggplot2::element_text(margin = ggplot2::margin(t = 3)),
      axis.title.y = ggplot2::element_text(margin = ggplot2::margin(r = 3)),
      axis.text = ggplot2::element_text(
        size = 7.0,
        color = "#000000"
      ),
      legend.title = ggplot2::element_text(
        size = 7.5,
        face = "bold"
      ),
      legend.text = ggplot2::element_text(
        size = 7.0
      ),
      legend.background = ggplot2::element_blank(),
      legend.key = ggplot2::element_blank(),
      legend.spacing.x = grid::unit(2, "pt"),
      legend.spacing.y = grid::unit(2, "pt"),
      
      # Axis Lines & Ticks (Thickness in mm: 1 pt = 0.3528 mm)
      axis.line = ggplot2::element_line(linewidth = 0.1764, color = "#000000"),
      axis.ticks = ggplot2::element_line(linewidth = 0.1764, color = "#000000"),
      axis.ticks.length = grid::unit(2.5, "pt"),
      
      # Plot Margins & Panel
      panel.background = ggplot2::element_blank(),
      plot.background = ggplot2::element_blank(),
      plot.margin = ggplot2::margin(3, 3, 3, 3, "pt")
    )
}

#' Discrete Color Scale for Journal of the American Chemical Society
#' @param ... Arguments passed to ggplot2::scale_color_manual
#' @export
scale_color_jacs <- function(...) {
  ggplot2::scale_color_manual(values = palette_jacs, ...)
}

#' @rdname scale_color_jacs
#' @export
scale_colour_jacs <- scale_color_jacs

#' Discrete Fill Scale for Journal of the American Chemical Society
#' @param ... Arguments passed to ggplot2::scale_fill_manual
#' @export
scale_fill_jacs <- function(...) {
  ggplot2::scale_fill_manual(values = palette_jacs, ...)
}

#' Save Plot to Journal-Compliant Physical Dimensions
#'
#' @param filename Destination file path (PDF or TIFF recommended)
#' @param plot Plot object to save (defaults to last_plot())
#' @param column Column layout: 'single', 'one_and_half', or 'double'
#' @param height_mm Target height in millimeters (defaults to 4:3 aspect ratio)
#' @param dpi Export resolution (defaults to publisher line art standard: 1200 DPI)
#' @param ... Additional arguments forwarded to ggplot2::ggsave
#' @export
ggsave_jacs <- function(filename,
                         plot = ggplot2::last_plot(),
                         column = c("single", "one_and_half", "double"),
                         height_mm = NULL,
                         dpi = 1200,
                         ...) {
  column <- match.arg(column)
  width_mm <- switch(
    column,
    single = 82.5,
    one_and_half = 114.0,
    double = 177.8
  )
  
  if (is.null(height_mm)) {
    height_mm <- min(235.0, width_mm * 0.75)
  } else {
    height_mm <- min(235.0, height_mm)
  }
  
  ggplot2::ggsave(
    filename = filename,
    plot = plot,
    width = width_mm,
    height = height_mm,
    units = "mm",
    dpi = dpi,
    ...
  )
}

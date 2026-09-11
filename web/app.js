/**
 * Journal Compliance Templates - Interactive Explorer
 * Supported Palettes: Oxide Moss, Okabe-Ito, Viridis, Tol Bright
 */

const FALLBACK_JOURNAL = {
  "nature": {
    "schema_version": "1.0.0",
    "metadata": {
      "publisher": "Nature Portfolio (Springer Nature)",
      "journal_name": "Nature",
      "issn": "1476-4687",
      "guidelines_url": "https://www.nature.com/nature/for-authors/final-submission",
      "last_verified": "2026-09-11",
      "notes": "Official guidelines for primary research articles and brief communications. Specific attention must be paid to font embedding, 89 mm single-column width, lowercase bold panel letters ('a', 'b'), and minimum 5 pt font size.\n"
    },
    "figure_geometry": {
      "default_unit": "mm",
      "max_height": 225.0,
      "column_widths": {
        "single_column": {
          "width": 89.0,
          "description": "Standard single column width (89 mm / 3.5 in)"
        },
        "one_and_half_column": {
          "width": 120.0,
          "description": "Intermediate 1.5-column width (120 mm / 4.7 in)"
        },
        "double_column": {
          "width": 180.0,
          "description": "Full text-width page spread (180 mm / 7.1 in)"
        }
      },
      "panel_spacing": {
        "minimum_gutter": 3.0
      }
    },
    "figure_typography": {
      "family_preferences": {
        "primary": "Helvetica",
        "fallback": [
          "Arial"
        ],
        "serif_alternative": "Times New Roman",
        "symbol_font": "Symbol"
      },
      "font_sizes": {
        "unit": "pt",
        "panel_label": {
          "size": 8.0,
          "weight": "bold"
        },
        "axis_title": {
          "size": 7.0,
          "weight": "regular"
        },
        "tick_label": {
          "size": 6.0,
          "weight": "regular"
        },
        "legend_title": {
          "size": 6.5,
          "weight": "bold"
        },
        "legend_text": {
          "size": 6.0,
          "weight": "regular"
        },
        "annotation": {
          "size": 5.5,
          "weight": "regular"
        },
        "min_allowed_size": 5.0
      }
    },
    "line_weights": {
      "unit": "pt",
      "axis_lines": 0.5,
      "tick_marks": 0.5,
      "data_lines_normal": 1.0,
      "data_lines_thick": 1.5,
      "grid_lines": 0.25,
      "min_allowed_weight": 0.25
    },
    "panel_labeling": {
      "case": "lowercase",
      "weight": "bold",
      "punctuation": "",
      "position": "top_left_outside",
      "font_family": "Helvetica"
    },
    "color_specifications": {
      "accepted_modes": {
        "initial_submission": [
          "RGB"
        ],
        "final_production": [
          "RGB",
          "CMYK"
        ]
      },
      "color_blind_safe_required": true,
      "recommended_palettes": [
        "Okabe-Ito",
        "Viridis",
        "ColorBrewer-Set2"
      ],
      "black_white_contrast_ratio": 4.5
    },
    "export_requirements": {
      "preferred_vector_formats": [
        {
          "format": "PDF",
          "notes": "Vector PDF with all fonts embedded or outlined."
        },
        {
          "format": "EPS",
          "notes": "Encapsulated PostScript with fonts converted to outlines/curves."
        }
      ],
      "accepted_raster_formats": [
        {
          "format": "TIFF",
          "compression": "LZW"
        }
      ],
      "resolution_dpi": {
        "line_art": 1000,
        "combination_art": 600,
        "photographic_halftone": 300
      },
      "max_file_size_mb": 50
    },
    "manuscript_layout": {
      "page": {
        "size": "A4",
        "margins_mm": {
          "top": 25.4,
          "bottom": 25.4,
          "left": 25.4,
          "right": 25.4
        }
      },
      "spacing": {
        "line_spacing": "double",
        "line_numbering": "continuous"
      },
      "body_typography": {
        "font_family": "Times New Roman",
        "font_size_pt": 12.0
      },
      "heading_hierarchy": {
        "title": {
          "size_pt": 18.0,
          "weight": "bold",
          "numbered": false
        },
        "h1": {
          "size_pt": 14.0,
          "weight": "bold",
          "numbered": false
        },
        "h2": {
          "size_pt": 12.0,
          "weight": "bold",
          "numbered": false
        },
        "h3": {
          "size_pt": 12.0,
          "weight": "italic",
          "numbered": false
        }
      },
      "limits": {
        "abstract_max_words": 150,
        "main_text_max_words": 5000,
        "max_display_items": 6
      },
      "required_sections": [
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
    "ai_policy": {
      "authorship_eligible": false,
      "generative_imagery_allowed": false,
      "generative_imagery_exceptions": "Permissible only when the manuscript specifically investigates generative AI models as the primary subject of scientific inquiry.\n",
      "text_and_code_disclosure_required": true,
      "preferred_disclosure_placement": "Methods",
      "policy_url": "https://www.nature.com/nature-portfolio/editorial-policies/ai",
      "official_statement_template": "During the preparation of this manuscript, the author(s) used [TOOL NAME, VERSION, e.g., Claude 3.5 Sonnet / ChatGPT] in order to [SPECIFY PURPOSE: e.g., refine prose for readability / assist in drafting Python data processing routines]. The author(s) reviewed and edited the output as needed and take full responsibility for the integrity and accuracy of all published material.\n"
    }
  },
  "ieee": {
    "schema_version": "1.0.0",
    "metadata": {
      "publisher": "IEEE (Institute of Electrical and Electronics Engineers)",
      "journal_name": "IEEE Transactions",
      "issn": "0162-8828",
      "guidelines_url": "https://journals.ieeeauthorcenter.ieee.org/create-your-ieee-journal-article/create-graphics-for-your-article/",
      "last_verified": "2026-09-11",
      "notes": "Official guidelines for IEEE Transactions, Journals, and Letters. Features standard 2-column layout with 3.5 in (88.9 mm) single column width, Times New Roman font hierarchy, strict 0.5 pt minimum line weight, and 6 pt font rejection floor.\n"
    },
    "figure_geometry": {
      "default_unit": "mm",
      "max_height": 241.3,
      "column_widths": {
        "single_column": {
          "width": 88.9,
          "description": "Standard single column width (3.5 in / 88.9 mm / 21 picas)"
        },
        "double_column": {
          "width": 181.9,
          "description": "Full-width double column spread (7.16 in / 181.9 mm / 43 picas)"
        }
      },
      "panel_spacing": {
        "minimum_gutter": 3.0
      }
    },
    "figure_typography": {
      "family_preferences": {
        "primary": "Times New Roman",
        "fallback": [
          "Helvetica",
          "Arial",
          "Nimbus Roman"
        ],
        "serif_alternative": "Times New Roman",
        "symbol_font": "Symbol"
      },
      "font_sizes": {
        "unit": "pt",
        "panel_label": {
          "size": 8.0,
          "weight": "bold"
        },
        "axis_title": {
          "size": 8.0,
          "weight": "regular"
        },
        "tick_label": {
          "size": 7.0,
          "weight": "regular"
        },
        "legend_title": {
          "size": 7.5,
          "weight": "bold"
        },
        "legend_text": {
          "size": 7.0,
          "weight": "regular"
        },
        "annotation": {
          "size": 6.5,
          "weight": "regular"
        },
        "min_allowed_size": 6.0
      }
    },
    "line_weights": {
      "unit": "pt",
      "axis_lines": 0.5,
      "tick_marks": 0.5,
      "data_lines_normal": 1.0,
      "data_lines_thick": 1.5,
      "grid_lines": 0.25,
      "min_allowed_weight": 0.5
    },
    "panel_labeling": {
      "case": "lowercase",
      "weight": "bold",
      "punctuation": "(a)",
      "position": "top_left",
      "font_family": "Times New Roman"
    },
    "color_specifications": {
      "accepted_modes": {
        "initial_submission": [
          "RGB"
        ],
        "final_production": [
          "RGB",
          "CMYK"
        ]
      },
      "color_blind_safe_required": true,
      "recommended_palettes": [
        "Okabe-Ito",
        "Tol-Bright",
        "Viridis"
      ],
      "black_white_contrast_ratio": 4.5
    },
    "export_requirements": {
      "preferred_vector_formats": [
        {
          "format": "EPS",
          "notes": "Encapsulated PostScript with fonts embedded or converted to curves."
        },
        {
          "format": "PDF",
          "notes": "Vector PDF with high-resolution subset fonts embedded."
        }
      ],
      "accepted_raster_formats": [
        {
          "format": "TIFF",
          "compression": "LZW"
        }
      ],
      "resolution_dpi": {
        "line_art": 1000,
        "combination_art": 600,
        "photographic_halftone": 300
      },
      "max_file_size_mb": 50
    },
    "manuscript_layout": {
      "page": {
        "size": "Letter",
        "margins_mm": {
          "top": 19.1,
          "bottom": 25.4,
          "left": 16.5,
          "right": 16.5
        }
      },
      "spacing": {
        "line_spacing": "single",
        "line_numbering": "none"
      },
      "body_typography": {
        "font_family": "Times New Roman",
        "font_size_pt": 10.0
      },
      "heading_hierarchy": {
        "title": {
          "size_pt": 24.0,
          "weight": "bold",
          "numbered": false
        },
        "h1": {
          "size_pt": 10.0,
          "weight": "bold",
          "numbered": true
        },
        "h2": {
          "size_pt": 10.0,
          "weight": "italic",
          "numbered": true
        },
        "h3": {
          "size_pt": 10.0,
          "weight": "italic",
          "numbered": true
        }
      },
      "limits": {
        "abstract_max_words": 250,
        "main_text_max_words": 9000,
        "max_display_items": 12
      },
      "required_sections": [
        "Title, Authors, Affiliations",
        "Abstract",
        "Index Terms (Keywords)",
        "Introduction",
        "Related Work / System Model",
        "Methodology / Proposed Formulation",
        "Experimental Evaluation / Results",
        "Conclusion",
        "Acknowledgment",
        "References",
        "Biographies with Author Photographs"
      ]
    },
    "ai_policy": {
      "authorship_eligible": false,
      "generative_imagery_allowed": false,
      "generative_imagery_exceptions": "Permissible only when generative AI models are the direct subject of scientific analysis.\n",
      "text_and_code_disclosure_required": true,
      "preferred_disclosure_placement": "Acknowledgment",
      "policy_url": "https://journals.ieeeauthorcenter.ieee.org/become-an-ieee-journal-author/publishing-ethics/guidelines-and-policies/ieee-principles-for-artificial-intelligence-ai-generated-text/",
      "official_statement_template": "The author(s) acknowledge the use of [TOOL NAME, VERSION, e.g., ChatGPT-4 / Claude 3.5] to assist in [SPECIFY PURPOSE: e.g., editing and improving English prose clarity / formatting references]. The author(s) have reviewed all content and take full responsibility for the accuracy, originality, and integrity of the entire manuscript.\n"
    }
  },
  "acs": {
    "schema_version": "1.0.0",
    "metadata": {
      "publisher": "American Chemical Society (ACS)",
      "journal_name": "Journal of the American Chemical Society",
      "issn": "0002-7863",
      "guidelines_url": "https://publish.acs.org/publish/author_guidelines?coden=jacsat",
      "last_verified": "2026-09-11",
      "notes": "Official guidelines for JACS articles and communications. Specifies 3.25 in (82.5 mm) single-column width, mandatory TOC/Abstract graphic (3.25 x 1.75 in), uppercase panel identifiers ('A', 'B'), and 1200 DPI line art.\n"
    },
    "figure_geometry": {
      "default_unit": "mm",
      "max_height": 235.0,
      "column_widths": {
        "single_column": {
          "width": 82.5,
          "description": "Standard single column width (3.25 in / 82.5 mm / 20 picas)"
        },
        "one_and_half_column": {
          "width": 114.0,
          "description": "Intermediate 1.5-column width (4.5 in / 114.0 mm / 27 picas)"
        },
        "double_column": {
          "width": 177.8,
          "description": "Full double column width (7.0 in / 177.8 mm / 42 picas)"
        }
      },
      "panel_spacing": {
        "minimum_gutter": 3.0
      }
    },
    "figure_typography": {
      "family_preferences": {
        "primary": "Arial",
        "fallback": [
          "Helvetica",
          "Times New Roman"
        ],
        "serif_alternative": "Times New Roman",
        "symbol_font": "Symbol"
      },
      "font_sizes": {
        "unit": "pt",
        "panel_label": {
          "size": 9.0,
          "weight": "bold"
        },
        "axis_title": {
          "size": 8.0,
          "weight": "regular"
        },
        "tick_label": {
          "size": 7.0,
          "weight": "regular"
        },
        "legend_title": {
          "size": 7.5,
          "weight": "bold"
        },
        "legend_text": {
          "size": 7.0,
          "weight": "regular"
        },
        "annotation": {
          "size": 6.5,
          "weight": "regular"
        },
        "min_allowed_size": 6.0
      }
    },
    "line_weights": {
      "unit": "pt",
      "axis_lines": 0.5,
      "tick_marks": 0.5,
      "data_lines_normal": 1.0,
      "data_lines_thick": 1.5,
      "grid_lines": 0.25,
      "min_allowed_weight": 0.5
    },
    "panel_labeling": {
      "case": "uppercase",
      "weight": "bold",
      "punctuation": "",
      "position": "top_left",
      "font_family": "Arial"
    },
    "color_specifications": {
      "accepted_modes": {
        "initial_submission": [
          "RGB"
        ],
        "final_production": [
          "RGB",
          "CMYK"
        ]
      },
      "color_blind_safe_required": true,
      "recommended_palettes": [
        "Okabe-Ito",
        "Viridis",
        "Tol-Bright"
      ],
      "black_white_contrast_ratio": 4.5
    },
    "export_requirements": {
      "preferred_vector_formats": [
        {
          "format": "PDF",
          "notes": "High-resolution vector PDF with subset fonts embedded."
        },
        {
          "format": "EPS",
          "notes": "Encapsulated PostScript with fonts converted to outlines/curves."
        }
      ],
      "accepted_raster_formats": [
        {
          "format": "TIFF",
          "compression": "LZW"
        }
      ],
      "resolution_dpi": {
        "line_art": 1200,
        "combination_art": 600,
        "photographic_halftone": 300
      },
      "max_file_size_mb": 50
    },
    "manuscript_layout": {
      "page": {
        "size": "Letter",
        "margins_mm": {
          "top": 25.4,
          "bottom": 25.4,
          "left": 25.4,
          "right": 25.4
        }
      },
      "spacing": {
        "line_spacing": "double",
        "line_numbering": "continuous"
      },
      "body_typography": {
        "font_family": "Times New Roman",
        "font_size_pt": 12.0
      },
      "heading_hierarchy": {
        "title": {
          "size_pt": 18.0,
          "weight": "bold",
          "numbered": false
        },
        "h1": {
          "size_pt": 12.0,
          "weight": "bold",
          "numbered": false
        },
        "h2": {
          "size_pt": 12.0,
          "weight": "italic",
          "numbered": false
        }
      },
      "limits": {
        "abstract_max_words": 250,
        "main_text_max_words": 8000,
        "max_display_items": 8
      },
      "required_sections": [
        "Title, Authors, Affiliations",
        "Table of Contents (TOC) / Abstract Graphic (3.25 x 1.75 in)",
        "Abstract",
        "Introduction",
        "Results and Discussion",
        "Conclusions",
        "Experimental Section / Methods",
        "Associated Content (Supporting Information Notice)",
        "Author Information",
        "Acknowledgment",
        "References"
      ]
    },
    "ai_policy": {
      "authorship_eligible": false,
      "generative_imagery_allowed": false,
      "generative_imagery_exceptions": "Permissible only when generative AI models are the direct subject of scientific analysis in chemical sciences or computational chemistry.\n",
      "text_and_code_disclosure_required": true,
      "preferred_disclosure_placement": "Acknowledgment",
      "policy_url": "https://publish.acs.org/publish/author_guidelines?coden=jacsat#policies_ai",
      "official_statement_template": "The author(s) declare that [TOOL NAME, VERSION, e.g., Claude 3.5 / ChatGPT] was used for [SPECIFY FUNCTION: e.g., language editing and drafting assistance]. The author(s) have reviewed, verified, and take full responsibility for all content and data reported in this manuscript.\n"
    }
  },
  "science": {
    "schema_version": "1.0.0",
    "metadata": {
      "publisher": "American Association for the Advancement of Science (AAAS)",
      "journal_name": "Science",
      "issn": "1095-9203",
      "guidelines_url": "https://www.science.org/content/page/science-information-authors",
      "last_verified": "2026-09-11",
      "notes": "Official guidelines for Science Research Articles and Reports. Features 55 mm single-column width (2.17 in), uppercase bold panel labels ('A', 'B'), Helvetica typography, strict 4 display item cap, and prohibition of generative imagery.\n"
    },
    "figure_geometry": {
      "default_unit": "mm",
      "max_height": 230.0,
      "column_widths": {
        "single_column": {
          "width": 55.0,
          "description": "Standard 1-column width (55 mm / 2.17 in)"
        },
        "one_and_half_column": {
          "width": 120.0,
          "description": "Intermediate 1.5-column width (120 mm / 4.72 in)"
        },
        "double_column": {
          "width": 175.0,
          "description": "Full text-width 2-column page spread (175 mm / 6.89 in)"
        }
      },
      "panel_spacing": {
        "minimum_gutter": 3.0
      }
    },
    "figure_typography": {
      "family_preferences": {
        "primary": "Helvetica",
        "fallback": [
          "Arial"
        ],
        "serif_alternative": "Times New Roman",
        "symbol_font": "Symbol"
      },
      "font_sizes": {
        "unit": "pt",
        "panel_label": {
          "size": 9.0,
          "weight": "bold"
        },
        "axis_title": {
          "size": 7.5,
          "weight": "regular"
        },
        "tick_label": {
          "size": 6.5,
          "weight": "regular"
        },
        "legend_title": {
          "size": 7.0,
          "weight": "bold"
        },
        "legend_text": {
          "size": 6.5,
          "weight": "regular"
        },
        "annotation": {
          "size": 6.0,
          "weight": "regular"
        },
        "min_allowed_size": 5.5
      }
    },
    "line_weights": {
      "unit": "pt",
      "axis_lines": 0.5,
      "tick_marks": 0.5,
      "data_lines_normal": 1.0,
      "data_lines_thick": 1.5,
      "grid_lines": 0.25,
      "min_allowed_weight": 0.25
    },
    "panel_labeling": {
      "case": "uppercase",
      "weight": "bold",
      "punctuation": "",
      "position": "top_left_outside",
      "font_family": "Helvetica"
    },
    "color_specifications": {
      "accepted_modes": {
        "initial_submission": [
          "RGB"
        ],
        "final_production": [
          "RGB",
          "CMYK"
        ]
      },
      "color_blind_safe_required": true,
      "recommended_palettes": [
        "Okabe-Ito",
        "Viridis",
        "Tol-Bright"
      ],
      "black_white_contrast_ratio": 4.5
    },
    "export_requirements": {
      "preferred_vector_formats": [
        {
          "format": "PDF",
          "notes": "Vector PDF with subset fonts embedded."
        },
        {
          "format": "EPS",
          "notes": "Encapsulated PostScript with fonts outlined."
        },
        {
          "format": "SVG",
          "notes": "Clean vector SVG."
        }
      ],
      "accepted_raster_formats": [
        {
          "format": "TIFF",
          "compression": "LZW"
        }
      ],
      "resolution_dpi": {
        "line_art": 1000,
        "combination_art": 600,
        "photographic_halftone": 300
      },
      "max_file_size_mb": 50
    },
    "manuscript_layout": {
      "page": {
        "size": "Letter",
        "margins_mm": {
          "top": 25.4,
          "bottom": 25.4,
          "left": 25.4,
          "right": 25.4
        }
      },
      "spacing": {
        "line_spacing": "double",
        "line_numbering": "continuous"
      },
      "body_typography": {
        "font_family": "Times New Roman",
        "font_size_pt": 12.0
      },
      "heading_hierarchy": {
        "title": {
          "size_pt": 18.0,
          "weight": "bold",
          "numbered": false
        },
        "h1": {
          "size_pt": 14.0,
          "weight": "bold",
          "numbered": false
        },
        "h2": {
          "size_pt": 12.0,
          "weight": "bold",
          "numbered": false
        }
      },
      "limits": {
        "abstract_max_words": 125,
        "main_text_max_words": 4500,
        "max_display_items": 4
      },
      "required_sections": [
        "Title, Authors, Affiliations",
        "One-Sentence Summary (\u2264150 characters)",
        "Abstract (\u2264125 words)",
        "Main Text",
        "References and Notes",
        "Acknowledgments (Funding, Author contributions, Competing interests, Data and materials availability)",
        "Supplementary Materials"
      ]
    },
    "ai_policy": {
      "authorship_eligible": false,
      "generative_imagery_allowed": false,
      "generative_imagery_exceptions": "Permissible only when generative AI models are the direct topic of scientific investigation.\n",
      "text_and_code_disclosure_required": true,
      "preferred_disclosure_placement": "Acknowledgments",
      "policy_url": "https://www.science.org/content/page/science-information-authors#editorial-policies",
      "official_statement_template": "The author(s) used [TOOL NAME, VERSION] to assist with [SPECIFY PURPOSE: e.g., improving prose style and grammatical phrasing]. All scientific arguments, calculations, and interpretations were generated and independently verified by the human authors, who accept full responsibility for the veracity and originality of the work.\n"
    }
  },
  "cell": {
    "schema_version": "1.0.0",
    "metadata": {
      "publisher": "Cell Press (Elsevier)",
      "journal_name": "Cell",
      "issn": "0092-8674",
      "guidelines_url": "https://www.cell.com/cell/authors",
      "last_verified": "2026-09-11",
      "notes": "Official guidelines for Cell Press primary research manuscripts. Features STAR Methods framework, Key Resources Table, 85 mm single column width, mandatory standalone AI declaration section, and strict accessibility requirements.\n"
    },
    "figure_geometry": {
      "default_unit": "mm",
      "max_height": 235.0,
      "column_widths": {
        "single_column": {
          "width": 85.0,
          "description": "Standard 1-column width (85 mm / 3.35 in)"
        },
        "one_and_half_column": {
          "width": 114.0,
          "description": "Intermediate 1.5-column width (114 mm / 4.49 in)"
        },
        "double_column": {
          "width": 174.0,
          "description": "Full text-width 2-column page spread (174 mm / 6.85 in)"
        }
      },
      "panel_spacing": {
        "minimum_gutter": 3.0
      }
    },
    "figure_typography": {
      "family_preferences": {
        "primary": "Arial",
        "fallback": [
          "Helvetica"
        ],
        "serif_alternative": "Times New Roman",
        "symbol_font": "Symbol"
      },
      "font_sizes": {
        "unit": "pt",
        "panel_label": {
          "size": 8.0,
          "weight": "bold"
        },
        "axis_title": {
          "size": 7.0,
          "weight": "regular"
        },
        "tick_label": {
          "size": 6.0,
          "weight": "regular"
        },
        "legend_title": {
          "size": 6.5,
          "weight": "bold"
        },
        "legend_text": {
          "size": 6.0,
          "weight": "regular"
        },
        "annotation": {
          "size": 5.5,
          "weight": "regular"
        },
        "min_allowed_size": 5.0
      }
    },
    "line_weights": {
      "unit": "pt",
      "axis_lines": 0.5,
      "tick_marks": 0.5,
      "data_lines_normal": 1.0,
      "data_lines_thick": 1.5,
      "grid_lines": 0.25,
      "min_allowed_weight": 0.25
    },
    "panel_labeling": {
      "case": "uppercase",
      "weight": "bold",
      "punctuation": "",
      "position": "top_left_outside",
      "font_family": "Arial"
    },
    "color_specifications": {
      "accepted_modes": {
        "initial_submission": [
          "RGB"
        ],
        "final_production": [
          "RGB",
          "CMYK"
        ]
      },
      "color_blind_safe_required": true,
      "recommended_palettes": [
        "Okabe-Ito",
        "Tol-Bright",
        "Viridis"
      ],
      "black_white_contrast_ratio": 4.5
    },
    "export_requirements": {
      "preferred_vector_formats": [
        {
          "format": "PDF",
          "notes": "Vector PDF with all fonts embedded."
        },
        {
          "format": "EPS",
          "notes": "Encapsulated PostScript with fonts converted to outlines."
        }
      ],
      "accepted_raster_formats": [
        {
          "format": "TIFF",
          "compression": "LZW"
        }
      ],
      "resolution_dpi": {
        "line_art": 1000,
        "combination_art": 500,
        "photographic_halftone": 300
      },
      "max_file_size_mb": 50
    },
    "manuscript_layout": {
      "page": {
        "size": "Letter",
        "margins_mm": {
          "top": 25.4,
          "bottom": 25.4,
          "left": 25.4,
          "right": 25.4
        }
      },
      "spacing": {
        "line_spacing": "double",
        "line_numbering": "continuous"
      },
      "body_typography": {
        "font_family": "Arial",
        "font_size_pt": 11.0
      },
      "heading_hierarchy": {
        "title": {
          "size_pt": 18.0,
          "weight": "bold",
          "numbered": false
        },
        "h1": {
          "size_pt": 12.0,
          "weight": "bold",
          "numbered": false
        },
        "h2": {
          "size_pt": 11.0,
          "weight": "bold",
          "numbered": false
        },
        "h3": {
          "size_pt": 11.0,
          "weight": "italic",
          "numbered": false
        }
      },
      "limits": {
        "abstract_max_words": 150,
        "main_text_max_words": 7000,
        "max_display_items": 7
      },
      "required_sections": [
        "Title, Authors, Affiliations",
        "Summary (Abstract)",
        "Introduction",
        "Results",
        "Discussion",
        "Declaration of Generative AI and AI-Assisted Technologies in the Writing Process",
        "STAR Methods",
        "Key Resources Table",
        "Resource Availability (Lead Contact, Materials Availability, Data and Code Availability)",
        "Experimental Model and Study Participant Details",
        "Method Details",
        "Quantification and Statistical Analysis",
        "Acknowledgments",
        "Author Contributions",
        "Declaration of Interests",
        "References"
      ]
    },
    "ai_policy": {
      "authorship_eligible": false,
      "generative_imagery_allowed": false,
      "generative_imagery_exceptions": "Permissible only when generative AI models are the direct subject of scientific analysis.\n",
      "text_and_code_disclosure_required": true,
      "preferred_disclosure_placement": "Declaration of Generative AI and AI-assisted technologies in the writing process",
      "policy_url": "https://www.elsevier.com/about/policies-and-standards/the-use-of-generative-ai-and-ai-assisted-technologies-in-writing-for-elsevier",
      "official_statement_template": "Declaration of generative AI and AI-assisted technologies in the writing process: During the preparation of this work the author(s) used [NAME TOOL / SERVICE] in order to [REASON]. After using this tool/service, the author(s) reviewed and edited the content as needed and take(s) full responsibility for the content of the publication.\n"
    }
  }
};

// Curated Accessible Scientific Palettes (Universal Standards)
const PALETTES = {
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
let activePalette = "Okabe-Ito";
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

  // Column Buttons & Geometry Visualizer
  updateColumnButtons();
  updateVisualizer();

  // Typography Preview
  renderTypographyPreview();

  // Swatch Grid & Active Format
  updateActiveFormatBadge();
  renderSwatches();

  // AI Policy Box
  renderAiPolicy();

  // Code Snippet
  renderCodeSnippet();
}

function updateColumnButtons() {
  const geom = currentJournalData.figure_geometry;
  const btn15 = document.querySelector('.col-btn[data-col="one_and_half_column"]');
  if (btn15) {
    if (!geom.column_widths.one_and_half_column) {
      btn15.style.display = "none";
      if (currentColumnMode === "one_and_half_column") {
        currentColumnMode = "single_column";
        document.querySelectorAll(".col-btn").forEach((b) => b.classList.remove("active"));
        document.querySelector('.col-btn[data-col="single_column"]')?.classList.add("active");
      }
    } else {
      btn15.style.display = "";
    }
  }
}

function updateVisualizer() {
  const geom = currentJournalData.figure_geometry;
  const col = geom.column_widths[currentColumnMode] || geom.column_widths.single_column;
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
  const primaryFont = currentJournalData.figure_typography.family_preferences.primary;
  const panelCase = currentJournalData.panel_labeling.case;
  const panelPunct = currentJournalData.panel_labeling.punctuation || "";
  const panelSample = panelPunct ? (panelPunct.includes("a") ? (panelCase === "uppercase" ? panelPunct.toUpperCase() : panelPunct) : (panelCase === "uppercase" ? `A${panelPunct}` : `a${panelPunct}`)) : (panelCase === "uppercase" ? "A" : "a");

  const stage = document.getElementById("typo-stage");
  stage.style.fontFamily = `"${primaryFont}", Helvetica, Arial, sans-serif`;
  stage.innerHTML = `
    <div class="typo-row">
      <span class="typo-label">Panel Label (${typo.panel_label.size} pt ${typo.panel_label.weight})</span>
      <span class="typo-preview" style="font-size: ${typo.panel_label.size * 2}px; font-weight: ${typo.panel_label.weight === 'bold' ? '700' : '400'};">${panelSample}</span>
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

const FORMAT_LABELS = {
  hex: "HEX",
  rgb255: "RGB",
  rgb_norm: "RGB% (0-1.0)",
  rgb_percent: "RGB% (0-100%)",
  hsv: "HSV",
  cmyk: "CMYK"
};

function updateActiveFormatBadge() {
  const badge = document.getElementById("active-fmt-badge");
  if (badge) {
    badge.textContent = FORMAT_LABELS[activeColorFormat] || activeColorFormat.toUpperCase();
  }
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
    case "rgb_percent":
      return `rgb(${Math.round((r / 255) * 100)}%, ${Math.round((g / 255) * 100)}%, ${Math.round((b / 255) * 100)}%)`;
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

    // Calculate effective color adjusted for active CVD simulation mode
    const effectiveHex = simulateCVD(c.hex, currentCvdMode);
    const formattedVal = formatColor(effectiveHex, activeColorFormat);
    const isSimulated = currentCvdMode !== "normal";

    card.innerHTML = `
      <div class="swatch-color-box" style="background-color: ${effectiveHex};">
        ${isSimulated ? `<span style="font-size:0.6rem; text-transform:uppercase; letter-spacing:0.04em;">${currentCvdMode.slice(0, 5)}</span>` : ''}
      </div>
      <div class="swatch-meta">
        <span class="swatch-name">${c.name}</span>
        <span class="swatch-code">${formattedVal}</span>
      </div>
      <span class="swatch-copy-hint">Click to copy</span>
    `;

    const copyMsg = isSimulated
      ? `Copied ${c.name} (${currentCvdMode}): ${formattedVal}`
      : `Copied ${c.name}: ${formattedVal}`;

    card.addEventListener("click", () => {
      copyToClipboard(formattedVal, copyMsg, card);
    });

    container.appendChild(card);
  });
}

function showToast(message) {
  const toast = document.getElementById("copy-toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function copyToClipboard(text, successMsg = "Copied to clipboard!", triggerEl = null) {
  const onSuccess = () => {
    showToast(successMsg);
    if (triggerEl) {
      if (triggerEl.classList.contains("swatch-card")) {
        triggerEl.classList.add("swatch-copied");
        const hint = triggerEl.querySelector(".swatch-copy-hint");
        if (hint) {
          const prev = hint.textContent;
          hint.textContent = "✓ Copied!";
          setTimeout(() => {
            hint.textContent = prev;
            triggerEl.classList.remove("swatch-copied");
          }, 1500);
        } else {
          setTimeout(() => triggerEl.classList.remove("swatch-copied"), 1500);
        }
      } else {
        const origText = triggerEl.dataset.origText || triggerEl.textContent;
        triggerEl.dataset.origText = origText;
        triggerEl.textContent = "✓ Copied!";
        triggerEl.classList.add("copied");
        setTimeout(() => {
          triggerEl.textContent = origText;
          triggerEl.classList.remove("copied");
        }, 1800);
      }
    }
  };

  // Modern Async Clipboard API (Secure Contexts)
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(onSuccess)
      .catch((err) => {
        console.warn("Async clipboard failed, falling back to execCommand:", err);
        fallbackCopyToClipboard(text, onSuccess);
      });
  } else {
    // Universal fallback for http://, file://, and local development
    fallbackCopyToClipboard(text, onSuccess);
  }
}

function fallbackCopyToClipboard(text, onSuccess) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  textArea.style.padding = "0";
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  textArea.style.background = "transparent";
  textArea.style.opacity = "0";
  textArea.setAttribute("readonly", "");
  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    if (successful) {
      onSuccess();
    } else {
      prompt("Copy to clipboard: Ctrl+C, Enter", text);
    }
  } catch (err) {
    console.error("Fallback copy failed:", err);
    prompt("Copy to clipboard: Ctrl+C, Enter", text);
  } finally {
    document.body.removeChild(textArea);
  }
}

// ---------------------------------------------------------------------------
// Bulk Palette Export Handlers (Responsive to Format and CVD Simulation)
// ---------------------------------------------------------------------------

function copyPaletteInFormat(fmt, btn = null) {
  const swatches = PALETTES[activePalette] || PALETTES["Okabe-Ito"];
  const isSimulated = currentCvdMode !== "normal";
  const fmtLabel = FORMAT_LABELS[fmt] || fmt.toUpperCase();

  const header = isSimulated
    ? `// ${activePalette} Palette - Simulated for ${currentCvdMode.toUpperCase()} [${fmtLabel}]\n`
    : `// ${activePalette} Palette (Accessible Scientific Standard) [${fmtLabel}]\n`;

  const lines = swatches.map((s) => {
    const effectiveHex = simulateCVD(s.hex, currentCvdMode);
    const formatted = formatColor(effectiveHex, fmt);
    const origNote = isSimulated ? `(simulated from ${s.hex})` : `(${effectiveHex})`;
    if (fmt === "rgb_norm") {
      return `  ${formatted},  // ${s.name} ${origNote}`;
    }
    return `  "${formatted}",  // ${s.name} ${origNote}`;
  });

  const output = `${header}[\n${lines.join("\n")}\n]`;
  const toastMsg = isSimulated
    ? `Copied ${activePalette} (${currentCvdMode}) as ${fmtLabel}!`
    : `Copied ${activePalette} as ${fmtLabel}!`;

  copyToClipboard(output, toastMsg, btn);
}

function copyPaletteForPython(btn = null) {
  const swatches = PALETTES[activePalette] || PALETTES["Okabe-Ito"];
  const isSimulated = currentCvdMode !== "normal";
  const header = isSimulated
    ? `# ${activePalette} Palette - Simulated for ${currentCvdMode.toUpperCase()} (Python Dictionary & Normalized RGB)\n`
    : `# ${activePalette} Color-Blind Safe Palette for Python / Matplotlib\n# Normalized RGB (0.0 to 1.0) and HEX definitions\n`;

  const dictLines = swatches.map((s) => {
    const effectiveHex = simulateCVD(s.hex, currentCvdMode);
    const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
    const note = isSimulated ? `# ${s.name} (orig: ${s.hex})` : `# ${s.name}`;
    return `    "${slug}": "${effectiveHex}",  ${note}`;
  });

  const listLines = swatches.map((s) => {
    const effectiveHex = simulateCVD(s.hex, currentCvdMode);
    const { r, g, b } = hexToRgb(effectiveHex);
    const tuple = `(${(r / 255).toFixed(3)}, ${(g / 255).toFixed(3)}, ${(b / 255).toFixed(3)})`;
    const note = isSimulated ? `# ${s.name} (${effectiveHex}, orig: ${s.hex})` : `# ${s.name} (${effectiveHex})`;
    return `    ${tuple},  ${note}`;
  });

  const output = `${header}palette = {\n${dictLines.join("\n")}\n}\n\ncolors_rgb_norm = [\n${listLines.join("\n")}\n]`;
  const toast = isSimulated
    ? `Copied ${activePalette} (${currentCvdMode}) for Python!`
    : `Copied ${activePalette} for Python / Matplotlib!`;
  copyToClipboard(output, toast, btn);
}

function copyPaletteForR(btn = null) {
  const swatches = PALETTES[activePalette] || PALETTES["Okabe-Ito"];
  const isSimulated = currentCvdMode !== "normal";
  const varSuffix = isSimulated ? `_${currentCvdMode}` : "";
  const varName = `palette_${activePalette.toLowerCase().replace(/[^a-z0-9]/g, "_")}${varSuffix}`;
  const header = isSimulated
    ? `# ${activePalette} Palette - Simulated for ${currentCvdMode.toUpperCase()} for R (ggplot2)\n`
    : `# ${activePalette} Color-Blind Safe Palette for R (ggplot2)\n`;

  const lines = swatches.map((s) => {
    const effectiveHex = simulateCVD(s.hex, currentCvdMode);
    const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
    const note = isSimulated ? `# ${s.name} (orig: ${s.hex})` : `# ${s.name}`;
    return `  "${slug}" = "${effectiveHex}",  ${note}`;
  });

  const output = `${header}${varName} <- c(\n${lines.join("\n")}\n)`;
  const toast = isSimulated
    ? `Copied ${activePalette} (${currentCvdMode}) for R!`
    : `Copied ${activePalette} for R (ggplot2)!`;
  copyToClipboard(output, toast, btn);
}

function copyPaletteForLatex(btn = null) {
  const swatches = PALETTES[activePalette] || PALETTES["Okabe-Ito"];
  const isSimulated = currentCvdMode !== "normal";
  const header = isSimulated
    ? `% ${activePalette} Palette - Simulated for ${currentCvdMode.toUpperCase()} (LaTeX xcolor)\n\\usepackage{xcolor}\n`
    : `% ${activePalette} Color-Blind Safe Palette for LaTeX (xcolor package)\n\\usepackage{xcolor}\n`;

  const lines = swatches.map((s) => {
    const effectiveHex = simulateCVD(s.hex, currentCvdMode);
    const cleanHex = effectiveHex.replace("#", "").toUpperCase();
    const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
    const note = isSimulated ? `% orig: ${s.hex}` : `% ${s.name}`;
    return `\\definecolor{jct_${slug}}{HTML}{${cleanHex}} ${note}`;
  });

  const output = `${header}${lines.join("\n")}`;
  const toast = isSimulated
    ? `Copied ${activePalette} (${currentCvdMode}) for LaTeX!`
    : `Copied ${activePalette} for LaTeX!`;
  copyToClipboard(output, toast, btn);
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
  const swatches = PALETTES[activePalette] || PALETTES["Okabe-Ito"];
  const isSimulated = currentCvdMode !== "normal";
  const cvdDesc = isSimulated ? ` [CVD Simulated: ${currentCvdMode.toUpperCase()}]` : "";

  // Prepare color details for all swatches
  const colorItems = swatches.map((s) => {
    const effectiveHex = simulateCVD(s.hex, currentCvdMode);
    const { r, g, b } = hexToRgb(effectiveHex);
    const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
    return {
      name: s.name,
      slug,
      hex: effectiveHex,
      origHex: s.hex,
      r, g, b,
      rNorm: (r / 255).toFixed(3),
      gNorm: (g / 255).toFixed(3),
      bNorm: (b / 255).toFixed(3),
      hsv: rgbToHsv(r, g, b),
      cmyk: rgbToCmyk(r, g, b)
    };
  });

  const singleInches = (data.figure_geometry.column_widths.single_column.width / 25.4).toFixed(2);
  const doubleInches = (data.figure_geometry.column_widths.double_column.width / 25.4).toFixed(2);
  const primaryColorSlug = colorItems.length > 5 ? colorItems[5].slug : colorItems[0].slug;
  const secondaryColorSlug = colorItems.length > 6 ? colorItems[6].slug : (colorItems.length > 1 ? colorItems[1].slug : colorItems[0].slug);

  if (activeSnippetTab === "matplotlib") {
    const pyDictLines = colorItems.map((c) => {
      const simNote = isSimulated ? `  # orig: ${c.origHex}` : "";
      return `    "${c.slug}": "${c.hex}",${simNote.padEnd(20)} # ${c.name}`;
    }).join("\n");

    codeBlock.textContent = `# Matplotlib configuration for ${data.metadata.journal_name}
# Selected Palette: ${activePalette} (${colorItems.length} colors)${cvdDesc}
import matplotlib.pyplot as plt
from cycler import cycler

# 1. Complete Selected Palette Colors
palette = {
${pyDictLines}
}

# 2. Compliant Typography & Geometry Parameters
# Single column: ${singleInches} in (${data.figure_geometry.column_widths.single_column.width} mm) | Double column: ${doubleInches} in (${data.figure_geometry.column_widths.double_column.width} mm)
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
    "axes.prop_cycle": cycler(color=list(palette.values())),
    "figure.dpi": 300,
    "savefig.dpi": ${data.export_requirements.resolution_dpi.line_art},
    "savefig.bbox": "tight",
})

# 3. Example Publication-Ready Figure
fig, ax = plt.subplots(figsize=(${singleInches}, 2.5))
ax.plot([0, 1, 2], [10, 20, 15], color=palette["${primaryColorSlug}"], label="Control (${colorItems.find(c => c.slug === primaryColorSlug).name})")
ax.plot([0, 1, 2], [5, 12, 18], color=palette["${secondaryColorSlug}"], label="Treated (${colorItems.find(c => c.slug === secondaryColorSlug).name})")
ax.set_xlabel("Time (h)")
ax.set_ylabel("Normalized Response (a.u.)")
ax.legend(frameon=False)
plt.savefig("figure1.pdf")`;
  } else if (activeSnippetTab === "r_ggplot2") {
    const rVectorLines = colorItems.map((c) => {
      const simNote = isSimulated ? `  # orig: ${c.origHex}` : "";
      return `  "${c.slug}" = "${c.hex}",${simNote.padEnd(20)} # ${c.name}`;
    }).join("\n");

    const varName = `palette_${activePalette.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;

    codeBlock.textContent = `# R ggplot2 theme & palette for ${data.metadata.journal_name}
# Selected Palette: ${activePalette} (${colorItems.length} colors)${cvdDesc}
library(ggplot2)

# 1. Complete Selected Palette Vector
${varName} <- c(
${rVectorLines}
)

# 2. Journal Compliant Theme
theme_${currentJournalKey} <- function() {
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

# 3. Example Plot with Injected Colors
# p <- ggplot(df, aes(x = time, y = response, color = cohort)) +
#   geom_line(linewidth = ${data.line_weights.data_lines_normal * 0.353}) +
#   scale_color_manual(values = ${varName}) +
#   theme_${currentJournalKey}()
# ggsave("fig1.pdf", plot = p, width = ${data.figure_geometry.column_widths.single_column.width}, height = 65, units = "mm", dpi = ${data.export_requirements.resolution_dpi.line_art})`;
  } else if (activeSnippetTab === "latex") {
    const latexColorLines = colorItems.map((c) => {
      const cleanHex = c.hex.replace("#", "").toUpperCase();
      const simNote = isSimulated ? ` % orig: ${c.origHex}` : "";
      return `\\definecolor{jct_${c.slug}}{HTML}{${cleanHex}}${simNote.padEnd(16)} % ${c.name}`;
    }).join("\n");

    const cycleItems = colorItems.slice(0, 6).map((c) => `  {jct_${c.slug}, mark=*},`).join("\n");

    codeBlock.textContent = `% LaTeX Figure snippet & color definitions for ${data.metadata.journal_name}
% Selected Palette: ${activePalette} (${colorItems.length} colors)${cvdDesc}
\\usepackage{graphicx}
\\usepackage{xcolor}
\\usepackage{pgfplots}
\\pgfplotsset{compat=1.18}
\\usepackage{lineno}
\\linenumbers % Required during review

% 1. Complete Selected Palette Definitions
${latexColorLines}

% 2. PGFPlots Plot Cycle List
\\pgfplotscreateplotcyclelist{journal_palette}{
${cycleItems}
}

% 3. Compliant Figure Environment (Single Column Width: ${data.figure_geometry.column_widths.single_column.width} mm)
\\begin{figure}[htbp]
  \\centering
  \\includegraphics[width=${data.figure_geometry.column_widths.single_column.width}mm]{figures/figure1.pdf}
  \\caption{\\textbf{a}, Kinetics under \\textcolor{jct_${primaryColorSlug}}{${colorItems.find(c => c.slug === primaryColorSlug).name}} and \\textcolor{jct_${secondaryColorSlug}}{${colorItems.find(c => c.slug === secondaryColorSlug).name}} conditions. \\textbf{b}, Multi-panel dose response.}
  \\label{fig:main_result}
\\end{figure}`;
  } else if (activeSnippetTab === "yaml") {
    const yamlColorLines = colorItems.map((c) => {
      return `    - name: "${c.name}"
      slug: "${c.slug}"
      hex: "${c.hex}"
      rgb_255: [${c.r}, ${c.g}, ${c.b}]
      rgb_norm: [${c.rNorm}, ${c.gNorm}, ${c.bNorm}]
      hsv: [${c.hsv.h}, ${c.hsv.s}, ${c.hsv.v}]
      cmyk: [${c.cmyk.c}, ${c.cmyk.m}, ${c.cmyk.y}, ${c.cmyk.k}]`;
    }).join("\n");

    codeBlock.textContent = `# Journal Compliance Template: ${data.metadata.journal_name}
# Selected Palette: ${activePalette}${cvdDesc}
schema_version: "${data.schema_version}"
metadata:
  journal_name: "${data.metadata.journal_name}"
  publisher: "${data.metadata.publisher}"
  guidelines_url: "${data.metadata.guidelines_url}"

figure_geometry:
  single_column_width_mm: ${data.figure_geometry.column_widths.single_column.width}
  one_and_half_column_width_mm: ${data.figure_geometry.column_widths.one_and_half_column.width}
  double_column_width_mm: ${data.figure_geometry.column_widths.double_column.width}
  max_height_mm: ${data.figure_geometry.max_height}

figure_typography:
  primary_font: "${data.figure_typography.family_preferences.primary}"
  fallback_fonts: [${data.figure_typography.family_preferences.fallback.map(f => `"${f}"`).join(", ")}]
  font_sizes_pt:
    panel_label: ${data.figure_typography.font_sizes.panel_label.size}
    axis_title: ${data.figure_typography.font_sizes.axis_title.size}
    tick_label: ${data.figure_typography.font_sizes.tick_label.size}
    min_allowed_size: ${data.figure_typography.font_sizes.min_allowed_size}

line_weights_pt:
  axis_lines: ${data.line_weights.axis_lines}
  data_lines_normal: ${data.line_weights.data_lines_normal}
  min_allowed_weight: ${data.line_weights.min_allowed_weight}

export_requirements:
  resolution_dpi:
    line_art: ${data.export_requirements.resolution_dpi.line_art}
    photographic_halftone: ${data.export_requirements.resolution_dpi.photographic_halftone}

# Selected Colors Injected Dynamically
selected_palette:
  name: "${activePalette}"
  cvd_simulation: "${currentCvdMode}"
  color_count: ${colorItems.length}
  colors:
${yamlColorLines}`;
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

  // Journal Selector Tabs
  document.querySelectorAll(".journal-tab").forEach((tab) => {
    tab.addEventListener("click", (e) => {
      document.querySelectorAll(".journal-tab").forEach((t) => t.classList.remove("active"));
      const btn = e.currentTarget;
      btn.classList.add("active");
      const key = btn.dataset.journal;
      if (window.JOURNALS_DATA && window.JOURNALS_DATA[key]) {
        currentJournalKey = key;
        currentJournalData = window.JOURNALS_DATA[key];
        renderJournalView();
        showToast(`Loaded ${currentJournalData.metadata.journal_name} specifications`);
      }
    });
  });

  // Column mode buttons
  document.querySelectorAll(".col-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".col-btn").forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      currentColumnMode = e.target.dataset.col;
      updateVisualizer();
    });
  });

  // Palette tabs (triggers swatches and code snippet re-render)
  document.querySelectorAll(".palette-tab-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".palette-tab-btn").forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      activePalette = e.target.dataset.palette;
      renderSwatches();
      renderCodeSnippet();
    });
  });

  // Format buttons
  document.querySelectorAll(".fmt-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".fmt-btn").forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      activeColorFormat = e.target.dataset.fmt;
      updateActiveFormatBadge();
      renderSwatches();
    });
  });

  // CVD mode buttons (triggers swatches and code snippet re-render)
  document.querySelectorAll(".cvd-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".cvd-btn").forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      currentCvdMode = e.target.dataset.cvd;
      renderSwatches();
      renderCodeSnippet();
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

  // Bulk copy palette in currently selected format
  const copyFormattedBtn = document.getElementById("copy-palette-formatted");
  if (copyFormattedBtn) {
    copyFormattedBtn.addEventListener("click", (e) => copyPaletteInFormat(activeColorFormat, e.currentTarget));
  }

  // Fallback for legacy copy-palette-hex ID if present
  const copyHexBtn = document.getElementById("copy-palette-hex");
  if (copyHexBtn) {
    copyHexBtn.addEventListener("click", (e) => copyPaletteInFormat(activeColorFormat, e.currentTarget));
  }

  // Quick Copy by Format buttons
  document.querySelectorAll("[data-copy-fmt]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const fmt = e.currentTarget.dataset.copyFmt;
      copyPaletteInFormat(fmt, e.currentTarget);
    });
  });

  // Language-specific palette copy buttons
  const copyPyBtn = document.getElementById("copy-palette-python");
  if (copyPyBtn) {
    copyPyBtn.addEventListener("click", (e) => copyPaletteForPython(e.currentTarget));
  }

  const copyRBtn = document.getElementById("copy-palette-r");
  if (copyRBtn) {
    copyRBtn.addEventListener("click", (e) => copyPaletteForR(e.currentTarget));
  }

  const copyLatexBtn = document.getElementById("copy-palette-latex");
  if (copyLatexBtn) {
    copyLatexBtn.addEventListener("click", (e) => copyPaletteForLatex(e.currentTarget));
  }

  // Statement & code copy buttons
  const stmtBtn = document.getElementById("copy-statement-btn");
  if (stmtBtn) {
    stmtBtn.addEventListener("click", (e) => {
      const text = document.getElementById("ai-statement-text").textContent.trim();
      copyToClipboard(text, "Copied AI Disclosure Statement!", e.currentTarget);
    });
  }

  const codeBtn = document.getElementById("copy-code-btn");
  if (codeBtn) {
    codeBtn.addEventListener("click", (e) => {
      const text = document.getElementById("code-display").textContent;
      copyToClipboard(text, "Copied code snippet!", e.currentTarget);
    });
  }

  // Citation copy buttons
  const copyApaBtn = document.getElementById("copy-apa-btn");
  if (copyApaBtn) {
    copyApaBtn.addEventListener("click", (e) => {
      const text = document.getElementById("apa-text").textContent.trim();
      copyToClipboard(text, "Copied APA citation!", e.currentTarget);
    });
  }

  const copyBibtexBtn = document.getElementById("copy-bibtex-btn");
  if (copyBibtexBtn) {
    copyBibtexBtn.addEventListener("click", (e) => {
      const text = document.getElementById("bibtex-text").textContent.trim();
      copyToClipboard(text, "Copied BibTeX entry!", e.currentTarget);
    });
  }
}

"""
Figure plotting exporters and bridges for scientific journal compliance templates.
Provides Matplotlib (.mplstyle), R ggplot2 themes, and vector SVG grids.
"""

from pathlib import Path
from typing import Dict, Any, List, Optional
import yaml

from journal_compliance_templates.exporters.figures.mplstyle_generator import (
    ACCESSIBLE_PALETTES,
    get_palette_colors,
    generate_mplstyle_content,
    get_figure_dimensions,
    save_mplstyle,
)
from journal_compliance_templates.exporters.figures.r_theme_generator import (
    generate_r_theme_content,
    save_r_theme,
)
from journal_compliance_templates.exporters.figures.svg_grid_generator import (
    generate_svg_grid_content,
    save_svg_grid,
)

__all__ = [
    "ACCESSIBLE_PALETTES",
    "get_palette_colors",
    "generate_mplstyle_content",
    "get_figure_dimensions",
    "save_mplstyle",
    "generate_r_theme_content",
    "save_r_theme",
    "generate_svg_grid_content",
    "save_svg_grid",
    "generate_all_figure_assets",
]


def generate_all_figure_assets(
    templates_dir: Path,
    output_dir: Path,
    palette_name: str = "Okabe-Ito",
) -> Dict[str, List[Path]]:
    """
    Generate all figure exporter assets (.mplstyle, .R, .svg) for all templates.
    
    Args:
        templates_dir: Directory containing YAML templates.
        output_dir: Root output directory (e.g. dist/figures).
        palette_name: Palette name to embed (default 'Okabe-Ito').
        
    Returns:
        Dictionary mapping asset type to list of generated Path objects.
    """
    mpl_dir = output_dir / "matplotlib"
    r_dir = output_dir / "r"
    svg_dir = output_dir / "svg"
    
    mpl_dir.mkdir(parents=True, exist_ok=True)
    r_dir.mkdir(parents=True, exist_ok=True)
    svg_dir.mkdir(parents=True, exist_ok=True)
    
    generated: Dict[str, List[Path]] = {
        "matplotlib": [],
        "r": [],
        "svg": [],
    }
    
    yaml_files = list(templates_dir.glob("**/*.yaml")) + list(templates_dir.glob("**/*.yml"))
    
    for yf in sorted(yaml_files):
        with open(yf, "r", encoding="utf-8") as f:
            journal_data = yaml.safe_load(f)
            
        journal_key = yf.stem
        
        # 1. Matplotlib .mplstyle
        mpl_file = mpl_dir / f"{journal_key}.mplstyle"
        save_mplstyle(journal_data, mpl_file, palette_name=palette_name)
        generated["matplotlib"].append(mpl_file)
        
        # Also alias by directory parent name if different (e.g. acs vs jacs)
        parent_key = yf.parent.name
        if parent_key != "templates" and parent_key != journal_key:
            mpl_alias = mpl_dir / f"{parent_key}.mplstyle"
            save_mplstyle(journal_data, mpl_alias, palette_name=palette_name)
            generated["matplotlib"].append(mpl_alias)
        
        # 2. R ggplot2 theme script
        r_file = r_dir / f"theme_{journal_key}.R"
        save_r_theme(journal_data, r_file, palette_name=palette_name)
        generated["r"].append(r_file)
        
        if parent_key != "templates" and parent_key != journal_key:
            r_alias = r_dir / f"theme_{parent_key}.R"
            save_r_theme(journal_data, r_alias, palette_name=palette_name)
            generated["r"].append(r_alias)
            
        # 3. SVG Grids for each column configuration
        col_widths = journal_data.get("figure_geometry", {}).get("column_widths", {})
        for col_name in col_widths.keys():
            svg_file = svg_dir / f"{journal_key}_{col_name}.svg"
            save_svg_grid(journal_data, svg_file, column=col_name, palette_name=palette_name)
            generated["svg"].append(svg_file)
            
            if parent_key != "templates" and parent_key != journal_key:
                svg_alias = svg_dir / f"{parent_key}_{col_name}.svg"
                save_svg_grid(journal_data, svg_alias, column=col_name, palette_name=palette_name)
                generated["svg"].append(svg_alias)
                
    return generated

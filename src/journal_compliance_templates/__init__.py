"""
Journal Compliance Templates
Standardized compliance templates for scientific publishing.
"""

from pathlib import Path
from typing import Dict, List, Any
import yaml

__version__ = "0.1.0"

_ROOT = Path(__file__).resolve().parent.parent.parent
TEMPLATES_DIR = _ROOT / "templates"
SCHEMAS_DIR = _ROOT / "schemas"


def list_templates() -> List[str]:
    """Return a list of available journal template keys."""
    if not TEMPLATES_DIR.exists():
        return []
    templates = []
    for p in TEMPLATES_DIR.glob("**/*.yaml"):
        templates.append(p.stem)
    return sorted(templates)


def load_template(journal: str) -> Dict[str, Any]:
    """Load a journal template by name (e.g., 'nature')."""
    target = None
    for p in TEMPLATES_DIR.glob("**/*.yaml"):
        if p.stem == journal or p.parent.name == journal:
            target = p
            break

    if not target or not target.exists():
        raise FileNotFoundError(f"Template for journal '{journal}' not found in {TEMPLATES_DIR}")

    with open(target, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)

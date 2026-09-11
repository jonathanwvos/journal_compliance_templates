#!/usr/bin/env python3
"""
Build script to compile YAML journal templates to JSON and validate against schema.
Outputs to dist/json/<journal>.json and dist/json/all_journals.json
"""

import json
import os
import sys
from pathlib import Path
import yaml
from jsonschema import validate, ValidationError

REPO_ROOT = Path(__file__).resolve().parent.parent
SCHEMA_PATH = REPO_ROOT / "schemas" / "compliance_schema_v1.json"
TEMPLATES_DIR = REPO_ROOT / "templates"
DIST_DIR = REPO_ROOT / "dist" / "json"
WEB_DATA_DIR = REPO_ROOT / "web" / "data"


def load_json(filepath: Path) -> dict:
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def load_yaml(filepath: Path) -> dict:
    with open(filepath, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def main():
    if not SCHEMA_PATH.exists():
        print(f"Error: Schema not found at {SCHEMA_PATH}", file=sys.stderr)
        sys.exit(1)

    schema = load_json(SCHEMA_PATH)
    DIST_DIR.mkdir(parents=True, exist_ok=True)
    WEB_DATA_DIR.mkdir(parents=True, exist_ok=True)

    yaml_files = list(TEMPLATES_DIR.glob("**/*.yaml")) + list(TEMPLATES_DIR.glob("**/*.yml"))
    if not yaml_files:
        print("Warning: No YAML templates found in templates directory.")
        return

    print(f"Found {len(yaml_files)} template(s) to validate and compile:")
    all_journals = {}
    has_errors = False

    for yf in sorted(yaml_files):
        rel_path = yf.relative_to(TEMPLATES_DIR)
        print(f"  -> Processing: {rel_path} ...", end=" ")
        try:
            data = load_yaml(yf)
            validate(instance=data, schema=schema)
            
            journal_key = yf.stem
            all_journals[journal_key] = data

            # Write individual JSON
            out_file = DIST_DIR / f"{journal_key}.json"
            with open(out_file, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)

            print("VALID & COMPILED")
        except ValidationError as ve:
            print(f"FAILED (Schema Validation Error: {ve.message})")
            has_errors = True
        except Exception as e:
            print(f"FAILED (Error: {e})")
            has_errors = True

    # Write aggregated JSON for tooling and web UI
    all_out = DIST_DIR / "all_journals.json"
    with open(all_out, "w", encoding="utf-8") as f:
        json.dump(all_journals, f, indent=2)

    # Also sync into web/data/ for direct static loading
    web_out = WEB_DATA_DIR / "all_journals.json"
    with open(web_out, "w", encoding="utf-8") as f:
        json.dump(all_journals, f, indent=2)

    # Sync schema and docs into web/ so local static servers don't 404
    import shutil
    web_schemas = REPO_ROOT / "web" / "schemas"
    web_docs = REPO_ROOT / "web" / "docs"
    web_schemas.mkdir(parents=True, exist_ok=True)
    web_docs.mkdir(parents=True, exist_ok=True)

    shutil.copy2(SCHEMA_PATH, web_schemas / "compliance_schema_v1.json")
    if (REPO_ROOT / "project_plan.md").exists():
        shutil.copy2(REPO_ROOT / "project_plan.md", web_docs / "project_plan.md")
    if (REPO_ROOT / "LICENSE").exists():
        shutil.copy2(REPO_ROOT / "LICENSE", web_docs / "LICENSE")
    if (REPO_ROOT / "CITATION.cff").exists():
        shutil.copy2(REPO_ROOT / "CITATION.cff", web_docs / "CITATION.cff")

    print(f"\nAggregated manifest written to:")
    print(f"  - {all_out}")
    print(f"  - {web_out}")
    print(f"Synced web schemas to {web_schemas} and docs to {web_docs}")

    if has_errors:
        sys.exit(1)
    else:
        print("\nAll templates compiled successfully!")


if __name__ == "__main__":
    main()

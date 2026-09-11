import json
from pathlib import Path
import pytest
import yaml
from jsonschema import Draft202012Validator, validate

REPO_ROOT = Path(__file__).resolve().parent.parent
SCHEMA_PATH = REPO_ROOT / "schemas" / "compliance_schema_v1.json"
TEMPLATES_DIR = REPO_ROOT / "templates"


@pytest.fixture(scope="session")
def compliance_schema():
    assert SCHEMA_PATH.exists(), f"Schema file not found at {SCHEMA_PATH}"
    with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
        schema_data = json.load(f)
    Draft202012Validator.check_schema(schema_data)
    return schema_data


def get_template_files():
    files = list(TEMPLATES_DIR.glob("**/*.yaml")) + list(TEMPLATES_DIR.glob("**/*.yml"))
    return [str(f) for f in files]


def test_schema_itself_is_valid(compliance_schema):
    """Ensure the JSON schema itself is valid Draft 2020-12."""
    assert compliance_schema["title"] == "JournalComplianceSpecification"


@pytest.mark.parametrize("template_path", get_template_files())
def test_template_conforms_to_schema(template_path, compliance_schema):
    """Validate that every YAML template strictly adheres to the JSON schema."""
    with open(template_path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    validate(instance=data, schema=compliance_schema)


@pytest.mark.parametrize("template_path", get_template_files())
def test_template_numerical_consistency(template_path):
    """Sanity check dimensional and typographical hierarchies."""
    with open(template_path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    # Geometry checks
    geom = data["figure_geometry"]
    widths = geom["column_widths"]
    assert widths["single_column"]["width"] > 0
    assert widths["double_column"]["width"] > widths["single_column"]["width"]

    # Typography checks
    typo = data["figure_typography"]["font_sizes"]
    min_size = typo["min_allowed_size"]
    assert typo["panel_label"]["size"] >= min_size
    assert typo["axis_title"]["size"] >= min_size
    assert typo["tick_label"]["size"] >= min_size

    # Line weights checks
    weights = data["line_weights"]
    min_weight = weights["min_allowed_weight"]
    assert weights["axis_lines"] >= min_weight
    assert weights["tick_marks"] >= min_weight
    assert weights["data_lines_normal"] >= min_weight

    # AI policy check
    ai = data["ai_policy"]
    assert ai["authorship_eligible"] is False, "Top journals prohibit AI authorship"
    assert len(ai["official_statement_template"].strip()) > 20

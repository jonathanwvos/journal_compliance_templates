#!/usr/bin/env bash
# ==============================================================================
# Universal Journal Compliance CLI Runner (Linux & macOS)
# Usage: ./scripts/jct.sh [serve|build|test|list]
# ==============================================================================
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

if command -v uv >/dev/null 2>&1; then
    uv run python -m journal_compliance_templates.cli "$@"
elif command -v python3 >/dev/null 2>&1; then
    python3 -m journal_compliance_templates.cli "$@"
else
    python -m journal_compliance_templates.cli "$@"
fi

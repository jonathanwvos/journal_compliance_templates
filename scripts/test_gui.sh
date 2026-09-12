#!/usr/bin/env bash
# ==============================================================================
# Universal GUI / Browser QA Test Runner (Linux & macOS)
# Usage: ./scripts/test_gui.sh [--headed] [additional pytest args...]
# ==============================================================================
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

echo "=== Running Journal Compliance GUI QA Test Suite ==="

if command -v uv >/dev/null 2>&1; then
    uv run pytest tests/gui/ -v "$@"
elif command -v python3 >/dev/null 2>&1; then
    python3 -m pytest tests/gui/ -v "$@"
else
    pytest tests/gui/ -v "$@"
fi

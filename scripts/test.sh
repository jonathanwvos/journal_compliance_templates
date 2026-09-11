#!/usr/bin/env bash
# ==============================================================================
# Run Pytest suite for schema validation and numerical sanity (Linux & macOS)
# ==============================================================================
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

if command -v uv >/dev/null 2>&1; then
    uv run pytest -v "$@"
elif command -v pytest >/dev/null 2>&1; then
    pytest -v "$@"
else
    python3 -m pytest -v "$@"
fi

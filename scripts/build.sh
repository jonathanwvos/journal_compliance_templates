#!/usr/bin/env bash
# ==============================================================================
# Compile YAML templates to JSON and synchronize web assets (Linux & macOS)
# ==============================================================================
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

if command -v uv >/dev/null 2>&1; then
    uv run python scripts/build_dist.py "$@"
elif command -v python3 >/dev/null 2>&1; then
    python3 scripts/build_dist.py "$@"
else
    python scripts/build_dist.py "$@"
fi

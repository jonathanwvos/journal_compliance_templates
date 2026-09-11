#!/usr/bin/env bash
# ==============================================================================
# Start local Journal Compliance Documentation Explorer Server (Linux & macOS)
# ==============================================================================
set -e

# Resolve repository root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "==> Preparing Journal Compliance Explorer..."
cd "$REPO_ROOT"

# Ensure templates are compiled and synced
if command -v uv >/dev/null 2>&1; then
    uv run python scripts/build_dist.py
elif command -v python3 >/dev/null 2>&1; then
    python3 scripts/build_dist.py
else
    python scripts/build_dist.py
fi

PORT="${1:-8000}"
echo ""
echo "=========================================================="
echo "  Scientific Journal Compliance Explorer"
echo "  Opening in browser: http://localhost:$PORT"
echo "  Press Ctrl+C to exit"
echo "=========================================================="
echo ""

# Attempt to open browser automatically
if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "http://localhost:$PORT" >/dev/null 2>&1 &
elif command -v open >/dev/null 2>&1; then
    open "http://localhost:$PORT" >/dev/null 2>&1 &
fi

cd "$REPO_ROOT/web"
if command -v python3 >/dev/null 2>&1; then
    python3 -m http.server "$PORT"
else
    python -m http.server "$PORT"
fi

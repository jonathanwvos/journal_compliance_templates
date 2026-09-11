"""
Command Line Interface for Journal Compliance Templates.
Cross-platform entrypoint for serve, build, test, and validate tasks.
"""

import argparse
import os
import sys
import subprocess
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
WEB_DIR = REPO_ROOT / "web"
SCRIPTS_DIR = REPO_ROOT / "scripts"
DIST_DIR = REPO_ROOT / "dist"


def run_build():
    """Compile YAML templates into JSON artifacts and sync web assets."""
    print("=== Building Journal Compliance Templates ===")
    build_script = SCRIPTS_DIR / "build_dist.py"
    if not build_script.exists():
        print(f"Error: Build script not found at {build_script}", file=sys.stderr)
        return 1
    cmd = [sys.executable, str(build_script)]
    res = subprocess.run(cmd)
    return res.returncode


def run_test():
    """Run pytest suite verifying schema conformance and numerical consistency."""
    print("=== Running Test Suite ===")
    try:
        import pytest
    except ImportError:
        print("pytest not installed. Attempting uv run pytest...")
        res = subprocess.run(["uv", "run", "pytest", "-v"])
        return res.returncode

    res = pytest.main(["-v", str(REPO_ROOT / "tests")])
    return int(res)


def run_serve(port=8000, open_browser=True):
    """Start local web server hosting the documentation explorer."""
    # Ensure web assets and schemas are synced before serving
    run_build()

    os.chdir(WEB_DIR)
    handler = SimpleHTTPRequestHandler
    
    print(f"\n========================================================")
    print(f"  Scientific Journal Compliance Explorer")
    print(f"  Local Server: http://localhost:{port}")
    print(f"  Serving directory: {WEB_DIR}")
    print(f"  Press Ctrl+C to stop the server")
    print(f"========================================================\n")

    if open_browser:
        try:
            webbrowser.open(f"http://localhost:{port}")
        except Exception:
            pass

    try:
        with HTTPServer(("", port), handler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        return 0


def main():
    parser = argparse.ArgumentParser(
        prog="jct",
        description="Journal Compliance Templates: formatting and figure compliance for scientific publications."
    )
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # Serve command
    serve_parser = subparsers.add_parser("serve", help="Start local HTML documentation explorer server")
    serve_parser.add_argument("--port", "-p", type=int, default=8000, help="Port to serve on (default: 8000)")
    serve_parser.add_argument("--no-browser", action="store_true", help="Do not automatically open browser")

    # Build command
    subparsers.add_parser("build", help="Compile YAML templates to JSON and synchronize web assets")

    # Test command
    subparsers.add_parser("test", help="Run schema validation and numerical consistency tests")

    # List command
    subparsers.add_parser("list", help="List all available journal compliance templates")

    args = parser.parse_args()

    if args.command == "serve":
        sys.exit(run_serve(port=args.port, open_browser=not args.no_browser))
    elif args.command == "build":
        sys.exit(run_build())
    elif args.command == "test":
        sys.exit(run_test())
    elif args.command == "list":
        from journal_compliance_templates import list_templates
        templates = list_templates()
        print(f"Available Journal Templates ({len(templates)}):")
        for t in templates:
            print(f"  - {t}")
        sys.exit(0)
    else:
        parser.print_help()
        sys.exit(0)


if __name__ == "__main__":
    main()

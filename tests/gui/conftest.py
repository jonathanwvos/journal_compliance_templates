"""
Pytest configuration and fixtures for GUI / Browser QA testing.
Automatically manages background web server and Playwright browser contexts.
"""

import os
import sys
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import pytest

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from tests.gui.pages.explorer_page import ExplorerPage

WEB_DIR = REPO_ROOT / "web"


class QuietHTTPHandler(SimpleHTTPRequestHandler):
    """HTTP handler that serves web/ silently without stderr spam."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(WEB_DIR), **kwargs)

    def log_message(self, format, *args):
        pass


@pytest.fixture(scope="session")
def web_server_url():
    """
    Starts an ephemeral background HTTP server serving web/ directory.
    Yields the local base URL (e.g. 'http://127.0.0.1:45123').
    """
    # Ensure web assets and schemas are synced before test session
    from journal_compliance_templates.cli import run_build
    run_build()

    server = ThreadingHTTPServer(("127.0.0.1", 0), QuietHTTPHandler)
    port = server.server_port
    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()

    base_url = f"http://127.0.0.1:{port}"
    yield base_url

    server.shutdown()
    server.server_close()


@pytest.fixture
def browser_context_args(browser_context_args):
    """
    Configure browser context permissions for clipboard access and viewport sizing.
    """
    return {
        **browser_context_args,
        "permissions": ["clipboard-read", "clipboard-write"],
        "viewport": {"width": 1280, "height": 900},
    }


@pytest.fixture
def app_page(page, web_server_url) -> ExplorerPage:
    """
    Launches browser, navigates to local web explorer, and returns an ExplorerPage instance.
    """
    page.goto(f"{web_server_url}/index.html")
    explorer = ExplorerPage(page)
    explorer.wait_until_ready()
    return explorer

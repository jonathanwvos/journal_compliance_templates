@echo off
REM ==============================================================================
REM Universal GUI / Browser QA Test Runner (Windows CMD)
REM Usage: scripts	est_gui.bat [--headed]
REM ==============================================================================
setlocal

set SCRIPT_DIR=%~dp0
set REPO_ROOT=%SCRIPT_DIR%..
cd /d "%REPO_ROOT%"

echo === Running Journal Compliance GUI QA Test Suite ===

where uv >nul 2>nul
if %errorlevel% equ 0 (
    uv run pytest tests/gui/ -v %*
) else (
    pytest tests/gui/ -v %*
)

endlocal

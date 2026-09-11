@echo off
REM ==============================================================================
REM Universal Journal Compliance CLI Runner (Windows CMD)
REM Usage: scripts\jct.bat [serve|build|test|list]
REM ==============================================================================
setlocal

set SCRIPT_DIR=%~dp0
set REPO_ROOT=%SCRIPT_DIR%..
cd /d "%REPO_ROOT%"

where uv >nul 2>nul
if %errorlevel% equ 0 (
    uv run python -m journal_compliance_templates.cli %*
) else (
    python -m journal_compliance_templates.cli %*
)

endlocal

@echo off
REM ==============================================================================
REM Run Pytest suite for schema validation and numerical sanity (Windows CMD)
REM ==============================================================================
setlocal

set SCRIPT_DIR=%~dp0
set REPO_ROOT=%SCRIPT_DIR%..
cd /d "%REPO_ROOT%"

where uv >nul 2>nul
if %errorlevel% equ 0 (
    uv run pytest -v %*
) else (
    pytest -v %*
)

endlocal

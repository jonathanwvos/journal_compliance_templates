@echo off
REM ==============================================================================
REM Compile YAML templates to JSON and synchronize web assets (Windows CMD)
REM ==============================================================================
setlocal

set SCRIPT_DIR=%~dp0
set REPO_ROOT=%SCRIPT_DIR%..
cd /d "%REPO_ROOT%"

where uv >nul 2>nul
if %errorlevel% equ 0 (
    uv run python scripts\build_dist.py %*
) else (
    python scripts\build_dist.py %*
)

endlocal

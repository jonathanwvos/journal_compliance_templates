@echo off
REM ==============================================================================
REM Start local Journal Compliance Documentation Explorer Server (Windows CMD)
REM ==============================================================================
setlocal enabledelayedexpansion

set SCRIPT_DIR=%~dp0
set REPO_ROOT=%SCRIPT_DIR%..
cd /d "%REPO_ROOT%"

echo ==> Preparing Journal Compliance Explorer...

where uv >nul 2>nul
if %errorlevel% equ 0 (
    uv run python scripts\build_dist.py
) else (
    python scripts\build_dist.py
)

set PORT=%1
if "%PORT%"=="" set PORT=8000

echo.
echo ==========================================================
echo   Scientific Journal Compliance Explorer
echo   Opening in browser: http://localhost:%PORT%
echo   Press Ctrl+C to exit
echo ==========================================================
echo.

start http://localhost:%PORT%

cd /d "%REPO_ROOT%\web"
python -m http.server %PORT%

endlocal

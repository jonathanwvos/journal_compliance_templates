# ==============================================================================
# Universal GUI / Browser QA Test Runner (PowerShell)
# Usage: .\scripts	est_gui.ps1 [--headed]
# ==============================================================================
 = "Stop"
 = Split-Path -Parent .MyCommand.Path
 = Split-Path -Parent 
Set-Location 

Write-Host "=== Running Journal Compliance GUI QA Test Suite ===" -ForegroundColor Cyan

if (Get-Command uv -ErrorAction SilentlyContinue) {
    uv run pytest tests/gui/ -v 
} else {
    pytest tests/gui/ -v 
}

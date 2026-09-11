# ==============================================================================
# Start local Journal Compliance Documentation Explorer Server (PowerShell)
# ==============================================================================
param(
    [int]$Port = 8000
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Split-Path -Parent $ScriptDir
Set-Location $RepoRoot

Write-Host "==> Preparing Journal Compliance Explorer..." -ForegroundColor Cyan

if (Get-Command uv -ErrorAction SilentlyContinue) {
    uv run python scripts/build_dist.py
} else {
    python scripts/build_dist.py
}

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  Scientific Journal Compliance Explorer" -ForegroundColor Green
Write-Host "  Opening in browser: http://localhost:$Port" -ForegroundColor Green
Write-Host "  Press Ctrl+C to exit" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
Write-Host ""

Start-Process "http://localhost:$Port"

Set-Location "$RepoRoot/web"
python -m http.server $Port

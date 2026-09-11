# ==============================================================================
# Compile YAML templates to JSON and synchronize web assets (PowerShell)
# ==============================================================================
$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Split-Path -Parent $ScriptDir
Set-Location $RepoRoot

if (Get-Command uv -ErrorAction SilentlyContinue) {
    uv run python scripts/build_dist.py $args
} else {
    python scripts/build_dist.py $args
}

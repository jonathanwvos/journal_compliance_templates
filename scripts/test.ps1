# ==============================================================================
# Run Pytest suite for schema validation and numerical sanity (PowerShell)
# ==============================================================================
$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Split-Path -Parent $ScriptDir
Set-Location $RepoRoot

if (Get-Command uv -ErrorAction SilentlyContinue) {
    uv run pytest -v $args
} else {
    pytest -v $args
}

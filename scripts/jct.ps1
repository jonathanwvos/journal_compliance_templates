# ==============================================================================
# Universal Journal Compliance CLI Runner (PowerShell)
# Usage: .\scripts\jct.ps1 [serve|build|test|list]
# ==============================================================================
$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Split-Path -Parent $ScriptDir
Set-Location $RepoRoot

if (Get-Command uv -ErrorAction SilentlyContinue) {
    uv run python -m journal_compliance_templates.cli $args
} else {
    python -m journal_compliance_templates.cli $args
}

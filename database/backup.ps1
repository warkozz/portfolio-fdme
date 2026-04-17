# ============================================================
#  backup.ps1 — Sauvegarde complète de bts_portfolio
#  Portfolio BTS SIO
#
#  Usage : clic-droit > "Exécuter avec PowerShell"
#          ou : .\database\backup.ps1
#
#  Produit :
#    - database/install_with_data.sql   (écrasé à chaque backup)
#    - database/backups/backup_YYYY-MM-DD_HH-mm.sql  (horodaté)
# ============================================================

Set-Location $PSScriptRoot

$mysqldump   = "C:\xampp\mysql\bin\mysqldump.exe"
$mainOutput  = Join-Path $PSScriptRoot "install_with_data.sql"
$backupsDir  = Join-Path $PSScriptRoot "backups"
$timestamp   = Get-Date -Format "yyyy-MM-dd_HH-mm"
$snapOutput  = Join-Path $backupsDir "backup_$timestamp.sql"

# Vérifier MySQL
if (-not (Get-Process mysqld -ErrorAction SilentlyContinue)) {
    Write-Host "ERREUR : MySQL n'est pas en cours d'exécution. Lancez XAMPP d'abord." -ForegroundColor Red
    Read-Host "Entrée pour quitter"
    exit 1
}

# Créer le dossier backups/ si nécessaire
if (-not (Test-Path $backupsDir)) {
    New-Item -ItemType Directory -Path $backupsDir | Out-Null
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Sauvegarde de bts_portfolio" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Options mysqldump :
#   --databases          => inclut CREATE DATABASE + USE (portable sur autre poste)
#   --add-drop-database  => DROP DATABASE IF EXISTS avant CREATE (réinstall propre)
#   --add-drop-table     => DROP TABLE IF EXISTS avant chaque CREATE TABLE
#   --complete-insert    => INSERT avec noms de colonnes explicites
#   --single-transaction => snapshot cohérent sans verrouiller les tables
#   --default-character-set=utf8mb4 => encodage correct (accents, emojis)
#   --no-tablespaces     => évite l'erreur de droits sur information_schema
#   --result-file        => écriture directe sans passer par le pipe PowerShell
#                          (évite les problèmes BOM/encoding UTF-8 Windows)

$dumpArgs = @(
    "-u", "root",
    "--databases", "bts_portfolio",
    "--add-drop-database",
    "--add-drop-table",
    "--complete-insert",
    "--single-transaction",
    "--default-character-set=utf8mb4",
    "--no-tablespaces",
    "--result-file=$mainOutput"
)

Write-Host "[1/2] Export en cours..." -ForegroundColor Yellow
& $mysqldump @dumpArgs

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERREUR lors de mysqldump (code $LASTEXITCODE)" -ForegroundColor Red
    Read-Host "Entrée pour quitter"
    exit 1
}

Write-Host "  OK - install_with_data.sql mis à jour" -ForegroundColor Green

# Copie horodatée
Write-Host "[2/2] Copie horodatée..." -ForegroundColor Yellow
Copy-Item $mainOutput $snapOutput
Write-Host "  OK - backups\backup_$timestamp.sql" -ForegroundColor Green

Write-Host ""
$taille = [math]::Round((Get-Item $mainOutput).Length / 1MB, 2)
Write-Host "Taille du backup : $taille Mo" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pour restaurer sur un autre poste :" -ForegroundColor White
Write-Host "  .\database\install.ps1   (PowerShell)" -ForegroundColor Gray
Write-Host "  .\database\install.bat   (Invite de commandes)" -ForegroundColor Gray
Write-Host ""

Read-Host "Terminé. Entrée pour quitter"


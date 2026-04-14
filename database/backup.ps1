# Script de sauvegarde complète pour migration
# Portfolio BTS SIO - génère un seul fichier SQL prêt à importer

Set-Location $PSScriptRoot

Write-Host "Export complet de la base de données..." -ForegroundColor Cyan

try {
    & "C:\xampp\mysql\bin\mysqldump.exe" -u root --complete-insert --hex-blob --single-transaction bts_portfolio | Out-File -FilePath "install_with_data.sql" -Encoding UTF8
    Write-Host "OK - install_with_data.sql mis a jour" -ForegroundColor Green
} catch {
    Write-Host "ERREUR: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Entrée pour quitter"
    exit 1
}

Read-Host "Terminé. Entrée pour quitter"


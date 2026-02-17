# Script PowerShell de sauvegarde des données
# Portfolio BTS SIO

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Sauvegarde des données" -ForegroundColor Cyan
Write-Host "Portfolio BTS SIO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Ce script va exporter toutes vos données actuelles" -ForegroundColor White
Write-Host "(projets et veille) pour les sauvegarder." -ForegroundColor White
Write-Host ""
Write-Host "Les fichiers seront mis à jour:" -ForegroundColor Yellow
Write-Host "- data_projects.sql" -ForegroundColor Yellow
Write-Host "- data_veille.sql" -ForegroundColor Yellow
Write-Host ""
Read-Host "Appuyez sur Entrée pour continuer"

# Se déplacer dans le dossier du script
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "[1/2] Export des projets..." -ForegroundColor Yellow

try {
    & "C:\xampp\mysql\bin\mysqldump.exe" -u root --no-create-info --complete-insert --skip-extended-insert bts_portfolio projects | Out-File -FilePath "data_projects.sql" -Encoding UTF8
    Write-Host "✓ Projets exportés avec succès!" -ForegroundColor Green
} catch {
    Write-Host "✗ ERREUR: Impossible d'exporter les projets" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

Write-Host ""
Write-Host "[2/2] Export de la veille..." -ForegroundColor Yellow

try {
    & "C:\xampp\mysql\bin\mysqldump.exe" -u root --no-create-info --complete-insert --skip-extended-insert bts_portfolio veille | Out-File -FilePath "data_veille.sql" -Encoding UTF8
    Write-Host "✓ Veille exportée avec succès!" -ForegroundColor Green
} catch {
    Write-Host "✗ ERREUR: Impossible d'exporter la veille" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Sauvegarde terminée!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Fichiers mis à jour:" -ForegroundColor White
Write-Host "✓ data_projects.sql" -ForegroundColor Green
Write-Host "✓ data_veille.sql" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT:" -ForegroundColor Yellow
Write-Host "N'oubliez pas de mettre à jour le fichier" -ForegroundColor White
Write-Host "install_with_data.sql avec ces nouvelles données" -ForegroundColor White
Write-Host "si vous voulez les inclure dans les installations futures!" -ForegroundColor White
Write-Host ""
Write-Host "Consultez HOW_TO_BACKUP.md pour plus d'informations." -ForegroundColor Cyan
Write-Host ""
Read-Host "Appuyez sur Entrée pour quitter"

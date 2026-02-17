# Script PowerShell d'installation de la base de données
# Portfolio BTS SIO

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Installation de la base de données" -ForegroundColor Cyan
Write-Host "Portfolio BTS SIO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier que MySQL est en cours d'exécution
Write-Host "[1/3] Vérification de MySQL..." -ForegroundColor Yellow
$mysqlProcess = Get-Process mysqld -ErrorAction SilentlyContinue
if ($mysqlProcess) {
    Write-Host "✓ MySQL est en cours d'exécution" -ForegroundColor Green
} else {
    Write-Host "✗ ERREUR: MySQL n'est pas en cours d'exécution!" -ForegroundColor Red
    Write-Host "Veuillez démarrer MySQL depuis XAMPP Control Panel" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

Write-Host ""
Write-Host "[2/3] Création de la base de données..." -ForegroundColor Yellow

# Se déplacer dans le dossier du script
Set-Location $PSScriptRoot

# Supprimer l'ancienne base si elle existe et créer une nouvelle
try {
    & "C:\xampp\mysql\bin\mysql.exe" -u root -e "DROP DATABASE IF EXISTS bts_portfolio; CREATE DATABASE bts_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    Write-Host "✓ Base de données créée avec succès!" -ForegroundColor Green
} catch {
    Write-Host "✗ ERREUR: Impossible de créer la base de données" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

Write-Host ""
Write-Host "[3/3] Import des tables et données..." -ForegroundColor Yellow

# Exécuter le script d'installation complet
try {
    Get-Content "install_with_data.sql" | & "C:\xampp\mysql\bin\mysql.exe" -u root bts_portfolio
    Write-Host "✓ Données importées avec succès!" -ForegroundColor Green
} catch {
    Write-Host "✗ ERREUR: Impossible d'importer les données" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Installation terminée avec succès!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Base de données: bts_portfolio" -ForegroundColor White
Write-Host "Tables créées: admin, projects, veille" -ForegroundColor White
Write-Host "Projets importés: 10" -ForegroundColor White
Write-Host "Articles de veille importés: 8" -ForegroundColor White
Write-Host ""
Write-Host "N'oubliez pas de créer votre compte admin avec:" -ForegroundColor Yellow
Write-Host "  php server/init_admin.php" -ForegroundColor Cyan
Write-Host ""
Read-Host "Appuyez sur Entrée pour quitter"

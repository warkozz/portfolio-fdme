@echo off
echo ========================================
echo Sauvegarde des donnees
echo Portfolio BTS SIO
echo ========================================
echo.
echo Ce script va exporter toutes vos donnees actuelles
echo (projets et veille) pour les sauvegarder.
echo.
echo Les fichiers seront mis a jour:
echo - data_projects.sql
echo - data_veille.sql
echo.
pause

cd /d "%~dp0"

echo.
echo [1/2] Export des projets...
C:\xampp\mysql\bin\mysqldump.exe -u root --no-create-info --complete-insert --skip-extended-insert bts_portfolio projects > data_projects.sql

if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Impossible d'exporter les projets
    pause
    exit /b 1
)
echo Projets exportes avec succes!

echo.
echo [2/2] Export de la veille...
C:\xampp\mysql\bin\mysqldump.exe -u root --no-create-info --complete-insert --skip-extended-insert bts_portfolio veille > data_veille.sql

if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Impossible d'exporter la veille
    pause
    exit /b 1
)
echo Veille exportee avec succes!

echo.
echo ========================================
echo Sauvegarde terminee!
echo ========================================
echo.
echo Fichiers mis a jour:
echo - data_projects.sql
echo - data_veille.sql
echo.
echo IMPORTANT: N'oubliez pas de mettre a jour
echo le fichier install_with_data.sql avec ces nouvelles donnees
echo si vous voulez les inclure dans les installations futures!
echo.
pause

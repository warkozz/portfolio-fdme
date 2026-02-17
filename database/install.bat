@echo off
echo ========================================
echo Installation de la base de donnees
echo Portfolio BTS SIO
echo ========================================
echo.

REM Verifier que MySQL est en cours d'execution
echo [1/3] Verification de MySQL...
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo MySQL est en cours d'execution
) else (
    echo ERREUR: MySQL n'est pas en cours d'execution!
    echo Veuillez demarrer MySQL depuis XAMPP Control Panel
    pause
    exit /b 1
)

echo.
echo [2/3] Creation de la base de donnees...
cd /d "%~dp0"

REM Supprimer l'ancienne base si elle existe et creer une nouvelle
C:\xampp\mysql\bin\mysql.exe -u root -e "DROP DATABASE IF EXISTS bts_portfolio; CREATE DATABASE bts_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Impossible de creer la base de donnees
    pause
    exit /b 1
)

echo Base de donnees creee avec succes!
echo.
echo [3/3] Import des tables et donnees...

REM Executer le script d'installation complet
C:\xampp\mysql\bin\mysql.exe -u root bts_portfolio < install_with_data.sql

if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Impossible d'importer les donnees
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation terminee avec succes!
echo ========================================
echo.
echo Base de donnees: bts_portfolio
echo Tables creees: admin, projects, veille
echo Projets importes: 10
echo Articles de veille importes: 8
echo.
echo N'oubliez pas de creer votre compte admin avec:
echo   php server/init_admin.php
echo.
pause

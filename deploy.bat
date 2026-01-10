@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   Real Estate Project - Backup & Push
echo ========================================

:: Ask for commit message
set /p msg="Masukkan pesan commit (kosongkan untuk default): "
if "!msg!"=="" set msg="Update source code and backup"

:: Create timestamp for unique zip names
set "datestamp=%date:~10,4%%date:~4,2%%date:~7,2%"
set "timestamp=%time:~0,2%%time:~3,2%%time:~6,2%"
set "timestamp=%timestamp: =0%"
set "zipname=Backup_RealEstate_%datestamp%_%timestamp%.zip"

echo.
echo [1/3] Membuat Backup: %zipname%...
powershell -Command "Compress-Archive -Path src, public, index.html, package.json, vite.config.ts, tsconfig.json, tsconfig.node.json, eslint.config.js -DestinationPath %zipname% -Force"

echo.
echo [2/3] Menyiapkan Git Commit...
git add .
git reset *.zip
git commit -m "!msg!"

echo.
echo [3/3] Push ke GitHub...
git push origin main

echo.
echo ========================================
echo   SELESAI! Kode telah di-push dan dibackup.
echo ========================================
pause

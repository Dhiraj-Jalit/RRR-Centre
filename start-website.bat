@echo off
title RRR Centre - Butibori Nagar Parishad
cd /d "%~dp0"

echo ========================================================
echo   RRR Centre (Reduce, Reuse, Recycle)
echo   Butibori Nagar Parishad Initiative
echo ========================================================
echo.

:: Check if dependencies are installed, if not install them automatically
if not exist "node_modules\" (
    echo [First Time Setup] Installing dependencies. Please wait a minute...
    call npm install
    if errorlevel 1 (
        echo Error installing dependencies. Please ensure Node.js is installed.
        pause
        exit /b 1
    )
    echo Dependencies installed successfully!
    echo.
)

:: Automatically open default browser after a brief delay
echo Opening website in your browser...
start http://localhost:3000

:: Start the Vite server
echo Starting web server...
echo (You can minimize this window. Close it when you want to stop the website.)
echo.
npm run dev

pause

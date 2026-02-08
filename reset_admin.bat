@echo off
echo Navigating to backend server...
cd /d "d:\Subho\2026\QuadraIlearn\server"

echo Running password reset script...
.\venv\Scripts\python.exe reset_admin_password.py

echo.
echo Done.
pause

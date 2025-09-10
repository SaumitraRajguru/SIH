@echo off
echo Starting Career Advisor Development Environment...

echo.
echo Starting Django Backend...
start "Django Backend" cmd /k "cd /d %~dp0 && .venv\Scripts\activate && python manage.py runserver"

echo.
echo Starting React Frontend...
start "React Frontend" cmd /k "cd /d %~dp0CareerPathFinder && npm run dev:frontend"

echo.
echo Both servers are starting...
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window...
pause >nul

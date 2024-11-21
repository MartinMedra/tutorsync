@echo off
start cmd /k "npm run dev"
cd frontend
start cmd /k "npm run dev"

timeout /t 5 >nul
start http://localhost:5173
pause
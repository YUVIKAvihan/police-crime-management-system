@echo off
echo 🏛️  SPRINGFIELD POLICE DEPARTMENT
echo 🚀 Starting Crime Management System...
echo ================================================

echo.
echo 🔧 Starting Backend Server...
start "Backend Server" cmd /k "cd server && npm run dev"

timeout /t 3 /nobreak >nul

echo 🎨 Starting Frontend Server...
start "Frontend Server" cmd /k "cd client && npm run dev"

echo.
echo ✅ System Starting Up...
echo.
echo 📍 Frontend will be available at: http://localhost:8082
echo 📍 Backend API available at: http://localhost:5001
echo.
echo 👤 Login Credentials:
echo    Admin: admin@police.gov / admin123
echo    Officer: john.smith@police.gov / officer123
echo.
echo 💡 Admin users are created automatically on startup!
echo.
pause
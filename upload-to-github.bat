@echo off
echo 🚀 Springfield Police Department - Crime Management System
echo 📤 GitHub Upload Script
echo ================================================

echo.
echo 🔧 Step 1: Initializing Git Repository...
git init

echo.
echo 📁 Step 2: Adding all files...
git add .

echo.
echo 💾 Step 3: Creating initial commit...
git commit -m "Initial commit: Springfield Police Department Crime Management System"

echo.
echo 🌐 Step 4: Setting up GitHub remote...
echo Please create a repository on GitHub first, then run:
echo git remote add origin https://github.com/YOURUSERNAME/police-crime-management-system.git
echo git branch -M main
echo git push -u origin main

echo.
echo ✅ Git repository initialized successfully!
echo.
echo 📋 Next steps:
echo 1. Go to https://github.com and create a new repository
echo 2. Name it: police-crime-management-system
echo 3. Make it public
echo 4. Don't initialize with README
echo 5. Copy the repository URL
echo 6. Run the commands shown above with your username

pause
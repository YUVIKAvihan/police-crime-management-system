# 🎯 VS Code Setup Guide - Police Crime Management System

## 🚀 **How to Run in VS Code**

### **📁 Step 1: Open Project in VS Code**
1. Open VS Code
2. File → Open Folder
3. Select your `crime-management-system` folder
4. VS Code will detect the configuration automatically

### **⚡ Step 2: Quick Start Methods**

#### **🎯 Method 1: Using Command Palette (Easiest)**
1. Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
2. Type: `Tasks: Run Task`
3. Select: `🚀 Start Full Police System`
4. Both servers will start automatically!

#### **🎯 Method 2: Using Debug Panel**
1. Go to **Run and Debug** panel (`Ctrl+Shift+D`)
2. Select: `🚀 Start Full Police System`
3. Click the **Play button** ▶️
4. Both servers start with debugging enabled

#### **🎯 Method 3: Using Terminal**
1. Open VS Code terminal (`Ctrl+` ` or View → Terminal)
2. **Backend Terminal:**
   ```bash
   cd server
   npm run dev
   ```
3. **New Terminal** (`Ctrl+Shift+` `)
4. **Frontend Terminal:**
   ```bash
   cd client
   npm run dev
   ```

### **📋 Step 3: Available VS Code Tasks**

Press `Ctrl+Shift+P` → `Tasks: Run Task` → Choose:

- **🚀 Start Full Police System** - Starts both servers
- **🚔 Start Backend Dev Server** - Backend only
- **🎨 Start Frontend Dev Server** - Frontend only
- **📦 Install All Dependencies** - Install packages
- **🌱 Seed Database** - Add sample data

### **🔧 Step 4: VS Code Features**

#### **🐛 Debugging**
- Set breakpoints in your code
- Use F5 to start debugging
- Inspect variables and step through code

#### **🔍 IntelliSense**
- Auto-completion for JavaScript/React
- Error highlighting
- Import suggestions

#### **🎨 Extensions (Auto-suggested)**
- **Tailwind CSS IntelliSense** - CSS class suggestions
- **Prettier** - Code formatting
- **MongoDB** - Database management
- **Node.js Extension Pack** - Node.js tools

### **📊 Step 5: Project Structure in VS Code**

```
📁 CRIME-MANAGEMENT-SYSTEM/
├── 📁 .vscode/              # VS Code configuration
│   ├── launch.json          # Debug configurations
│   ├── tasks.json           # Task definitions
│   ├── settings.json        # Workspace settings
│   └── extensions.json      # Recommended extensions
├── 📁 client/               # React frontend
├── 📁 server/               # Node.js backend
├── 📁 screenshots/          # App screenshots
└── 📄 VSCODE-GUIDE.md       # This guide
```

### **🌐 Step 6: Access Your Application**

After starting the servers:
- **Frontend:** http://localhost:8081
- **Backend API:** http://localhost:5001
- **Login:** admin@police.gov / admin123

### **💡 VS Code Tips**

#### **🔥 Useful Shortcuts**
- `Ctrl+` ` - Toggle terminal
- `Ctrl+Shift+` ` - New terminal
- `Ctrl+Shift+P` - Command palette
- `Ctrl+Shift+D` - Debug panel
- `F5` - Start debugging
- `Ctrl+F5` - Run without debugging

#### **📁 File Navigation**
- `Ctrl+P` - Quick file search
- `Ctrl+Shift+E` - Explorer panel
- `Ctrl+Shift+F` - Global search

#### **🔧 Development**
- `F12` - Go to definition
- `Alt+Shift+F` - Format document
- `Ctrl+/` - Toggle comment

### **🚨 Troubleshooting**

#### **Problem: Port Already in Use**
- **Solution:** Stop running processes in terminal (`Ctrl+C`)
- Or use VS Code task: `Terminal → Kill All Tasks`

#### **Problem: Dependencies Missing**
- **Solution:** Run task `📦 Install All Dependencies`
- Or manually: `npm install` in both client and server folders

#### **Problem: Environment Variables**
- **Solution:** Check `server/.env` file exists
- Restart VS Code if needed

### **🎯 Quick Start Checklist**

- [ ] Open project folder in VS Code
- [ ] Install recommended extensions (VS Code will prompt)
- [ ] Run task: `🚀 Start Full Police System`
- [ ] Wait for servers to start (check terminal output)
- [ ] Open http://localhost:8081
- [ ] Login with admin@police.gov / admin123

---

**🎉 Your Professional Police Crime Management System is now running in VS Code!**
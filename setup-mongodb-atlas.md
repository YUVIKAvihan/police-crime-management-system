# 🌐 Setup MongoDB Atlas (Persistent Database)

## 🎯 **Why Use MongoDB Atlas?**
- ✅ **Data persists forever** (never loses login credentials)
- ✅ **Free tier available** (512MB storage)
- ✅ **Cloud-based** (accessible from anywhere)
- ✅ **Professional setup** (like real applications)

## 📋 **Step-by-Step Setup:**

### **1. Create MongoDB Atlas Account**
1. Go to: https://www.mongodb.com/atlas
2. Click "Try Free"
3. Sign up with email or Google account

### **2. Create a Cluster**
1. Choose "M0 Sandbox" (FREE)
2. Select a cloud provider (AWS recommended)
3. Choose region closest to you
4. Cluster name: "crime-management"
5. Click "Create Cluster"

### **3. Create Database User**
1. Go to "Database Access" in left menu
2. Click "Add New Database User"
3. Username: `crimeadmin`
4. Password: `CrimeDB123!` (or generate secure password)
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"

### **4. Configure Network Access**
1. Go to "Network Access" in left menu
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### **5. Get Connection String**
1. Go to "Clusters" in left menu
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. It looks like: `mongodb+srv://crimeadmin:<password>@crime-management.xxxxx.mongodb.net/`

### **6. Update Your .env File**
Replace the MongoDB URI in `server/.env`:

```env
# Replace this line:
MONGODB_URI=mongodb://localhost:27017/crime-management

# With your Atlas connection string:
MONGODB_URI=mongodb+srv://crimeadmin:CrimeDB123!@crime-management.xxxxx.mongodb.net/crime-management
```

### **7. Restart Your Server**
```bash
# Stop current server (Ctrl+C)
# Then restart:
cd server
npm run dev
```

## ✅ **Benefits After Setup:**
- 🔒 **Login credentials persist forever**
- 💾 **All crime data saved permanently**
- 🌐 **Access from any computer**
- 🚀 **Ready for deployment**
- 📊 **Professional database setup**

## 🔧 **Quick Setup Commands:**
```bash
# 1. Update .env with Atlas connection string
# 2. Restart server
cd server
npm run dev

# 3. The admin user will be created automatically!
```

## 📞 **Need Help?**
If you encounter issues:
1. Double-check the connection string format
2. Ensure password doesn't contain special characters that need encoding
3. Verify network access is configured for "0.0.0.0/0"
4. Check that database user has proper permissions
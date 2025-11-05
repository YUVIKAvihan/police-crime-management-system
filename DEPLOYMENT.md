# 🚀 Deployment Guide

## 📋 **Pre-Deployment Checklist**

### **1. Environment Setup**
- [ ] MongoDB Atlas account created
- [ ] Environment variables configured
- [ ] Build process tested locally
- [ ] All dependencies installed

### **2. Security Review**
- [ ] JWT secret is strong and unique
- [ ] Database credentials are secure
- [ ] CORS settings are properly configured
- [ ] File upload restrictions are in place

## 🌐 **Frontend Deployment (Vercel)**

### **Step 1: Prepare Frontend**
```bash
cd client
npm run build
```

### **Step 2: Deploy to Vercel**
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`
4. Configure environment variables in Vercel dashboard

### **Environment Variables for Vercel:**
```
VITE_API_URL=https://your-backend-url.herokuapp.com
```

## 🖥️ **Backend Deployment (Railway/Heroku)**

### **Option 1: Railway**
1. Connect GitHub repository
2. Select server folder as root
3. Configure environment variables
4. Deploy automatically

### **Option 2: Heroku**
```bash
# Install Heroku CLI
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-atlas-uri
heroku config:set JWT_SECRET=your-secret
git subtree push --prefix server heroku main
```

### **Environment Variables for Production:**
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crime-management
JWT_SECRET=your-super-secure-jwt-secret-key
```

## 🗄️ **Database Setup (MongoDB Atlas)**

### **Step 1: Create Cluster**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all)

### **Step 2: Get Connection String**
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` with your database password

### **Step 3: Seed Production Database**
```bash
# Set production MongoDB URI in .env
npm run seed
```

## 🔧 **Full Stack Deployment (Single Platform)**

### **Render (Recommended)**
1. Connect GitHub repository
2. Create web service for backend
3. Create static site for frontend
4. Configure environment variables
5. Set build and start commands

**Backend Service:**
- Build Command: `npm install`
- Start Command: `npm start`
- Root Directory: `server`

**Frontend Service:**
- Build Command: `npm run build`
- Publish Directory: `client/dist`
- Root Directory: `client`

## 🌍 **Custom Domain Setup**

### **1. Configure DNS**
- Add CNAME record pointing to your deployment URL
- Configure SSL certificate

### **2. Update CORS Settings**
```javascript
// server/server.js
app.use(cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true
}));
```

## 📊 **Monitoring & Analytics**

### **1. Error Tracking**
- Set up Sentry for error monitoring
- Configure logging for production

### **2. Performance Monitoring**
- Use MongoDB Atlas monitoring
- Set up uptime monitoring

### **3. Analytics**
- Google Analytics for frontend
- API usage analytics for backend

## 🔒 **Security Considerations**

### **1. Environment Variables**
- Never commit .env files
- Use strong, unique secrets
- Rotate secrets regularly

### **2. Database Security**
- Use MongoDB Atlas IP whitelist
- Enable database authentication
- Regular security updates

### **3. Application Security**
- Keep dependencies updated
- Use HTTPS everywhere
- Implement rate limiting

## 🚨 **Troubleshooting**

### **Common Issues:**

**1. CORS Errors**
```javascript
// Fix: Update CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
```

**2. Database Connection Issues**
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure database user has proper permissions

**3. File Upload Issues**
- Configure cloud storage (AWS S3, Cloudinary)
- Update file paths for production

**4. Build Failures**
- Check Node.js version compatibility
- Verify all dependencies are listed
- Clear npm cache: `npm cache clean --force`

## 📱 **Mobile Optimization**

### **PWA Setup (Optional)**
1. Add service worker
2. Create manifest.json
3. Configure offline functionality

## 🔄 **CI/CD Pipeline**

### **GitHub Actions Example:**
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm run install-all
      - name: Build frontend
        run: npm run build
      - name: Deploy
        run: # Your deployment commands
```

## 📞 **Support**

For deployment issues:
1. Check the troubleshooting section
2. Review platform-specific documentation
3. Open an issue on GitHub
4. Contact the development team

---

**🎯 Goal:** Make your police crime management system accessible to the world while maintaining security and performance standards.
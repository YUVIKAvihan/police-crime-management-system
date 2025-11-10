# 🇮🇳 भारतीय पुलिस विभाग | Indian Police Department - Crime Management System

A comprehensive full-stack web application for Indian law enforcement agencies to manage crime records, criminal profiles, and evidence files. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js) with bilingual support (Hindi & English).

![Police System](https://img.shields.io/badge/System-Police%20Department-blue?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

## 🚔 **Live Demo**

**Demo URL:** [Your deployed URL here]

**Demo Credentials:**
- **Administrator:** admin@police.gov / admin123
- **Officer:** john.smith@police.gov / officer123

## 📸 **Screenshots**

### Login Portal
![Login Screen](screenshots/login.png)

### Command Dashboard
![Dashboard](screenshots/dashboard.png)

### Crime Management
![Crime Records](screenshots/crimes.png)

## 🎯 **Features**

### 🔐 **Authentication & Security**
- JWT-based authentication system
- Role-based access control (Administrator/Officer)
- Secure password hashing with bcrypt
- Session management with automatic logout
- Input validation and sanitization

### 🚨 **Crime Management**
- Complete CRUD operations for crime records
- Evidence file upload system (images, documents)
- Advanced search and filtering capabilities
- Automatic case number generation
- Status tracking (Open, Under Investigation, Closed)
- Priority levels (Low, Medium, High, Critical)
- Victim and suspect management

### 👤 **Criminal Database**
- Criminal profile management with photo uploads
- Previous crime history tracking
- Address and identification details
- Status tracking (Active, Imprisoned, Deceased, Unknown)
- Link criminals to multiple crime cases

### 📊 **Analytics Dashboard**
- Real-time crime statistics
- Crime type distribution charts
- Case status summaries
- Recent activity tracking
- Professional police-themed interface

### 🎨 **Professional UI/UX**
- Police department themed design
- Mobile-responsive interface
- Toast notifications for user feedback
- Loading states and error handling
- Print-friendly pages
- Accessibility compliant

## 🛠️ **Technology Stack**

### **Frontend**
- **React.js** - User interface library
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Hook Form** - Form handling and validation
- **React Hot Toast** - Notification system
- **Lucide React** - Icon library

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Multer** - File upload middleware
- **Express Validator** - Input validation

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/police-crime-management.git
cd police-crime-management
```

2. **Automated Setup**
```bash
node setup.js
```

3. **Manual Setup (Alternative)**

**Backend Setup:**
```bash
cd server
npm install
```

Create `.env` file in server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crime-management
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

**Frontend Setup:**
```bash
cd client
npm install
```

4. **Start the Application**

**Backend (Terminal 1):**
```bash
cd server
npm run dev
```

**Frontend (Terminal 2):**
```bash
cd client
npm run dev
```

5. **Seed Sample Data (Optional)**
```bash
cd server
npm run seed
```

6. **Access the Application**
- Frontend: http://localhost:8081
- Backend API: http://localhost:5000

## 📁 **Project Structure**

```
police-crime-management/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Auth)
│   │   ├── pages/          # Page components
│   │   └── index.css       # Global styles
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── config/            # Database configuration
│   ├── middleware/        # Custom middleware
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── scripts/          # Utility scripts
│   ├── uploads/          # File storage
│   └── package.json
├── screenshots/          # Application screenshots
├── setup.js             # Automated setup script
└── README.md
```

## 🔧 **API Endpoints**

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### **Crimes**
- `GET /api/crimes` - Get all crimes (with filtering)
- `POST /api/crimes` - Create new crime
- `GET /api/crimes/:id` - Get crime by ID
- `PUT /api/crimes/:id` - Update crime
- `DELETE /api/crimes/:id` - Delete crime
- `GET /api/crimes/stats` - Get crime statistics

### **Criminals**
- `GET /api/criminals` - Get all criminals (with filtering)
- `POST /api/criminals` - Create new criminal
- `GET /api/criminals/:id` - Get criminal by ID
- `PUT /api/criminals/:id` - Update criminal
- `DELETE /api/criminals/:id` - Delete criminal

### **Users**
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (Admin only)

## 🔒 **Security Features**

- **Password Security:** bcrypt hashing with salt rounds
- **Authentication:** JWT tokens with expiration
- **Authorization:** Role-based access control
- **Input Validation:** Server-side validation for all inputs
- **File Upload Security:** File type and size restrictions
- **CORS Protection:** Configured for secure cross-origin requests
- **Error Handling:** Comprehensive error handling and logging

## 🌐 **Deployment**

### **Frontend (Vercel/Netlify)**
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables

### **Backend (Heroku/Railway)**
1. Set up MongoDB Atlas for cloud database
2. Configure environment variables
3. Deploy server folder to your hosting service

### **Environment Variables**
```env
# Production
NODE_ENV=production
PORT=5000
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-super-secure-jwt-secret
```

## 📊 **Database Schema**

### **User Model**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ['admin', 'officer'],
  station: String,
  badgeNumber: String
}
```

### **Crime Model**
```javascript
{
  title: String,
  type: ['murder', 'theft', 'cybercrime', ...],
  description: String,
  location: { address, city, state },
  date: Date,
  status: ['open', 'under_investigation', 'closed'],
  officerInCharge: ObjectId (ref: User),
  suspects: [ObjectId] (ref: Criminal),
  victims: [Object],
  evidence: [Object],
  priority: ['low', 'medium', 'high', 'critical'],
  caseNumber: String (auto-generated)
}
```

### **Criminal Model**
```javascript
{
  name: String,
  age: Number,
  gender: ['male', 'female', 'other'],
  address: Object,
  photo: String,
  previousCrimes: [String],
  crimeRecords: [ObjectId] (ref: Crime),
  identificationMarks: String,
  status: ['active', 'imprisoned', 'deceased', 'unknown']
}
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 **Author**

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 **Acknowledgments**

- Springfield Police Department (Fictional) for inspiration
- React.js community for excellent documentation
- TailwindCSS for the utility-first CSS framework
- MongoDB for the flexible NoSQL database

## 📞 **Support**

If you have any questions or need help with setup, please open an issue or contact the development team.

---

**⚠️ Disclaimer:** This is a demonstration project for educational purposes. It is not intended for actual law enforcement use without proper security audits and compliance checks.

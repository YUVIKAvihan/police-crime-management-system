import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.email, formData.password);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900">
      {/* Indian Flag Stripe */}
      <div className="indian-flag-stripe h-2"></div>

      {/* Police Header Banner */}
      <div className="police-header py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="police-badge rounded-full p-3">
                <Shield className="h-12 w-12 text-yellow-400" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🇮🇳</span>
                  <h1 className="text-2xl font-bold">भारतीय पुलिस विभाग</h1>
                </div>
                <h1 className="text-xl font-bold text-yellow-400">INDIAN POLICE DEPARTMENT</h1>
                <p className="text-sm text-blue-200">सेवा और सुरक्षा | Serving and Protecting the Nation</p>
              </div>
            </div>
            <div className="text-right bg-blue-800 bg-opacity-50 rounded-lg p-3 border border-yellow-400">
              <p className="text-sm font-bold text-yellow-400">आपातकाल | EMERGENCY</p>
              <p className="text-2xl font-bold text-white">100</p>
              <p className="text-xs text-blue-200">महिला हेल्पलाइन | Women: 1091</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-2xl p-8 border-t-8 border-blue-600 relative overflow-hidden">
            {/* Indian Flag Corner Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 indian-flag-stripe opacity-20 rounded-bl-full"></div>

            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="police-badge p-4 rounded-full shadow-lg">
                  <Shield className="h-16 w-16 text-yellow-400" />
                </div>
              </div>
              <div className="text-4xl mb-2">🇮🇳</div>
              <h2 className="text-2xl font-bold text-gray-900">
                सुरक्षित प्रवेश पोर्टल
              </h2>
              <p className="mt-1 text-xl font-bold text-blue-900">
                SECURE ACCESS PORTAL
              </p>
              <p className="mt-2 text-lg font-semibold text-blue-800">
                Crime Records Management System
              </p>
              <div className="mt-3 bg-red-50 border border-red-200 rounded-md p-2">
                <p className="text-sm font-medium text-red-800">
                  🔒 केवल अधिकृत कर्मियों के लिए | AUTHORIZED PERSONNEL ONLY
                </p>
                <p className="text-xs text-red-600">
                  अनधिकृत पहुंच निषिद्ध है | Unauthorized access prohibited
                </p>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    👤 अधिकारी ईमेल | OFFICER EMAIL ADDRESS
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input-field"
                    placeholder="officer@police.gov"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    🔐 सुरक्षित पासवर्ड | SECURE PASSWORD
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="input-field pr-10"
                      placeholder="Enter secure password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 hover:from-blue-800 hover:via-blue-900 hover:to-blue-950 text-white py-3 text-lg font-bold uppercase tracking-wide rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  {loading ? '🔄 प्रमाणीकरण | AUTHENTICATING...' : '🔓 सुरक्षित लॉगिन | SECURE LOGIN'}
                </button>
              </div>

              <div className="text-center">
                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-md p-4 mb-4">
                  <p className="text-sm font-bold text-yellow-800 mb-2">⚠️ DEMO SYSTEM CREDENTIALS</p>
                  <div className="space-y-1">
                    <p className="text-sm text-yellow-700 font-medium">
                      👨‍💼 Admin: admin@police.gov / admin123
                    </p>
                    <p className="text-sm text-yellow-700 font-medium">
                      👮‍♂️ Officer: john.smith@police.gov / officer123
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-md p-3">
                  <p className="text-xs text-gray-600 font-medium">
                    © 2024 Springfield Police Department
                  </p>
                  <p className="text-xs text-gray-500">
                    All access attempts are logged and monitored
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
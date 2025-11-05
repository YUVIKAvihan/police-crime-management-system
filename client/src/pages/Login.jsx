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
      {/* Police Header Banner */}
      <div className="police-header py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-10 w-10 text-yellow-400" />
              <div>
                <h1 className="text-xl font-bold">SPRINGFIELD POLICE DEPARTMENT</h1>
                <p className="text-sm text-blue-200">Serving and Protecting Since 1885</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-200">Emergency: 911</p>
              <p className="text-xs text-blue-300">Non-Emergency: (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-2xl p-8 border-t-4 border-blue-600">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Shield className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                SECURE ACCESS PORTAL
              </h2>
              <p className="mt-2 text-lg font-semibold text-blue-800">
                Crime Records Management System
              </p>
              <div className="mt-3 bg-red-50 border border-red-200 rounded-md p-2">
                <p className="text-sm font-medium text-red-800">
                  🔒 AUTHORIZED PERSONNEL ONLY
                </p>
                <p className="text-xs text-red-600">
                  Unauthorized access is prohibited and monitored
                </p>
              </div>
            </div>
        
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    👤 OFFICER EMAIL ADDRESS
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
                    🔐 SECURE PASSWORD
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
                  className="w-full btn-primary py-3 text-lg font-bold uppercase tracking-wide"
                >
                  {loading ? '🔄 AUTHENTICATING...' : '🔓 SECURE LOGIN'}
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
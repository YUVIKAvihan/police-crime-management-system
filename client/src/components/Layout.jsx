import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  FileText, 
  Users, 
  User, 
  LogOut, 
  Menu, 
  X,
  Shield,
  Plus
} from 'lucide-react';

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Crimes', href: '/crimes', icon: FileText },
    { name: 'Criminals', href: '/criminals', icon: Users },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col police-sidebar">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-700">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-yellow-400" />
              <div className="ml-2">
                <span className="text-lg font-bold text-white">SPD PORTAL</span>
                <div className="text-xs text-gray-300">Crime Records System</div>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-2 px-3 py-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-semibold rounded-md transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow police-sidebar">
          <div className="flex items-center h-16 px-4 border-b border-gray-700">
            <Shield className="h-8 w-8 text-yellow-400" />
            <div className="ml-2">
              <span className="text-lg font-bold text-white">SPD PORTAL</span>
              <div className="text-xs text-gray-300">Crime Records System</div>
            </div>
          </div>
          <nav className="flex-1 space-y-2 px-3 py-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-semibold rounded-md transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 police-header shadow-lg border-b-2 border-yellow-400">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-white">
                  <span className="font-bold">{user?.name}</span>
                  <span className="ml-2 px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                    {user?.role === 'admin' ? 'ADMIN' : 'OFFICER'}
                  </span>
                </div>
                <div className="text-xs text-blue-200">
                  {user?.station} • Badge #{user?.badgeNumber || 'N/A'}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-white hover:text-yellow-400 transition-colors duration-200"
                title="Secure Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Floating Action Button for adding new items */}
      {(location.pathname === '/crimes' || location.pathname === '/criminals') && (
        <Link
          to={location.pathname === '/crimes' ? '/crimes/add' : '/criminals/add'}
          className="fixed bottom-6 right-6 bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-full shadow-2xl transition-all duration-200 hover:scale-110"
          title={location.pathname === '/crimes' ? 'Add New Crime' : 'Add New Criminal'}
        >
          <Plus className="h-6 w-6" />
        </Link>
      )}
      
      {/* Police Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-6 w-6 text-yellow-400" />
              <div>
                <p className="text-sm font-semibold">Springfield Police Department</p>
                <p className="text-xs text-gray-400">Crime Records Management System v2.0</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Emergency: 911 | Non-Emergency: (555) 123-4567</p>
              <p className="text-xs text-gray-500">© 2024 SPD. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
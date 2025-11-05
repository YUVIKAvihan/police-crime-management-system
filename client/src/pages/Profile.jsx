import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { User, Shield, MapPin, Badge } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      station: user?.station || '',
      badgeNumber: user?.badgeNumber || ''
    }
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    await updateProfile(data);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
          <User className="h-8 w-8 text-primary-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
          <p className="text-gray-500">
            {user?.role === 'admin' ? 'Administrator' : 'Police Officer'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="input-field bg-gray-50"
                    value={user?.email || ''}
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Station
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    {...register('station', { required: 'Station is required' })}
                  />
                  {errors.station && (
                    <p className="text-red-500 text-sm mt-1">{errors.station.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Badge Number
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    {...register('badgeNumber')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    className="input-field bg-gray-50"
                    value={user?.role === 'admin' ? 'Administrator' : 'Police Officer'}
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Role cannot be changed</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Account Details */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Role</p>
                  <p className="text-sm text-gray-500">
                    {user?.role === 'admin' ? 'Administrator' : 'Police Officer'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Station</p>
                  <p className="text-sm text-gray-500">{user?.station}</p>
                </div>
              </div>
              
              {user?.badgeNumber && (
                <div className="flex items-center space-x-3">
                  <Badge className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Badge Number</p>
                    <p className="text-sm text-gray-500">{user.badgeNumber}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Member Since</p>
                  <p className="text-sm text-gray-500">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Password</p>
                  <p className="text-sm text-gray-500">Last changed recently</p>
                </div>
                <button className="btn-secondary text-sm">
                  Change
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Not enabled</p>
                </div>
                <button className="btn-secondary text-sm">
                  Enable
                </button>
              </div>
            </div>
          </div>

          {/* Permissions */}
          {user?.role === 'admin' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Admin Permissions</h2>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Manage Users</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Delete Records</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">System Settings</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Enabled</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
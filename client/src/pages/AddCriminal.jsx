import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrowLeft, Upload, X } from 'lucide-react';

const AddCriminal = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [previousCrimes, setPreviousCrimes] = useState(['']);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      
      // Add form fields
      Object.keys(data).forEach(key => {
        if (key.startsWith('address.')) {
          const addressKey = key.split('.')[1];
          formData.append(`address[${addressKey}]`, data[key]);
        } else {
          formData.append(key, data[key]);
        }
      });
      
      // Add previous crimes (filter out empty ones)
      const validPreviousCrimes = previousCrimes.filter(crime => crime.trim());
      formData.append('previousCrimes', JSON.stringify(validPreviousCrimes));
      
      // Add photo file
      if (photoFile) {
        formData.append('photo', photoFile);
      }

      const response = await axios.post('/api/criminals', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Criminal profile created successfully!');
      navigate('/criminals');
    } catch (error) {
      console.error('Error creating criminal:', error);
      toast.error(error.response?.data?.message || 'Failed to create criminal profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const addPreviousCrime = () => {
    setPreviousCrimes(prev => [...prev, '']);
  };

  const removePreviousCrime = (index) => {
    if (previousCrimes.length > 1) {
      setPreviousCrimes(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updatePreviousCrime = (index, value) => {
    setPreviousCrimes(prev => prev.map((crime, i) => 
      i === index ? value : crime
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/criminals')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Add New Criminal</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
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
                Age *
              </label>
              <input
                type="number"
                min="1"
                max="120"
                className="input-field"
                {...register('age', { 
                  required: 'Age is required',
                  min: { value: 1, message: 'Age must be at least 1' },
                  max: { value: 120, message: 'Age must be less than 120' }
                })}
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <select
                className="input-field"
                {...register('gender', { required: 'Gender is required' })}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="input-field"
                {...register('status')}
              >
                <option value="active">Active</option>
                <option value="imprisoned">Imprisoned</option>
                <option value="deceased">Deceased</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Identification Marks
              </label>
              <textarea
                rows={3}
                className="input-field"
                placeholder="Scars, tattoos, birthmarks, etc."
                {...register('identificationMarks')}
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                className="input-field"
                {...register('address.street')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                className="input-field"
                {...register('address.city', { required: 'City is required' })}
              />
              {errors.address?.city && (
                <p className="text-red-500 text-sm mt-1">{errors.address.city.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <input
                type="text"
                className="input-field"
                {...register('address.state', { required: 'State is required' })}
              />
              {errors.address?.state && (
                <p className="text-red-500 text-sm mt-1">{errors.address.state.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                className="input-field"
                {...register('address.zipCode')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                className="input-field"
                defaultValue="USA"
                {...register('address.country')}
              />
            </div>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Photo</h2>
          
          {photoPreview ? (
            <div className="flex items-center space-x-4">
              <img
                src={photoPreview}
                alt="Preview"
                className="h-32 w-32 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm text-gray-600 mb-2">Photo selected: {photoFile?.name}</p>
                <button
                  type="button"
                  onClick={removePhoto}
                  className="btn-secondary text-sm"
                >
                  Remove Photo
                </button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="photo" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Upload photo
                    </span>
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="mt-1 text-sm text-gray-500">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Previous Crimes */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Previous Crimes</h2>
            <button
              type="button"
              onClick={addPreviousCrime}
              className="btn-secondary text-sm"
            >
              Add Crime
            </button>
          </div>
          
          <div className="space-y-3">
            {previousCrimes.map((crime, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  className="input-field flex-1"
                  placeholder="Enter previous crime description"
                  value={crime}
                  onChange={(e) => updatePreviousCrime(index, e.target.value)}
                />
                {previousCrimes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePreviousCrime(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/criminals')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Criminal Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCriminal;
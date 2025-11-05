import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrowLeft, Upload, X } from 'lucide-react';

const AddCrime = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [victims, setVictims] = useState([{ name: '', age: '', gender: '', contact: '', address: '' }]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      
      // Add form fields
      Object.keys(data).forEach(key => {
        if (key.startsWith('location.')) {
          const locationKey = key.split('.')[1];
          formData.append(`location[${locationKey}]`, data[key]);
        } else {
          formData.append(key, data[key]);
        }
      });
      
      // Add victims
      formData.append('victims', JSON.stringify(victims.filter(v => v.name.trim())));
      
      // Add evidence files
      evidenceFiles.forEach(file => {
        formData.append('evidence', file);
      });

      const response = await axios.post('/api/crimes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Crime record created successfully!');
      navigate('/crimes');
    } catch (error) {
      console.error('Error creating crime:', error);
      toast.error(error.response?.data?.message || 'Failed to create crime record');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setEvidenceFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setEvidenceFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addVictim = () => {
    setVictims(prev => [...prev, { name: '', age: '', gender: '', contact: '', address: '' }]);
  };

  const removeVictim = (index) => {
    if (victims.length > 1) {
      setVictims(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateVictim = (index, field, value) => {
    setVictims(prev => prev.map((victim, i) => 
      i === index ? { ...victim, [field]: value } : victim
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/crimes')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Add New Crime</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Crime Title *
              </label>
              <input
                type="text"
                className="input-field"
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Crime Type *
              </label>
              <select
                className="input-field"
                {...register('type', { required: 'Type is required' })}
              >
                <option value="">Select Type</option>
                <option value="murder">Murder</option>
                <option value="theft">Theft</option>
                <option value="cybercrime">Cybercrime</option>
                <option value="assault">Assault</option>
                <option value="fraud">Fraud</option>
                <option value="burglary">Burglary</option>
                <option value="robbery">Robbery</option>
                <option value="vandalism">Vandalism</option>
                <option value="drug_offense">Drug Offense</option>
                <option value="other">Other</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                rows={4}
                className="input-field"
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Crime *
              </label>
              <input
                type="date"
                className="input-field"
                {...register('date', { required: 'Date is required' })}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                className="input-field"
                {...register('priority')}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Location Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <input
                type="text"
                className="input-field"
                {...register('location.address', { required: 'Address is required' })}
              />
              {errors.location?.address && (
                <p className="text-red-500 text-sm mt-1">{errors.location.address.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                className="input-field"
                {...register('location.city', { required: 'City is required' })}
              />
              {errors.location?.city && (
                <p className="text-red-500 text-sm mt-1">{errors.location.city.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <input
                type="text"
                className="input-field"
                {...register('location.state', { required: 'State is required' })}
              />
              {errors.location?.state && (
                <p className="text-red-500 text-sm mt-1">{errors.location.state.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Victims Information */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Victims Information</h2>
            <button
              type="button"
              onClick={addVictim}
              className="btn-secondary text-sm"
            >
              Add Victim
            </button>
          </div>
          
          {victims.map((victim, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900">Victim {index + 1}</h3>
                {victims.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVictim(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={victim.name}
                    onChange={(e) => updateVictim(index, 'name', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={victim.age}
                    onChange={(e) => updateVictim(index, 'age', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    className="input-field"
                    value={victim.gender}
                    onChange={(e) => updateVictim(index, 'gender', e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={victim.contact}
                    onChange={(e) => updateVictim(index, 'contact', e.target.value)}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={victim.address}
                    onChange={(e) => updateVictim(index, 'address', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Evidence Files */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Evidence Files</h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="evidence" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Upload evidence files
                  </span>
                  <input
                    id="evidence"
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                <p className="mt-1 text-sm text-gray-500">
                  PNG, JPG, PDF, DOC up to 10MB each
                </p>
              </div>
            </div>
          </div>
          
          {evidenceFiles.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Selected Files:</h3>
              <div className="space-y-2">
                {evidenceFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/crimes')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Crime Record'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCrime;
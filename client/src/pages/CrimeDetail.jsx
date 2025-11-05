import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Edit, MapPin, Calendar, User, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const CrimeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crime, setCrime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrime();
  }, [id]);

  const fetchCrime = async () => {
    try {
      const response = await axios.get(`/api/crimes/${id}`);
      setCrime(response.data);
    } catch (error) {
      console.error('Error fetching crime:', error);
      toast.error('Failed to fetch crime details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      open: 'status-badge status-open',
      under_investigation: 'status-badge status-under_investigation',
      closed: 'status-badge status-closed'
    };
    return badges[status] || 'status-badge bg-gray-100 text-gray-800';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!crime) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Crime not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/crimes')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{crime.title}</h1>
            <p className="text-gray-500">Case #{crime.caseNumber}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={getStatusBadge(crime.status)}>
            {crime.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Crime Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Type</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">
                  {crime.type.replace('_', ' ')}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Priority</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{crime.priority}</p>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-500">Description</label>
                <p className="mt-1 text-sm text-gray-900">{crime.description}</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Location
            </h2>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-900">{crime.location.address}</p>
              <p className="text-sm text-gray-500">
                {crime.location.city}, {crime.location.state}
              </p>
            </div>
          </div>

          {/* Victims */}
          {crime.victims && crime.victims.length > 0 && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Victims</h2>
              
              <div className="space-y-4">
                {crime.victims.map((victim, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Name</label>
                        <p className="mt-1 text-sm text-gray-900">{victim.name}</p>
                      </div>
                      
                      {victim.age && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Age</label>
                          <p className="mt-1 text-sm text-gray-900">{victim.age}</p>
                        </div>
                      )}
                      
                      {victim.gender && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Gender</label>
                          <p className="mt-1 text-sm text-gray-900 capitalize">{victim.gender}</p>
                        </div>
                      )}
                      
                      {victim.contact && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Contact</label>
                          <p className="mt-1 text-sm text-gray-900">{victim.contact}</p>
                        </div>
                      )}
                      
                      {victim.address && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-500">Address</label>
                          <p className="mt-1 text-sm text-gray-900">{victim.address}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Evidence */}
          {crime.evidence && crime.evidence.length > 0 && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Evidence Files
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {crime.evidence.map((file, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.originalName}</p>
                        <p className="text-xs text-gray-500">
                          Uploaded: {formatDate(file.uploadDate)}
                        </p>
                        {file.description && (
                          <p className="text-xs text-gray-600 mt-1">{file.description}</p>
                        )}
                      </div>
                      <a
                        href={`http://localhost:5000${file.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        View
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Case Information */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Case Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Date of Crime</p>
                  <p className="text-sm text-gray-500">{formatDate(crime.date)}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Officer in Charge</p>
                  <p className="text-sm text-gray-500">{crime.officerInCharge?.name}</p>
                  <p className="text-xs text-gray-400">{crime.officerInCharge?.station}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-900">Created</p>
                <p className="text-sm text-gray-500">{formatDate(crime.createdAt)}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-900">Last Updated</p>
                <p className="text-sm text-gray-500">{formatDate(crime.updatedAt)}</p>
              </div>
            </div>
          </div>

          {/* Suspects */}
          {crime.suspects && crime.suspects.length > 0 && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Suspects</h2>
              
              <div className="space-y-3">
                {crime.suspects.map((suspect) => (
                  <div key={suspect._id} className="flex items-center space-x-3">
                    {suspect.photo ? (
                      <img
                        src={`http://localhost:5000${suspect.photo}`}
                        alt={suspect.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{suspect.name}</p>
                      <p className="text-xs text-gray-500">
                        {suspect.age} years, {suspect.gender}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrimeDetail;
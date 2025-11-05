import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, User, MapPin, Calendar, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const CriminalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [criminal, setCriminal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCriminal();
  }, [id]);

  const fetchCriminal = async () => {
    try {
      const response = await axios.get(`/api/criminals/${id}`);
      setCriminal(response.data);
    } catch (error) {
      console.error('Error fetching criminal:', error);
      toast.error('Failed to fetch criminal details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      imprisoned: 'bg-red-100 text-red-800',
      deceased: 'bg-gray-100 text-gray-800',
      unknown: 'bg-yellow-100 text-yellow-800'
    };
    return `status-badge ${badges[status] || 'bg-gray-100 text-gray-800'}`;
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

  if (!criminal) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Criminal not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/criminals')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{criminal.name}</h1>
            <p className="text-gray-500">{criminal.age} years old • {criminal.gender}</p>
          </div>
        </div>
        <span className={getStatusBadge(criminal.status)}>
          {criminal.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                <p className="mt-1 text-sm text-gray-900">{criminal.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Age</label>
                <p className="mt-1 text-sm text-gray-900">{criminal.age} years</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Gender</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{criminal.gender}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Status</label>
                <p className="mt-1">
                  <span className={getStatusBadge(criminal.status)}>
                    {criminal.status}
                  </span>
                </p>
              </div>
              
              {criminal.identificationMarks && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500">Identification Marks</label>
                  <p className="mt-1 text-sm text-gray-900">{criminal.identificationMarks}</p>
                </div>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Address
            </h2>
            
            <div className="space-y-2">
              {criminal.address?.street && (
                <p className="text-sm text-gray-900">{criminal.address.street}</p>
              )}
              <p className="text-sm text-gray-900">
                {criminal.address?.city}, {criminal.address?.state}
              </p>
              {criminal.address?.zipCode && (
                <p className="text-sm text-gray-500">{criminal.address.zipCode}</p>
              )}
              <p className="text-sm text-gray-500">{criminal.address?.country || 'USA'}</p>
            </div>
          </div>

          {/* Previous Crimes */}
          {criminal.previousCrimes && criminal.previousCrimes.length > 0 && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Previous Crimes</h2>
              
              <div className="space-y-2">
                {criminal.previousCrimes.map((crime, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs font-medium text-gray-600">{index + 1}</span>
                    </div>
                    <p className="text-sm text-gray-900">{crime}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Linked Crime Records */}
          {criminal.crimeRecords && criminal.crimeRecords.length > 0 && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Linked Crime Records
              </h2>
              
              <div className="space-y-3">
                {criminal.crimeRecords.map((crime) => (
                  <div key={crime._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Link
                          to={`/crimes/${crime._id}`}
                          className="font-medium text-gray-900 hover:text-primary-600"
                        >
                          {crime.title}
                        </Link>
                        <p className="text-sm text-gray-500">
                          Case #{crime.caseNumber} • {crime.type.replace('_', ' ')}
                        </p>
                        {crime.date && (
                          <p className="text-xs text-gray-400">
                            {formatDate(crime.date)}
                          </p>
                        )}
                      </div>
                      <span className={`status-badge ${
                        crime.status === 'open' ? 'status-open' :
                        crime.status === 'under_investigation' ? 'status-under_investigation' :
                        'status-closed'
                      }`}>
                        {crime.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Photo */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Photo</h2>
            
            <div className="flex justify-center">
              {criminal.photo ? (
                <img
                  src={`http://localhost:5000${criminal.photo}`}
                  alt={criminal.name}
                  className="h-48 w-48 rounded-lg object-cover"
                />
              ) : (
                <div className="h-48 w-48 rounded-lg bg-gray-300 flex items-center justify-center">
                  <User className="h-16 w-16 text-gray-600" />
                </div>
              )}
            </div>
          </div>

          {/* Record Information */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Record Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Record Created</p>
                  <p className="text-sm text-gray-500">{formatDate(criminal.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Last Updated</p>
                  <p className="text-sm text-gray-500">{formatDate(criminal.updatedAt)}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-900">Total Crime Records</p>
                <p className="text-sm text-gray-500">{criminal.crimeRecords?.length || 0}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-900">Previous Crimes Count</p>
                <p className="text-sm text-gray-500">{criminal.previousCrimes?.length || 0}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            
            <div className="space-y-2">
              <Link
                to="/crimes/add"
                className="block w-full btn-primary text-center"
              >
                Link to New Crime
              </Link>
              <button
                onClick={() => window.print()}
                className="block w-full btn-secondary text-center"
              >
                Print Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriminalDetail;
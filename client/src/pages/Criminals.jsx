import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Eye, Edit, Trash2, User } from 'lucide-react';
import toast from 'react-hot-toast';

const Criminals = () => {
  const [criminals, setCriminals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    gender: '',
    status: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  useEffect(() => {
    fetchCriminals();
  }, [filters]);

  const fetchCriminals = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) params.append(key, filters[key]);
      });

      const response = await axios.get(`/api/criminals?${params}`);
      setCriminals(response.data.criminals);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total
      });
    } catch (error) {
      console.error('Error fetching criminals:', error);
      toast.error('Failed to fetch criminals');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this criminal profile?')) {
      try {
        await axios.delete(`/api/criminals/${id}`);
        toast.success('Criminal profile deleted successfully');
        fetchCriminals();
      } catch (error) {
        toast.error('Failed to delete criminal profile');
      }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Criminal Records</h1>
        <Link to="/criminals/add" className="btn-primary">
          Add New Criminal
        </Link>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search criminals..."
              className="input-field pl-10"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          
          <select
            className="input-field"
            value={filters.gender}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          
          <select
            className="input-field"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="imprisoned">Imprisoned</option>
            <option value="deceased">Deceased</option>
            <option value="unknown">Unknown</option>
          </select>
          
          <select
            className="input-field"
            value={filters.limit}
            onChange={(e) => handleFilterChange('limit', e.target.value)}
          >
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="card">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Showing {criminals.length} of {pagination.total} criminals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {criminals.map((criminal) => (
                <div key={criminal._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {criminal.photo ? (
                        <img
                          src={`http://localhost:5000${criminal.photo}`}
                          alt={criminal.name}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="h-8 w-8 text-gray-600" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/criminals/${criminal._id}`}
                          className="text-lg font-medium text-gray-900 hover:text-primary-600 truncate"
                        >
                          {criminal.name}
                        </Link>
                        <span className={getStatusBadge(criminal.status)}>
                          {criminal.status}
                        </span>
                      </div>
                      
                      <div className="mt-1 text-sm text-gray-500">
                        <p>{criminal.age} years old • {criminal.gender}</p>
                        {criminal.address?.city && (
                          <p>{criminal.address.city}, {criminal.address.state}</p>
                        )}
                      </div>
                      
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Crime Records: {criminal.crimeRecords?.length || 0}</p>
                        {criminal.previousCrimes?.length > 0 && (
                          <p>Previous Crimes: {criminal.previousCrimes.length}</p>
                        )}
                      </div>
                      
                      <div className="mt-3 flex space-x-2">
                        <Link
                          to={`/criminals/${criminal._id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(criminal._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {criminals.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No criminals found matching your criteria.</p>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-700">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="btn-secondary disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="btn-secondary disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Criminals;
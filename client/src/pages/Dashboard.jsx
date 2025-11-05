import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FileText, 
  Users, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Search
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCrimes: 0,
    openCases: 0,
    underInvestigation: 0,
    closedCases: 0,
    crimeTypes: [],
    recentCrimes: 0
  });
  const [recentCrimes, setRecentCrimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, crimesResponse] = await Promise.all([
        axios.get('/api/crimes/stats'),
        axios.get('/api/crimes?limit=5&sortBy=createdAt&sortOrder=desc')
      ]);
      
      setStats(statsResponse.data);
      setRecentCrimes(crimesResponse.data.crimes);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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
      month: 'short',
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-lg p-6 mb-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">COMMAND DASHBOARD</h1>
            <p className="text-blue-200 mt-1">Springfield Police Department - Crime Analytics</p>
          </div>
          <Link to="/crimes/add" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-md transition-colors duration-200">
            + NEW CASE
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card border-l-4 border-blue-600">
          <div className="flex items-center">
            <div className="p-3 bg-blue-600 rounded-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Total Cases</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalCrimes}</p>
            </div>
          </div>
        </div>

        <div className="card border-l-4 border-red-600">
          <div className="flex items-center">
            <div className="p-3 bg-red-600 rounded-lg">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Open Cases</p>
              <p className="text-3xl font-bold text-red-700">{stats.openCases}</p>
            </div>
          </div>
        </div>

        <div className="card border-l-4 border-yellow-600">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-600 rounded-lg">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Active Investigations</p>
              <p className="text-3xl font-bold text-yellow-700">{stats.underInvestigation}</p>
            </div>
          </div>
        </div>

        <div className="card border-l-4 border-green-600">
          <div className="flex items-center">
            <div className="p-3 bg-green-600 rounded-lg">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Solved Cases</p>
              <p className="text-3xl font-bold text-green-700">{stats.closedCases}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Crimes */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Crimes</h2>
            <Link to="/crimes" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentCrimes.map((crime) => (
              <div key={crime._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <Link 
                    to={`/crimes/${crime._id}`}
                    className="font-medium text-gray-900 hover:text-primary-600"
                  >
                    {crime.title}
                  </Link>
                  <p className="text-sm text-gray-500">{crime.type} • {formatDate(crime.date)}</p>
                </div>
                <span className={getStatusBadge(crime.status)}>
                  {crime.status.replace('_', ' ')}
                </span>
              </div>
            ))}
            
            {recentCrimes.length === 0 && (
              <p className="text-gray-500 text-center py-4">No recent crimes</p>
            )}
          </div>
        </div>

        {/* Crime Types Chart */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Crime Types Distribution</h2>
          
          <div className="space-y-3">
            {stats.crimeTypes.slice(0, 5).map((type) => (
              <div key={type._id} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {type._id.replace('_', ' ')}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full" 
                      style={{ width: `${(type.count / stats.totalCrimes) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{type.count}</span>
                </div>
              </div>
            ))}
            
            {stats.crimeTypes.length === 0 && (
              <p className="text-gray-500 text-center py-4">No crime data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
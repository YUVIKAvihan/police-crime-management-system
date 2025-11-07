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
  Search,
  Shield
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
      {/* Indian Flag Stripe */}
      <div className="indian-flag-stripe h-2 rounded-t-lg mb-0"></div>

      <div className="bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 rounded-b-lg p-6 mb-6 text-white shadow-2xl border-b-4 border-yellow-400 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 text-9xl">🇮🇳</div>
        </div>

        <div className="flex justify-between items-center relative z-10">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="police-badge rounded-full p-2">
                <Shield className="h-8 w-8 text-yellow-400" />
              </div>
              <span className="text-4xl">🇮🇳</span>
            </div>
            <h1 className="text-3xl font-bold text-yellow-400">कमांड डैशबोर्ड</h1>
            <h2 className="text-2xl font-bold">COMMAND DASHBOARD</h2>
            <p className="text-blue-200 mt-1">भारतीय पुलिस विभाग | Indian Police Department - Crime Analytics</p>
          </div>
          <Link to="/crimes/add" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            <span className="text-lg">+ नया मामला</span>
            <br />
            <span className="text-sm">NEW CASE</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card border-l-4 border-blue-600 hover:shadow-xl transition-shadow duration-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 text-6xl opacity-5">📊</div>
          <div className="flex items-center relative z-10">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">कुल मामले</p>
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Total Cases</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalCrimes}</p>
            </div>
          </div>
        </div>

        <div className="card border-l-4 border-red-600 hover:shadow-xl transition-shadow duration-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 text-6xl opacity-5">🚨</div>
          <div className="flex items-center relative z-10">
            <div className="p-3 bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-lg">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">खुले मामले</p>
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Open Cases</p>
              <p className="text-3xl font-bold text-red-700">{stats.openCases}</p>
            </div>
          </div>
        </div>

        <div className="card border-l-4 border-yellow-600 hover:shadow-xl transition-shadow duration-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 text-6xl opacity-5">🔍</div>
          <div className="flex items-center relative z-10">
            <div className="p-3 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg shadow-lg">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">जांच चल रही</p>
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">Investigations</p>
              <p className="text-3xl font-bold text-yellow-700">{stats.underInvestigation}</p>
            </div>
          </div>
        </div>

        <div className="card border-l-4 border-green-600 hover:shadow-xl transition-shadow duration-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 text-6xl opacity-5">✅</div>
          <div className="flex items-center relative z-10">
            <div className="p-3 bg-gradient-to-br from-green-600 to-green-800 rounded-lg shadow-lg">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">सुलझाए गए</p>
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
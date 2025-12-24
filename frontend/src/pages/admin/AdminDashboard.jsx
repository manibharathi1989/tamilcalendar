import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BarChart, Calendar, Edit, LogOut, Database, TrendingUp, Star, PieChart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { adminAPI } from '../../services/adminAPI';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await adminAPI.getStats(token);
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-indigo-200 text-sm">Tamil Daily Calendar Management</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm">
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Calendar Days</p>
                <p className="text-3xl font-bold text-gray-800">{stats?.total_calendars || 0}</p>
              </div>
              <Calendar className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Special Days</p>
                <p className="text-3xl font-bold text-gray-800">{stats?.total_special_days || 0}</p>
              </div>
              <Database className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Years Covered</p>
                <p className="text-3xl font-bold text-gray-800">{stats?.year_wise_stats?.length || 0}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/editor"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all"
            >
              <Edit className="w-8 h-8 text-indigo-600" />
              <div>
                <p className="font-semibold text-gray-800">Edit Calendar</p>
                <p className="text-sm text-gray-600">Update calendar data</p>
              </div>
            </Link>

            <Link
              to="/admin/special-days"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-md transition-all"
            >
              <Star className="w-8 h-8 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-800">Special Days</p>
                <p className="text-sm text-gray-600">Manage special events</p>
              </div>
            </Link>

            <Link
              to="/admin/analytics"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:shadow-md transition-all"
            >
              <PieChart className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-semibold text-gray-800">Analytics</p>
                <p className="text-sm text-gray-600">View statistics</p>
              </div>
            </Link>

            <Link
              to="/search"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-md transition-all"
            >
              <BarChart className="w-8 h-8 text-orange-600" />
              <div>
                <p className="font-semibold text-gray-800">Search</p>
                <p className="text-sm text-gray-600">Find dates & events</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Year-wise Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Year-wise Calendar Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {stats?.year_wise_stats?.map((stat) => (
              <div
                key={stat.year}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 border-2 border-indigo-200"
              >
                <p className="text-sm text-gray-600">Year</p>
                <p className="text-2xl font-bold text-indigo-600">{stat.year}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.days} days</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

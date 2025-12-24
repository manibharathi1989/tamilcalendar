import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, Save, ArrowLeft, Plus, Trash2, Edit2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { adminAPI } from '../../services/adminAPI';

const SpecialDaysEditor = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [specialDays, setSpecialDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDay, setNewDay] = useState({
    date: '',
    type: 'pournami',
    tamil_name: '',
    english_name: ''
  });
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const eventTypes = [
    { value: 'pournami', label: 'Pournami (பௌர்ணமி)' },
    { value: 'amavasai', label: 'Amavasai (அமாவாசை)' },
    { value: 'pradosham', label: 'Pradosham (பிரதோஷம்)' },
    { value: 'ekadhasi', label: 'Ekadasi (ஏகாதசி)' },
    { value: 'karthigai', label: 'Karthigai (கார்த்திகை)' },
    { value: 'sashti_viradham', label: 'Sashti Viradham' },
    { value: 'sankatahara_chathurthi', label: 'Sankatahara Chathurthi' },
    { value: 'thiruvonam', label: 'Thiruvonam' },
    { value: 'maadha_sivarathiri', label: 'Maadha Sivarathiri' },
    { value: 'ashtami', label: 'Ashtami (அஷ்டமி)' },
    { value: 'navami', label: 'Navami (நவமி)' },
    { value: 'festival', label: 'Festival' },
    { value: 'govt_holiday', label: 'Government Holiday' },
    { value: 'wedding', label: 'Wedding Day' },
  ];

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchSpecialDays();
    }
  }, [token, navigate, selectedYear, selectedMonth]);

  const fetchSpecialDays = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getSpecialDays(selectedYear, selectedMonth, token);
      setSpecialDays(data || []);
    } catch (error) {
      console.error('Error fetching special days:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDay = async () => {
    if (!newDay.date || !newDay.type) return;
    setSaving(true);
    try {
      await adminAPI.addSpecialDay({
        ...newDay,
        year: selectedYear,
        month: selectedMonth
      }, token);
      await fetchSpecialDays();
      setShowAddForm(false);
      setNewDay({ date: '', type: 'pournami', tamil_name: '', english_name: '' });
    } catch (error) {
      console.error('Error adding special day:', error);
      alert('Error adding special day');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDay = async (dayId) => {
    if (!window.confirm('Are you sure you want to delete this special day?')) return;
    try {
      await adminAPI.deleteSpecialDay(dayId, token);
      await fetchSpecialDays();
    } catch (error) {
      console.error('Error deleting special day:', error);
      alert('Error deleting special day');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Special Days Editor</h1>
              <p className="text-purple-200">Manage special days and festivals</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {months.map((month, index) => (
                  <option key={index} value={index + 1}>{month}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Special Day
            </button>
          </div>
        </div>

        {/* Add Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
              <h3 className="text-xl font-bold mb-4">Add Special Day</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Date</label>
                  <input
                    type="date"
                    value={newDay.date}
                    onChange={(e) => setNewDay({ ...newDay, date: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Type</label>
                  <select
                    value={newDay.type}
                    onChange={(e) => setNewDay({ ...newDay, type: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {eventTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Tamil Name</label>
                  <input
                    type="text"
                    value={newDay.tamil_name}
                    onChange={(e) => setNewDay({ ...newDay, tamil_name: e.target.value })}
                    placeholder="தமிழ் பெயர்"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">English Name</label>
                  <input
                    type="text"
                    value={newDay.english_name}
                    onChange={(e) => setNewDay({ ...newDay, english_name: e.target.value })}
                    placeholder="English Name"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddDay}
                  disabled={saving}
                  className="flex-1 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-all"
                >
                  {saving ? 'Saving...' : 'Add'}
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Special Days List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading special days...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Special Days - {months[selectedMonth - 1]} {selectedYear}
            </h2>
            
            {specialDays.length > 0 ? (
              <div className="space-y-3">
                {specialDays.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <Calendar className="w-8 h-8 text-purple-600" />
                      <div>
                        <p className="font-semibold">
                          {new Date(day.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-gray-600">
                          {day.tamil_name || day.type} - {day.english_name || day.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteDay(day.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No special days found for this month</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
                >
                  Add First Special Day
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SpecialDaysEditor;

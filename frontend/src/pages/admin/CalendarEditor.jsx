import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Save, ArrowLeft, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { adminAPI } from '../../services/adminAPI';

const CalendarEditor = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleDateChange = async () => {
    setLoading(true);
    setMessage('');
    try {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
      
      const data = await adminAPI.getCalendar(year, month, day, token);
      setCalendarData(data);
    } catch (error) {
      setMessage('Error loading calendar data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
      
      await adminAPI.updateCalendar(year, month, day, calendarData, token);
      setMessage('Calendar updated successfully!');
    } catch (error) {
      setMessage('Error updating calendar');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCalendarData({ ...calendarData, [field]: value });
  };

  const handleNestedChange = (parent, child, value) => {
    setCalendarData({
      ...calendarData,
      [parent]: {
        ...calendarData[parent],
        [child]: value
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Calendar Editor</h1>
              <p className="text-indigo-200 text-sm">Edit calendar data for any date</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Date Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleDateChange}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              <Search className="w-5 h-5" />
              {loading ? 'Loading...' : 'Load Date'}
            </button>
          </div>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl ${message.includes('success') ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'} border-2`}>
            {message}
          </div>
        )}

        {calendarData && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subakariyam - Full Width */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">
                  சுபகாரியம் / Subakariyam
                </label>
                <textarea
                  value={calendarData.subakariyam || ''}
                  onChange={(e) => handleInputChange('subakariyam', e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Nalla Neram */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nalla Neram (Morning)</label>
                <input
                  type="text"
                  value={calendarData.nalla_neram?.morning || ''}
                  onChange={(e) => handleNestedChange('nalla_neram', 'morning', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nalla Neram (Evening)</label>
                <input
                  type="text"
                  value={calendarData.nalla_neram?.evening || ''}
                  onChange={(e) => handleNestedChange('nalla_neram', 'evening', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Other Fields */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Raahu Kaalam</label>
                <input
                  type="text"
                  value={calendarData.raahu_kaalam || ''}
                  onChange={(e) => handleInputChange('raahu_kaalam', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Yemagandam</label>
                <input
                  type="text"
                  value={calendarData.yemagandam || ''}
                  onChange={(e) => handleInputChange('yemagandam', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Kuligai</label>
                <input
                  type="text"
                  value={calendarData.kuligai || ''}
                  onChange={(e) => handleInputChange('kuligai', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Star (நட்சத்திரம்)</label>
                <input
                  type="text"
                  value={calendarData.star || ''}
                  onChange={(e) => handleInputChange('star', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Thithi (திதி)</label>
                <input
                  type="text"
                  value={calendarData.thithi || ''}
                  onChange={(e) => handleInputChange('thithi', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Lagnam (லக்னம்)</label>
                <input
                  type="text"
                  value={calendarData.lagnam || ''}
                  onChange={(e) => handleInputChange('lagnam', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {!calendarData && !loading && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Select a date and click "Load Date" to start editing</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CalendarEditor;

import React, { useState, useEffect } from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { Flame, Sparkles, Heart } from 'lucide-react';
import { calendarAPI } from '../services/calendarAPI';

const SashtiViradham = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [sashtiDates, setSashtiDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);

  useEffect(() => {
    fetchSashtiDates();
  }, [selectedYear]);

  const fetchSashtiDates = async () => {
    setLoading(true);
    try {
      const allDates = [];
      
      for (let month = 1; month <= 12; month++) {
        const specialDays = await calendarAPI.getSpecialDays(selectedYear, month);
        if (specialDays && specialDays.sashtiViradham) {
          allDates.push(...specialDays.sashtiViradham.map(d => ({ date: d, month })));
        }
      }
      
      setSashtiDates(allDates);
    } catch (error) {
      console.error('Error fetching sashti dates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Flame className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Sashti Viradham Dates</h1>
          <p className="text-orange-200 text-lg">ஷஷ்டி விரதம் தேதிகள் - Lord Murugan Fasting Days</p>
        </div>

        {/* Year Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-4">
            <label className="text-gray-700 font-semibold">Select Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-6 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white font-medium"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sashti Dates */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Sashti Viradham Dates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dates List */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Sashti Viradham Dates {selectedYear}</h2>
              
              {sashtiDates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sashtiDates.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Flame className="w-8 h-8 text-orange-600" />
                        <div>
                          <p className="font-semibold text-gray-800">{item.date}</p>
                          <p className="text-sm text-gray-600">ஷஷ்டி விரதம்</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Flame className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No Sashti Viradham dates available for {selectedYear}</p>
                  <p className="text-sm text-gray-500 mt-2">Please select December 2025 to see sample data</p>
                </div>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-red-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-red-600" />
                  About Sashti Viradham
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Sashti Viradham (ஷஷ்டி விரதம்) is observed on the 6th day of each lunar fortnight. It is dedicated to Lord Murugan (Skanda/Karthikeya).
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Devotees fast and pray to Lord Murugan for blessings, especially for children's welfare and protection.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl shadow-lg p-6 border-2 border-yellow-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">How to Observe</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Wake up early morning</li>
                  <li>• Take holy bath</li>
                  <li>• Observe strict fast</li>
                  <li>• Visit Murugan temple</li>
                  <li>• Chant Skanda Sashti Kavacham</li>
                  <li>• Light lamps</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 border-2 border-green-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Special Sashti Days</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Skanda Sashti:</strong> Most important (6 days)</li>
                  <li><strong>Subramanya Sashti:</strong> For blessings</li>
                  <li><strong>Kukke Sashti:</strong> Very auspicious</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl shadow-lg p-6 border-2 border-pink-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-600" />
                  Benefits
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Children's protection</li>
                  <li>• Removal of obstacles</li>
                  <li>• Victory over enemies</li>
                  <li>• Good health</li>
                  <li>• Spiritual progress</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default SashtiViradham;

import React, { useState, useEffect, useCallback } from 'react';
import ModernHeader from '@/components/ModernHeader';
import ModernFooter from '@/components/ModernFooter';
import { Zap, Sparkles, AlertTriangle } from 'lucide-react';
import { calendarAPI } from '@/services/calendarAPI';

const Karinal = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [karinalDates, setKarinalDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);

  const fetchKarinalDates = useCallback(async () => {
    setLoading(true);
    try {
      const allDates = [];
      
      for (let month = 1; month <= 12; month++) {
        const specialDays = await calendarAPI.getSpecialDays(selectedYear, month);
        if (specialDays && specialDays.karinal) {
          allDates.push(...specialDays.karinal.map(d => ({ date: d, month })));
        }
      }
      
      setKarinalDates(allDates);
    } catch (error) {
      console.error('Error fetching karinal dates:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    fetchKarinalDates();
  }, [fetchKarinalDates]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-700 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Zap className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Karinal Dates</h1>
          <p className="text-red-200 text-lg">கரிநாள் தேதிகள் - Inauspicious Days</p>
        </div>

        {/* Year Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-4">
            <label className="text-gray-700 font-semibold">Select Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-6 py-3 border-2 border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white font-medium"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Karinal Dates */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Karinal Dates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dates List */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Karinal Dates {selectedYear}</h2>
              
              {karinalDates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {karinalDates.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Zap className="w-8 h-8 text-red-600" />
                        <div>
                          <p className="font-semibold text-gray-800">{item.date}</p>
                          <p className="text-sm text-gray-600">கரிநாள்</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No Karinal dates available for {selectedYear}</p>
                  <p className="text-sm text-gray-500 mt-2">Karinal days are calculated based on specific lunar positions</p>
                </div>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-red-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  About Karinal
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Karinal (கரிநாள்) are inauspicious days in the Tamil calendar. These days are considered unfavorable for starting new ventures or auspicious activities.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  The word "Kari" means black, and these days are marked as inauspicious based on specific planetary positions.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl shadow-lg p-6 border-2 border-yellow-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">What to Avoid</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Starting new business</li>
                  <li>• Marriage ceremonies</li>
                  <li>• House warming</li>
                  <li>• Buying property</li>
                  <li>• Long journeys</li>
                  <li>• Important meetings</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 border-2 border-green-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Remedies</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Perform daily prayers</li>
                  <li>• Chant Hanuman Chalisa</li>
                  <li>• Visit Lord Shiva temple</li>
                  <li>• Donate to the needy</li>
                  <li>• Light lamps at home</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Note
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  While Karinal days are considered inauspicious, regular daily activities can continue. Only major auspicious events should be avoided.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default Karinal;
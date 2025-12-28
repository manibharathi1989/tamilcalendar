import React, { useState, useEffect, useCallback } from 'react';
import ModernHeader from '@/components/ModernHeader';
import ModernFooter from '@/components/ModernFooter';
import { Crown, Sparkles, Star } from 'lucide-react';
import { calendarAPI } from '@/services/calendarAPI';

const Navami = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [navamiDates, setNavamiDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);

  const fetchNavamiDates = useCallback(async () => {
    setLoading(true);
    try {
      const allDates = [];
      
      for (let month = 1; month <= 12; month++) {
        const specialDays = await calendarAPI.getSpecialDays(selectedYear, month);
        if (specialDays && specialDays.navami) {
          allDates.push(...specialDays.navami.map(d => ({ date: d, month })));
        }
      }
      
      setNavamiDates(allDates);
    } catch (error) {
      console.error('Error fetching navami dates:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    fetchNavamiDates();
  }, [fetchNavamiDates]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Crown className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Navami Dates</h1>
          <p className="text-purple-200 text-lg">நவமி தேதிகள் - Ninth Lunar Day</p>
        </div>

        {/* Year Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-4">
            <label className="text-gray-700 font-semibold">Select Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-6 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white font-medium"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Navami Dates */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Navami Dates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dates List */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Navami Dates {selectedYear}</h2>
              
              {navamiDates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {navamiDates.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Crown className="w-8 h-8 text-purple-600" />
                        <div>
                          <p className="font-semibold text-gray-800">{item.date}</p>
                          <p className="text-sm text-gray-600">நவமி</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Crown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No Navami dates available for {selectedYear}</p>
                  <p className="text-sm text-gray-500 mt-2">Please select December 2025 to see sample data</p>
                </div>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-lg p-6 border-2 border-pink-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-pink-600" />
                  About Navami
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Navami (நவமி) is the 9th day of each lunar fortnight. It holds special significance as the day dedicated to Goddess Durga and Lord Rama.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Ram Navami, celebrating Lord Rama's birth, is the most famous Navami observance.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-red-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Famous Navami Days</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Ram Navami:</strong> Lord Rama's birthday</li>
                  <li><strong>Maha Navami:</strong> During Navaratri</li>
                  <li><strong>Ayudha Puja:</strong> Tool worship</li>
                  <li><strong>Saraswati Puja:</strong> In some regions</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl shadow-lg p-6 border-2 border-yellow-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Rituals</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Goddess Durga worship</li>
                  <li>• Ram Puja on Ram Navami</li>
                  <li>• Fasting and prayers</li>
                  <li>• Reading Ramayana</li>
                  <li>• Temple visits</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-blue-600" />
                  Significance
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Victory of good over evil</li>
                  <li>• Divine blessings</li>
                  <li>• Spiritual advancement</li>
                  <li>• Removal of obstacles</li>
                  <li>• Family prosperity</li>
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

export default Navami;
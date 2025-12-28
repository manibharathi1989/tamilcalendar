import React, { useState, useEffect, useCallback } from 'react';
import ModernHeader from '@/components/ModernHeader';
import ModernFooter from '@/components/ModernFooter';
import { Lightbulb, Sparkles, Flame } from 'lucide-react';
import { calendarAPI } from '@/services/calendarAPI';

const Karthigai = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [karthigaiDates, setKarthigaiDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);

  const fetchKarthigaiDates = useCallback(async () => {
    setLoading(true);
    try {
      const allDates = [];
      
      for (let month = 1; month <= 12; month++) {
        const specialDays = await calendarAPI.getSpecialDays(selectedYear, month);
        if (specialDays && specialDays.karthigai) {
          allDates.push(...specialDays.karthigai.map(d => ({ date: d, month })));
        }
      }
      
      setKarthigaiDates(allDates);
    } catch (error) {
      console.error('Error fetching karthigai dates:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    fetchKarthigaiDates();
  }, [fetchKarthigaiDates]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Lightbulb className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Karthigai Dates</h1>
          <p className="text-orange-200 text-lg">கார்த்திகை தேதிகள் - Festival of Lights</p>
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

        {/* Karthigai Dates */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Karthigai Dates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dates List */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Karthigai Dates {selectedYear}</h2>
              
              {karthigaiDates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {karthigaiDates.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-4 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Lightbulb className="w-8 h-8 text-orange-600" />
                        <div>
                          <p className="font-semibold text-gray-800">{item.date}</p>
                          <p className="text-sm text-gray-600">கார்த்திகை</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No Karthigai dates available for {selectedYear}</p>
                  <p className="text-sm text-gray-500 mt-2">Please select December 2025 to see sample data</p>
                </div>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-600" />
                  About Karthigai
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Karthigai (கார்த்திகை) is observed when the Karthigai star (Pleiades/Krittika) is prominent. It is one of the most important festivals in Tamil Nadu.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  The festival celebrates Lord Murugan and Lord Shiva, and is marked by lighting lamps everywhere.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl shadow-lg p-6 border-2 border-red-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-red-600" />
                  Celebrations
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Light clay lamps (Agal Vilakku)</li>
                  <li>• Decorate homes with lamps</li>
                  <li>• Visit Murugan temples</li>
                  <li>• Prepare special dishes</li>
                  <li>• Community celebrations</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Special Events</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Thiruvannamalai:</strong> Maha Deepam</li>
                  <li><strong>Tirupati:</strong> Lakshmi Deepam</li>
                  <li><strong>Palani:</strong> Special Puja</li>
                  <li><strong>Home:</strong> Family celebrations</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 border-2 border-green-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Significance</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Victory of light over darkness</li>
                  <li>• Lord Murugan's birth star</li>
                  <li>• Shiva as Jyotirlinga</li>
                  <li>• Removes negativity</li>
                  <li>• Brings prosperity</li>
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

export default Karthigai;
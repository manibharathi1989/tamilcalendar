import React, { useState, useEffect } from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { Octagon, Sparkles, Moon } from 'lucide-react';
import { calendarAPI } from '../services/calendarAPI';

const Ashtami = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [ashtamiDates, setAshtamiDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);

  useEffect(() => {
    fetchAshtamiDates();
  }, [selectedYear]);

  const fetchAshtamiDates = async () => {
    setLoading(true);
    try {
      const allDates = [];
      
      for (let month = 1; month <= 12; month++) {
        const specialDays = await calendarAPI.getSpecialDays(selectedYear, month);
        if (specialDays && specialDays.ashtami) {
          allDates.push(...specialDays.ashtami.map(d => ({ date: d, month })));
        }
      }
      
      setAshtamiDates(allDates);
    } catch (error) {
      console.error('Error fetching ashtami dates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Octagon className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Ashtami Dates</h1>
          <p className="text-blue-200 text-lg">அஷ்டமி தேதிகள் - Eighth Lunar Day</p>
        </div>

        {/* Year Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-4">
            <label className="text-gray-700 font-semibold">Select Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-6 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ashtami Dates */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Ashtami Dates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dates List */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Ashtami Dates {selectedYear}</h2>
              
              {ashtamiDates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ashtamiDates.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Octagon className="w-8 h-8 text-blue-600" />
                        <div>
                          <p className="font-semibold text-gray-800">{item.date}</p>
                          <p className="text-sm text-gray-600">அஷ்டமி</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Octagon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No Ashtami dates available for {selectedYear}</p>
                  <p className="text-sm text-gray-500 mt-2">Please select December 2025 to see sample data</p>
                </div>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-lg p-6 border-2 border-indigo-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-indigo-600" />
                  About Ashtami
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Ashtami (அஷ்டமி) is the 8th day of each lunar fortnight. It is considered sacred for worshipping Goddess Durga and Lord Krishna.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Krishna Janmashtami, the birthday of Lord Krishna, is celebrated on Ashtami of Krishna Paksha in Bhadrapada month.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 border-2 border-purple-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Famous Ashtami Days</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Krishna Janmashtami:</strong> Most important</li>
                  <li><strong>Durga Ashtami:</strong> During Navaratri</li>
                  <li><strong>Kalashtami:</strong> Bhairava worship</li>
                  <li><strong>Radha Ashtami:</strong> Radha's birthday</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 border-2 border-green-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Rituals</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Fasting until midnight</li>
                  <li>• Krishna Puja</li>
                  <li>• Reading Bhagavad Gita</li>
                  <li>• Singing bhajans</li>
                  <li>• Temple visits</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl shadow-lg p-6 border-2 border-yellow-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Moon className="w-5 h-5 text-yellow-600" />
                  Significance
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Divine blessings</li>
                  <li>• Spiritual cleansing</li>
                  <li>• Protection from evil</li>
                  <li>• Inner peace</li>
                  <li>• Good fortune</li>
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

export default Ashtami;

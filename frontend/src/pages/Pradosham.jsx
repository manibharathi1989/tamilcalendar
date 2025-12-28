import React, { useState, useEffect, useCallback } from 'react';
import ModernHeader from '@/components/ModernHeader';
import ModernFooter from '@/components/ModernFooter';
import { Star, Calendar, Sparkles } from 'lucide-react';
import { calendarAPI } from '@/services/calendarAPI';

const Pradosham = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [pradoshamDates, setPradoshamDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);

  const fetchPradoshamDates = useCallback(async () => {
    setLoading(true);
    try {
      const allDates = [];
      
      for (let month = 1; month <= 12; month++) {
        const specialDays = await calendarAPI.getSpecialDays(selectedYear, month);
        if (specialDays && specialDays.pradosham) {
          allDates.push(...specialDays.pradosham.map(d => ({ date: d, month })));
        }
      }
      
      setPradoshamDates(allDates);
    } catch (error) {
      console.error('Error fetching pradosham dates:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    fetchPradoshamDates();
  }, [fetchPradoshamDates]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Star className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Pradosham Dates</h1>
          <p className="text-indigo-200 text-lg">பிரதோஷம் தேதிகள் - Sacred Shiva Worship Days</p>
        </div>

        {/* Year Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-4">
            <label className="text-gray-700 font-semibold">Select Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-6 py-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pradosham Dates */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Pradosham Dates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dates List */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Pradosham Dates {selectedYear}</h2>
              
              {pradoshamDates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pradoshamDates.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-4 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Star className="w-8 h-8 text-indigo-600" />
                        <div>
                          <p className="font-semibold text-gray-800">{item.date}</p>
                          <p className="text-sm text-gray-600">பிரதோஷம்</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No Pradosham dates available for {selectedYear}</p>
                  <p className="text-sm text-gray-500 mt-2">Please select December 2025 to see sample data</p>
                </div>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-lg p-6 border-2 border-orange-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-orange-600" />
                  About Pradosham
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Pradosham (பிரதோஷம்) occurs on the 13th day (Trayodashi) of every lunar fortnight. It is considered highly auspicious for Lord Shiva worship.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  The time period of 1.5 hours before sunset is called Pradosham, which is very sacred.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Religious Significance</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Lord Shiva performed Tandava</li>
                  <li>• Highly auspicious for prayers</li>
                  <li>• Removes sins and obstacles</li>
                  <li>• Grants wishes and blessings</li>
                  <li>• Temple visits recommended</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 border-2 border-purple-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Types of Pradosham</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Soma Pradosham:</strong> Monday</li>
                  <li><strong>Bhauma Pradosham:</strong> Tuesday</li>
                  <li><strong>Shani Pradosham:</strong> Saturday (Most powerful)</li>
                  <li><strong>Other days:</strong> Also auspicious</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 border-2 border-green-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">How to Observe</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Visit Shiva temple</li>
                  <li>• Perform abhishekam</li>
                  <li>• Chant Shiva mantras</li>
                  <li>• Light lamps</li>
                  <li>• Observe fasting</li>
                  <li>• Offer bilva leaves</li>
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

export default Pradosham;
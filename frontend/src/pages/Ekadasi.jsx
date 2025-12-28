import React, { useState, useEffect, useCallback } from 'react';
import ModernHeader from '@/components/ModernHeader';
import ModernFooter from '@/components/ModernFooter';
import { Calendar, Sparkles, AlertCircle } from 'lucide-react';
import { calendarAPI } from '@/services/calendarAPI';

const Ekadasi = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [ekadasiDates, setEkadasiDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);

  const fetchEkadasiDates = useCallback(async () => {
    setLoading(true);
    try {
      const allDates = [];
      
      for (let month = 1; month <= 12; month++) {
        const specialDays = await calendarAPI.getSpecialDays(selectedYear, month);
        if (specialDays && specialDays.ekadhasi) {
          allDates.push(...specialDays.ekadhasi.map(d => ({ date: d, month })));
        }
      }
      
      setEkadasiDates(allDates);
    } catch (error) {
      console.error('Error fetching ekadasi dates:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    fetchEkadasiDates();
  }, [fetchEkadasiDates]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Sparkles className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Ekadasi Dates</h1>
          <p className="text-green-200 text-lg">ஏகாதசி தேதிகள் - Sacred Fasting Days</p>
        </div>

        {/* Year Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-4">
            <label className="text-gray-700 font-semibold">Select Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-6 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white font-medium"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ekadasi Dates */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Ekadasi Dates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dates List */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Ekadasi Dates {selectedYear}</h2>
              
              {ekadasiDates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ekadasiDates.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-4 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-green-600" />
                        <div>
                          <p className="font-semibold text-gray-800">{item.date}</p>
                          <p className="text-sm text-gray-600">ஏகாதசி</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No Ekadasi dates available for {selectedYear}</p>
                  <p className="text-sm text-gray-500 mt-2">Please select December 2025 to see sample data</p>
                </div>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                  About Ekadasi
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Ekadasi (ஏகாதசி) is the 11th day of each lunar fortnight. It is one of the most auspicious days for Lord Vishnu worship and fasting.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Observing Ekadasi vratham is believed to cleanse the body and mind, and bestow spiritual merit.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-yellow-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Fasting Rules</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Avoid grains (rice, wheat)</li>
                  <li>• No pulses or beans</li>
                  <li>• Fruits and milk allowed</li>
                  <li>• Complete water-only fast (optional)</li>
                  <li>• Break fast on Dwadasi</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 border-2 border-purple-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Famous Ekadasi</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Vaikuntha Ekadasi:</strong> Most sacred</li>
                  <li><strong>Nirjala Ekadasi:</strong> Waterless fast</li>
                  <li><strong>Mokshada Ekadasi:</strong> Liberation</li>
                  <li><strong>Putrada Ekadasi:</strong> For children</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl shadow-lg p-6 border-2 border-red-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Benefits
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Purifies body and mind</li>
                  <li>• Removes past sins</li>
                  <li>• Brings divine blessings</li>
                  <li>• Improves health</li>
                  <li>• Grants moksha (liberation)</li>
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

export default Ekadasi;
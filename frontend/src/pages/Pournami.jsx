import React, { useState, useEffect } from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { Sun, Calendar, Sparkles } from 'lucide-react';
import { calendarAPI } from '../services/calendarAPI';

const Pournami = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [pournamiDates, setPournamiDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);

  useEffect(() => {
    fetchPournamiDates();
  }, [selectedYear]);

  const fetchPournamiDates = async () => {
    setLoading(true);
    try {
      const allDates = [];
      
      for (let month = 1; month <= 12; month++) {
        const specialDays = await calendarAPI.getSpecialDays(selectedYear, month);
        if (specialDays && specialDays.pournami) {
          allDates.push(...specialDays.pournami.map(d => ({ date: d, month })));
        }
      }
      
      setPournamiDates(allDates);
    } catch (error) {
      console.error('Error fetching pournami dates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Sun className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Pournami Dates</h1>
          <p className="text-yellow-100 text-lg">பௌர்ணமி தேதிகள் - Full Moon Days</p>
        </div>

        {/* Year Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-4">
            <label className="text-gray-700 font-semibold">Select Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-6 py-3 border-2 border-yellow-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white font-medium"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pournami Dates */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Pournami Dates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dates List */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Pournami Dates {selectedYear}</h2>
              
              {pournamiDates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pournamiDates.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-4 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Sun className="w-8 h-8 text-yellow-600" />
                        <div>
                          <p className="font-semibold text-gray-800">{item.date}</p>
                          <p className="text-sm text-gray-600">பௌர்ணமி</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Sun className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No Pournami dates available for {selectedYear}</p>
                  <p className="text-sm text-gray-500 mt-2">Please select December 2025 to see sample data</p>
                </div>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-lg p-6 border-2 border-orange-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-orange-600" />
                  About Pournami
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Pournami (பௌர்ணமி) is the Full Moon day in the Tamil calendar. It is considered highly auspicious for prayers, fasting, and religious observances.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Many Hindus observe vratham (fasting) on this day and visit temples to perform special prayers.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Religious Significance</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Ideal for Satyanarayan Puja</li>
                  <li>• Lakshmi prayers are auspicious</li>
                  <li>• Good for charity and donations</li>
                  <li>• Fasting brings spiritual benefits</li>
                  <li>• Temple visits are recommended</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 border-2 border-green-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Rituals & Observances</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Wake up early morning</li>
                  <li>• Take holy bath</li>
                  <li>• Perform puja at home</li>
                  <li>• Chant Vishnu Sahasranamam</li>
                  <li>• Offer prayers to Moon God</li>
                  <li>• Break fast after moonrise</li>
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

export default Pournami;

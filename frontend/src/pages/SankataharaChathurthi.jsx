import React, { useState, useEffect } from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { CircleDot, Sparkles, Shield } from 'lucide-react';
import { calendarAPI } from '../services/calendarAPI';

const SankataharaChathurthi = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chathurthiDates, setChathurthiDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);

  useEffect(() => {
    fetchChathurthiDates();
  }, [selectedYear]);

  const fetchChathurthiDates = async () => {
    setLoading(true);
    try {
      const allDates = [];
      
      for (let month = 1; month <= 12; month++) {
        const specialDays = await calendarAPI.getSpecialDays(selectedYear, month);
        if (specialDays && specialDays.sankatharaChathurthi) {
          allDates.push(...specialDays.sankatharaChathurthi.map(d => ({ date: d, month })));
        }
      }
      
      setChathurthiDates(allDates);
    } catch (error) {
      console.error('Error fetching sankatahara chathurthi dates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <CircleDot className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Sankatahara Chathurthi</h1>
          <p className="text-amber-200 text-lg">சங்கடஹர சதுர்த்தி - Lord Ganesha Worship Days</p>
        </div>

        {/* Year Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-4">
            <label className="text-gray-700 font-semibold">Select Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-6 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-medium"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chathurthi Dates */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Sankatahara Chathurthi Dates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dates List */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Sankatahara Chathurthi Dates {selectedYear}</h2>
              
              {chathurthiDates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chathurthiDates.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-4 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <CircleDot className="w-8 h-8 text-amber-600" />
                        <div>
                          <p className="font-semibold text-gray-800">{item.date}</p>
                          <p className="text-sm text-gray-600">சங்கடஹர சதுர்த்தி</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CircleDot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No Sankatahara Chathurthi dates available for {selectedYear}</p>
                  <p className="text-sm text-gray-500 mt-2">Please select December 2025 to see sample data</p>
                </div>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-lg p-6 border-2 border-orange-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-orange-600" />
                  About Sankatahara Chathurthi
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Sankatahara Chathurthi (சங்கடஹர சதுர்த்தி) falls on the 4th day of Krishna Paksha (waning moon). It is dedicated to Lord Ganesha.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  "Sankatahara" means "remover of troubles." Worshipping Ganesha on this day removes all obstacles and difficulties.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl shadow-lg p-6 border-2 border-red-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">How to Observe</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Fast during the day</li>
                  <li>• Perform Ganesha Puja</li>
                  <li>• Offer modak and durva grass</li>
                  <li>• Chant Ganesha mantras</li>
                  <li>• Break fast after moonrise</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 border-2 border-green-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Puja Items</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Modak (21 pieces)</li>
                  <li>• Durva grass</li>
                  <li>• Red flowers</li>
                  <li>• Coconut</li>
                  <li>• Fruits and sweets</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Benefits
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Removes all obstacles</li>
                  <li>• Grants success in endeavors</li>
                  <li>• Provides wisdom</li>
                  <li>• Brings prosperity</li>
                  <li>• Ensures peace of mind</li>
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

export default SankataharaChathurthi;

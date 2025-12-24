import React, { useState, useEffect } from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { Moon, Sparkles, Flame } from 'lucide-react';
import { calendarAPI } from '../services/calendarAPI';

const MaadhaSivarathiri = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [sivarathiriDates, setSivarathiriDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);

  useEffect(() => {
    fetchSivarathiriDates();
  }, [selectedYear]);

  const fetchSivarathiriDates = async () => {
    setLoading(true);
    try {
      const allDates = [];
      
      for (let month = 1; month <= 12; month++) {
        const specialDays = await calendarAPI.getSpecialDays(selectedYear, month);
        if (specialDays && specialDays.maadhasivarathiri) {
          allDates.push(...specialDays.maadhasivarathiri.map(d => ({ date: d, month })));
        }
      }
      
      setSivarathiriDates(allDates);
    } catch (error) {
      console.error('Error fetching maadha sivarathiri dates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 via-gray-700 to-slate-800 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Moon className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Maadha Sivarathiri Dates</h1>
          <p className="text-slate-300 text-lg">மாத சிவராத்திரி தேதிகள் - Monthly Shiva Night</p>
        </div>

        {/* Year Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-4">
            <label className="text-gray-700 font-semibold">Select Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-6 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white font-medium"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sivarathiri Dates */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-slate-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Maadha Sivarathiri Dates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dates List */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Maadha Sivarathiri Dates {selectedYear}</h2>
              
              {sivarathiriDates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sivarathiriDates.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-200 rounded-xl p-4 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Moon className="w-8 h-8 text-slate-700" />
                        <div>
                          <p className="font-semibold text-gray-800">{item.date}</p>
                          <p className="text-sm text-gray-600">மாத சிவராத்திரி</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Moon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No Maadha Sivarathiri dates available for {selectedYear}</p>
                  <p className="text-sm text-gray-500 mt-2">Please select December 2025 to see sample data</p>
                </div>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 border-2 border-indigo-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-indigo-600" />
                  About Maadha Sivarathiri
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Maadha Sivarathiri (மாத சிவராத்திரி) occurs monthly on the 14th day of Krishna Paksha (waning moon). It is dedicated to Lord Shiva.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  While Maha Sivarathiri is the most important, monthly Sivarathiri is also observed by devotees for continuous spiritual benefits.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-lg p-6 border-2 border-orange-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-600" />
                  How to Observe
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Observe strict fast</li>
                  <li>• Night vigil (Jagaran)</li>
                  <li>• Visit Shiva temple</li>
                  <li>• Perform Abhishekam</li>
                  <li>• Chant Om Namah Shivaya</li>
                  <li>• Offer bilva leaves</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Puja Items</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Bilva leaves (essential)</li>
                  <li>• Milk, honey, curd</li>
                  <li>• Vibhuti (sacred ash)</li>
                  <li>• White flowers</li>
                  <li>• Dhatura flowers</li>
                  <li>• Camphor and incense</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 border-2 border-green-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Benefits</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Removal of sins</li>
                  <li>• Moksha (liberation)</li>
                  <li>• Protection from evil</li>
                  <li>• Peace of mind</li>
                  <li>• Family prosperity</li>
                  <li>• Good health</li>
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

export default MaadhaSivarathiri;

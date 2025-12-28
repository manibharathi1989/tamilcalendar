import React, { useState, useEffect, useCallback } from 'react';
import ModernHeader from '@/components/ModernHeader';
import ModernFooter from '@/components/ModernFooter';
import { Star, Sparkles, Sun } from 'lucide-react';
import { calendarAPI } from '@/services/calendarAPI';

const Thiruvonam = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [thiruvonamDates, setThiruvonamDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);

  const fetchThiruvonamDates = useCallback(async () => {
    setLoading(true);
    try {
      const allDates = [];
      
      for (let month = 1; month <= 12; month++) {
        const specialDays = await calendarAPI.getSpecialDays(selectedYear, month);
        if (specialDays && specialDays.thiruvonam) {
          allDates.push(...specialDays.thiruvonam.map(d => ({ date: d, month })));
        }
      }
      
      setThiruvonamDates(allDates);
    } catch (error) {
      console.error('Error fetching thiruvonam dates:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    fetchThiruvonamDates();
  }, [fetchThiruvonamDates]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-green-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 via-green-500 to-yellow-600 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Star className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Thiruvonam Dates</h1>
          <p className="text-yellow-200 text-lg">திருவோணம் தேதிகள் - Sacred Star Day</p>
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

        {/* Thiruvonam Dates */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Thiruvonam Dates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dates List */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Thiruvonam Dates {selectedYear}</h2>
              
              {thiruvonamDates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {thiruvonamDates.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-yellow-50 to-green-50 border-2 border-yellow-200 rounded-xl p-4 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Star className="w-8 h-8 text-yellow-600" />
                        <div>
                          <p className="font-semibold text-gray-800">{item.date}</p>
                          <p className="text-sm text-gray-600">திருவோணம்</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No Thiruvonam dates available for {selectedYear}</p>
                  <p className="text-sm text-gray-500 mt-2">Please select December 2025 to see sample data</p>
                </div>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl shadow-lg p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-green-600" />
                  About Thiruvonam
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Thiruvonam (திருவோணம்) is the birth star of Lord Vishnu (Shravana nakshatra). It is considered highly auspicious for Vishnu worship.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Onam festival in Kerala is celebrated when the moon is in Thiruvonam star during the month of Chingam.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-blue-600" />
                  Significance
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Lord Vishnu's birth star</li>
                  <li>• Highly auspicious day</li>
                  <li>• Good for new beginnings</li>
                  <li>• Vishnu temple visits</li>
                  <li>• Onam celebrations</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-lg p-6 border-2 border-orange-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Rituals</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Vishnu Sahasranamam</li>
                  <li>• Offering tulsi leaves</li>
                  <li>• Lighting lamps</li>
                  <li>• Charity to Brahmins</li>
                  <li>• Fasting (optional)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 border-2 border-purple-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Benefits</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Divine protection</li>
                  <li>• Prosperity and wealth</li>
                  <li>• Family harmony</li>
                  <li>• Spiritual growth</li>
                  <li>• Success in endeavors</li>
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

export default Thiruvonam;
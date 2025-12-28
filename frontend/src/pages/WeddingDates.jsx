import React, { useState, useEffect, useCallback } from 'react';
import ModernHeader from '@/components/ModernHeader';
import ModernFooter from '@/components/ModernFooter';
import { Heart, Calendar } from 'lucide-react';
import { calendarAPI } from '@/services/calendarAPI';

const WeddingDates = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [weddingDates, setWeddingDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);

  const fetchWeddingDates = useCallback(async () => {
    setLoading(true);
    try {
      const allWeddingDates = [];
      
      // Fetch wedding dates for all 12 months
      for (let month = 1; month <= 12; month++) {
        const specialDays = await calendarAPI.getSpecialDays(selectedYear, month);
        if (specialDays && specialDays.weddingDays) {
          allWeddingDates.push(...specialDays.weddingDays.map(w => ({ ...w, month })));
        }
      }
      
      setWeddingDates(allWeddingDates);
    } catch (error) {
      console.error('Error fetching wedding dates:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    fetchWeddingDates();
  }, [fetchWeddingDates]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Heart className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Tamil Wedding Dates</h1>
          <p className="text-pink-100 text-lg">திருமண நல்ல நாட்கள்</p>
        </div>

        {/* Year Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-4">
            <label className="text-gray-700 font-semibold">Select Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-6 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white font-medium"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Wedding Dates List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Wedding Dates...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Auspicious Wedding Dates {selectedYear}</h2>
            
            {weddingDates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {weddingDates.map((wedding, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-xl p-4 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Heart className="w-6 h-6 text-pink-500" />
                      <span className="font-semibold text-gray-800">{wedding.date}</span>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm text-purple-600 font-medium">{wedding.phase}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No wedding dates available for {selectedYear}</p>
                <p className="text-sm text-gray-500 mt-2">Please select December 2025 to see sample data</p>
              </div>
            )}
          </div>
        )}

        {/* Information Box */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 mt-8 border-2 border-yellow-200">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Important Note</h3>
          <p className="text-gray-700 leading-relaxed">
            These dates are based on traditional Tamil calendar calculations. It is recommended to consult with your family astrologer for personalized muhurtham timing based on your horoscope (ஜாதகம்) and specific requirements. Different regions and communities may follow slightly different traditions.
          </p>
        </div>
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default WeddingDates;
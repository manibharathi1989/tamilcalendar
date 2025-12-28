import React, { useState, useEffect, useCallback } from 'react';
import ModernHeader from '@/components/ModernHeader';
import ModernFooter from '@/components/ModernFooter';
import { PartyPopper, Calendar } from 'lucide-react';
import { calendarAPI } from '@/services/calendarAPI';

const FestivalDates = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);

  const fetchFestivals = useCallback(async () => {
    setLoading(true);
    try {
      const allFestivals = [];
      
      // Fetch festivals for all 12 months
      for (let month = 1; month <= 12; month++) {
        const specialDays = await calendarAPI.getSpecialDays(selectedYear, month);
        if (specialDays && specialDays.festivals) {
          allFestivals.push(...specialDays.festivals.map(f => ({ ...f, month })));
        }
      }
      
      setFestivals(allFestivals);
    } catch (error) {
      console.error('Error fetching festivals:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    fetchFestivals();
  }, [fetchFestivals]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <PartyPopper className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Tamil Festival Dates</h1>
          <p className="text-yellow-100 text-lg">தமிழ் திருவிழா தேதிகள்</p>
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

        {/* Festivals List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Festivals...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tamil Festivals {selectedYear}</h2>
            
            {festivals.length > 0 ? (
              <div className="space-y-4">
                {festivals.map((festival, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <PartyPopper className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{festival.english}</h3>
                        <p className="text-lg text-purple-600 mb-2">{festival.tamil}</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <p className="text-gray-600 font-medium">{festival.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <PartyPopper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No festivals available for {selectedYear}</p>
                <p className="text-sm text-gray-500 mt-2">Please select December 2025 to see sample data</p>
              </div>
            )}
          </div>
        )}

        {/* Popular Festivals Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-lg p-6 border-2 border-orange-200">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Major Tamil Festivals</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Pongal (பொங்கல்) - Harvest Festival</li>
              <li>• Tamil New Year (தமிழ் புத்தாண்டு)</li>
              <li>• Diwali (தீபாவளி) - Festival of Lights</li>
              <li>• Karthigai Deepam (கார்த்திகை தீபம்)</li>
              <li>• Aadi Perukku (ஆடி பெருக்கு)</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 border-2 border-purple-200">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Religious Observances</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Vaigunda Ekadasi (வைகுண்ட ஏகாதசி)</li>
              <li>• Maha Shivaratri (மகா சிவராத்திரி)</li>
              <li>• Vinayagar Chaturthi (விநாயகர் சதுர்த்தி)</li>
              <li>• Navaratri (நவராத்திரி)</li>
              <li>• Aadi Amavasai (ஆடி அமாவாசை)</li>
            </ul>
          </div>
        </div>
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default FestivalDates;
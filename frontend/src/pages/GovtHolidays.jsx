import React, { useState, useEffect, useCallback } from 'react';
import ModernHeader from '@/components/ModernHeader';
import ModernFooter from '@/components/ModernFooter';
import { Flag, Calendar } from 'lucide-react';
import { calendarAPI } from '@/services/calendarAPI';

const GovtHolidays = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);

  const fetchHolidays = useCallback(async () => {
    setLoading(true);
    try {
      const allHolidays = [];
      
      // Fetch holidays for all 12 months
      for (let month = 1; month <= 12; month++) {
        const specialDays = await calendarAPI.getSpecialDays(selectedYear, month);
        if (specialDays && specialDays.govtHolidays) {
          allHolidays.push(...specialDays.govtHolidays.map(h => ({ ...h, month })));
        }
      }
      
      setHolidays(allHolidays);
    } catch (error) {
      console.error('Error fetching holidays:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Flag className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Tamil Nadu Government Holidays</h1>
          <p className="text-red-100 text-lg">தமிழக அரசு முன்பு விடுமுறைகள்</p>
        </div>

        {/* Year Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-4">
            <label className="text-gray-700 font-semibold">Select Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-6 py-3 border-2 border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white font-medium"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Holidays List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Holidays...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Government Holidays {selectedYear}</h2>
            
            {holidays.length > 0 ? (
              <div className="space-y-4">
                {holidays.map((holiday, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <Flag className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{holiday.english}</h3>
                        <p className="text-lg text-purple-600 mb-2">{holiday.tamil}</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <p className="text-gray-600 font-medium">{holiday.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Flag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No government holidays available for {selectedYear}</p>
                <p className="text-sm text-gray-500 mt-2">Please select December 2025 to see sample data</p>
              </div>
            )}
          </div>
        )}

        {/* Information */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 mt-8 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Important Information</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• These are general public holidays declared by Tamil Nadu Government</li>
            <li>• Holidays may vary for different government departments</li>
            <li>• Banks, schools, and government offices remain closed on these days</li>
            <li>• Optional holidays may be available as per government rules</li>
            <li>• Please check with your organization for specific holiday policy</li>
          </ul>
        </div>
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default GovtHolidays;
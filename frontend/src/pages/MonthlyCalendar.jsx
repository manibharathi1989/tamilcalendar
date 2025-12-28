import React, { useState, useEffect, useCallback } from 'react';
import ModernHeader from '../components/ModernHeader.jsx';
import ModernFooter from '../components/ModernFooter.jsx';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { calendarAPI } from '../services/calendarAPI.js';
import { useParams } from 'react-router-dom';

const MonthlyCalendar = () => {
  const { year: urlYear } = useParams();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(parseInt(urlYear) || new Date().getFullYear());
  const [monthData, setMonthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMonthData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all days for the month
      const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
      const promises = [];
      
      for (let day = 1; day <= daysInMonth; day++) {
        promises.push(calendarAPI.getDailyCalendar(currentYear, currentMonth, day));
      }
      
      const results = await Promise.all(promises);
      
      // Filter out any null responses (failed requests)
      const validResults = results.filter(day => day !== null);
      
      if (validResults.length === 0) {
        setError("Unable to fetch calendar data. Please check your connection.");
      }
      
      setMonthData(validResults);
    } catch (error) {
      console.error('Error fetching month data:', error);
      setError("An error occurred while loading the calendar.");
    } finally {
      setLoading(false);
    }
  }, [currentMonth, currentYear]);

  useEffect(() => {
    fetchMonthData();
  }, [fetchMonthData]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const goToPreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        <ModernHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading Monthly Calendar...</p>
          </div>
        </div>
        <ModernFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Month Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={goToPreviousMonth}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous Month
            </button>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">
                {monthNames[currentMonth - 1]} {currentYear}
              </h1>
              <p className="text-gray-600 mt-1">Tamil Monthly Calendar</p>
            </div>
            
            <button
              onClick={goToNextMonth}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Next Month
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center mb-6">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-red-800 mb-2">Data Unavailable</h3>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchMonthData}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Calendar Grid */}
        {!error && monthData.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {monthData.map((dayData, index) => {
                const date = new Date(dayData.date);
                const day = date.getDate();
                
                return (
                  <div
                    key={index}
                    className="border-2 border-orange-100 rounded-xl p-4 hover:shadow-lg hover:border-orange-300 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-3xl font-bold text-orange-600">{day}</div>
                        <div className="text-sm text-gray-600">{dayData.english_day}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-purple-600">{dayData.tamil_day}</div>
                        <div className="text-xs text-gray-500">{dayData.tamil_month}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="bg-yellow-50 rounded p-2">
                        <p className="font-semibold text-yellow-800 text-xs">Nalla Neram</p>
                        <p className="text-yellow-700 text-xs">{dayData.nalla_neram?.morning}</p>
                      </div>
                      
                      <div className="bg-red-50 rounded p-2">
                        <p className="font-semibold text-red-800 text-xs">Raahu Kaalam</p>
                        <p className="text-red-700 text-xs">{dayData.raahu_kaalam}</p>
                      </div>
                      
                      <div className="bg-purple-50 rounded p-2">
                        <p className="font-semibold text-purple-800 text-xs">Star</p>
                        <p className="text-purple-700 text-xs line-clamp-2">{dayData.star}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : !loading && !error && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No calendar data found for this month.</p>
          </div>
        )}
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default MonthlyCalendar;
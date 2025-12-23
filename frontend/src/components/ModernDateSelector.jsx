import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const ModernDateSelector = ({ currentDate, onDateChange }) => {
  const [date, setDate] = useState(currentDate.getDate());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSubmit = () => {
    const newDate = new Date(year, month - 1, date);
    onDateChange(newDate);
  };

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const formatTime = () => {
    return currentTime.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-xl p-6 mb-6 border border-orange-100">
      {/* Current Time */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-orange-600 animate-pulse" />
        <p className="text-lg font-semibold text-gray-800">
          Indian Time: <span className="text-orange-600">{formatTime()}</span>
        </p>
      </div>

      {/* Date Selection */}
      <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
        <select
          value={date}
          onChange={(e) => setDate(parseInt(e.target.value))}
          className="px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white font-medium text-gray-700 hover:border-orange-300 transition-colors"
        >
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          className="px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white font-medium text-gray-700 hover:border-orange-300 transition-colors"
        >
          {months.map((m, idx) => (
            <option key={idx + 1} value={idx + 1}>
              {m}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white font-medium text-gray-700 hover:border-orange-300 transition-colors"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          <Calendar className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Navigation */}
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={goToPreviousDay}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-orange-200 rounded-xl hover:bg-orange-50 hover:border-orange-300 transition-all transform hover:scale-105"
        >
          <ChevronLeft className="w-4 h-4 text-orange-600" />
          <span className="font-medium text-gray-700">Previous</span>
        </button>
        
        <button
          onClick={goToToday}
          className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
        >
          Today
        </button>
        
        <button
          onClick={goToNextDay}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-orange-200 rounded-xl hover:bg-orange-50 hover:border-orange-300 transition-all transform hover:scale-105"
        >
          <span className="font-medium text-gray-700">Next</span>
          <ChevronRight className="w-4 h-4 text-orange-600" />
        </button>
      </div>
    </div>
  );
};

export default ModernDateSelector;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DateSelector = ({ currentDate, onDateChange }) => {
  const [date, setDate] = useState(currentDate.getDate());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSubmit = () => {
    const newDate = new Date(year, month - 1, date);
    onDateChange(newDate);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleString('en-IN', {
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
    <div className="bg-white border border-gray-300 p-6 mb-4">
      <div className="text-center mb-4">
        <p className="text-lg font-semibold text-gray-700">
          Indian Time Now: {getCurrentTime()}
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
        <select
          value={date}
          onChange={(e) => setDate(parseInt(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.value} ({m.label})
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors"
        >
          Submit
        </button>
      </div>

      <div className="flex justify-center items-center gap-4 text-blue-600">
        <Link to="/yesterday" className="hover:text-blue-800 hover:underline">
          Yesterday
        </Link>
        <span className="text-gray-400">|</span>
        <Link to="/today" className="hover:text-blue-800 hover:underline font-semibold">
          Today
        </Link>
        <span className="text-gray-400">|</span>
        <Link to="/tomorrow" className="hover:text-blue-800 hover:underline">
          Tomorrow
        </Link>
      </div>

      <div className="flex justify-center items-center gap-4 text-blue-600 mt-2">
        <Link to="/previous-day" className="hover:text-blue-800 hover:underline">
          Previous Day
        </Link>
        <span className="text-gray-400">|</span>
        <Link to="/next-day" className="hover:text-blue-800 hover:underline">
          Next Day
        </Link>
      </div>
    </div>
  );
};

export default DateSelector;

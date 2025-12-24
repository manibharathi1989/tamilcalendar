import React, { useState } from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { Search, Calendar as CalendarIcon, Filter, Download } from 'lucide-react';
import { calendarAPI } from '../services/calendarAPI';

const SearchPage = () => {
  const [searchType, setSearchType] = useState('date');
  const [searchDate, setSearchDate] = useState('');
  const [searchEvent, setSearchEvent] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const eventTypes = [
    { value: 'pournami', label: 'Pournami (Full Moon)' },
    { value: 'amavasai', label: 'Amavasai (New Moon)' },
    { value: 'pradosham', label: 'Pradosham' },
    { value: 'ekadasi', label: 'Ekadasi' },
    { value: 'festival', label: 'Festivals' },
    { value: 'wedding', label: 'Wedding Days' },
    { value: 'govt_holiday', label: 'Government Holidays' },
  ];

  const handleSearch = async () => {
    if (!searchDate && !searchEvent) return;
    
    setLoading(true);
    try {
      if (searchType === 'date' && searchDate) {
        const date = new Date(searchDate);
        const data = await calendarAPI.getDailyCalendar(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        );
        setResults([data]);
      } else if (searchType === 'event' && searchEvent) {
        // Search for events across the year
        const year = new Date().getFullYear();
        const allEvents = [];
        
        for (let month = 1; month <= 12; month++) {
          const specialDays = await calendarAPI.getSpecialDays(year, month);
          if (specialDays && specialDays[searchEvent]) {
            allEvents.push(...specialDays[searchEvent]);
          }
        }
        
        setResults(allEvents);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Search className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Search Calendar</h1>
          <p className="text-blue-100 text-lg">Find specific dates, events, and auspicious timings</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Search Type</label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">Search by Date</option>
                <option value="event">Search by Event Type</option>
              </select>
            </div>

            {searchType === 'date' ? (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Select Date</label>
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Event Type</label>
                <select
                  value={searchEvent}
                  onChange={(e) => setSearchEvent(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select event type</option>
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Search className="w-5 h-5" />
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Search Results ({results.length})
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
            
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200"
                >
                  {typeof result === 'string' ? (
                    <p className="font-semibold text-gray-800">{result}</p>
                  ) : (
                    <div>
                      <p className="text-xl font-bold text-gray-800 mb-2">
                        {result.tamil_date}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-600">Day</p>
                          <p className="font-semibold text-gray-800">{result.tamil_day}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Nalla Neram</p>
                          <p className="font-semibold text-gray-800 text-sm">{result.nalla_neram?.morning}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Raahu Kaalam</p>
                          <p className="font-semibold text-gray-800">{result.raahu_kaalam}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && results.length === 0 && searchDate && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No results found. Try different search criteria.</p>
          </div>
        )}
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default SearchPage;

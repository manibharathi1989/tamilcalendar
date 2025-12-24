import React, { useState } from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { Search as SearchIcon, Calendar, Filter, X } from 'lucide-react';
import { calendarAPI } from '../services/calendarAPI';

const Search = () => {
  const [searchType, setSearchType] = useState('date');
  const [selectedDate, setSelectedDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventType, setEventType] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const eventTypes = [
    { value: '', label: 'All Events' },
    { value: 'pournami', label: 'Pournami (பௌர்ணமி)' },
    { value: 'amavasai', label: 'Amavasai (அமாவாசை)' },
    { value: 'pradosham', label: 'Pradosham (பிரதோஷம்)' },
    { value: 'ekadhasi', label: 'Ekadasi (ஏகாதசி)' },
    { value: 'karthigai', label: 'Karthigai (கார்த்திகை)' },
    { value: 'sashti_viradham', label: 'Sashti Viradham (ஷஷ்டி விரதம்)' },
    { value: 'sankatahara_chathurthi', label: 'Sankatahara Chathurthi' },
    { value: 'thiruvonam', label: 'Thiruvonam (திருவோணம்)' },
    { value: 'maadha_sivarathiri', label: 'Maadha Sivarathiri' },
    { value: 'ashtami', label: 'Ashtami (அஷ்டமி)' },
    { value: 'navami', label: 'Navami (நவமி)' },
    { value: 'festival', label: 'Festivals (பண்டிகைகள்)' },
    { value: 'govt_holiday', label: 'Government Holidays' },
    { value: 'wedding', label: 'Wedding Days (திருமண நாள்)' },
  ];

  const handleDateSearch = async () => {
    console.log('handleDateSearch called, selectedDate:', selectedDate);
    if (!selectedDate) {
      console.log('No date selected, returning');
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const [year, month, day] = selectedDate.split('-').map(Number);
      console.log('Fetching calendar for:', year, month, day);
      const data = await calendarAPI.getDailyCalendar(year, month, day);
      console.log('Received data:', data);
      setResults({ type: 'date', data });
    } catch (error) {
      console.error('Search error:', error);
      setResults({ type: 'date', data: null });
    } finally {
      setLoading(false);
    }
  };

  const handleRangeSearch = async () => {
    console.log('handleRangeSearch called, startDate:', startDate, 'endDate:', endDate, 'eventType:', eventType);
    if (!startDate || !endDate) {
      console.log('Missing dates, returning');
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      console.log('Fetching search results...');
      const data = await calendarAPI.searchCalendar(startDate, endDate, eventType || null);
      console.log('Received search data:', data);
      setResults({ type: 'range', data });
    } catch (error) {
      console.error('Search error:', error);
      setResults({ type: 'range', data: [] });
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSelectedDate('');
    setStartDate('');
    setEndDate('');
    setEventType('');
    setResults(null);
    setSearched(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <SearchIcon className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Search Calendar</h1>
          <p className="text-blue-200 text-lg">நாட்காட்டி தேடல் - Find Dates & Events</p>
        </div>

        {/* Search Options */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          {/* Search Type Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setSearchType('date')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                searchType === 'date'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Calendar className="w-5 h-5 inline mr-2" />
              Search by Date
            </button>
            <button
              onClick={() => setSearchType('range')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                searchType === 'range'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-5 h-5 inline mr-2" />
              Search by Range & Type
            </button>
          </div>

          {/* Date Search */}
          {searchType === 'date' && (
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min="2005-01-01"
                  max="2026-12-31"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleDateSearch}
                disabled={!selectedDate || loading}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          )}

          {/* Range Search */}
          {searchType === 'range' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min="2005-01-01"
                    max="2026-12-31"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || '2005-01-01'}
                    max="2026-12-31"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Event Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {eventTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleRangeSearch}
                  disabled={!startDate || !endDate || loading}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
                {searched && (
                  <button
                    onClick={clearSearch}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                  >
                    <X className="w-5 h-5 inline mr-2" />
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Searching...</p>
          </div>
        )}

        {!loading && results && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {results.type === 'date' && results.data && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Calendar Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Date Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Tamil Date:</strong> {results.data.tamil_date}</p>
                      <p><strong>Tamil Day:</strong> {results.data.tamil_day}</p>
                      <p><strong>English Day:</strong> {results.data.english_day}</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border-2 border-green-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Auspicious Times</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Nalla Neram (Morning):</strong> {results.data.nalla_neram?.morning}</p>
                      <p><strong>Nalla Neram (Evening):</strong> {results.data.nalla_neram?.evening}</p>
                      <p><strong>Raahu Kaalam:</strong> {results.data.raahu_kaalam}</p>
                      <p><strong>Yemagandam:</strong> {results.data.yemagandam}</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Daily Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Thithi:</strong> {results.data.thithi}</p>
                      <p><strong>Star:</strong> {results.data.star}</p>
                      <p><strong>Soolam:</strong> {results.data.soolam?.tamil}</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Subakariyam</h3>
                    <p className="text-sm text-gray-700">{results.data.subakariyam}</p>
                  </div>
                </div>
              </div>
            )}

            {results.type === 'range' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Found {results.data.length} Events
                </h2>
                {results.data.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.data.map((event, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <Calendar className="w-8 h-8 text-blue-600" />
                          <div>
                            <p className="font-semibold text-gray-800">
                              {new Date(event.date).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                weekday: 'long'
                              })}
                            </p>
                            <p className="text-sm text-gray-600">
                              {event.tamil_name || event.type}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No events found for the selected criteria</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {!loading && searched && !results?.data && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No results found</p>
          </div>
        )}
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default Search;

import React, { useState, useRef } from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { Printer, Download, Calendar, FileText } from 'lucide-react';
import { calendarAPI } from '../services/calendarAPI';

const PrintCalendar = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [printType, setPrintType] = useState('month');
  const [calendarData, setCalendarData] = useState(null);
  const [loading, setLoading] = useState(false);
  const printRef = useRef(null);

  const years = Array.from({ length: 22 }, (_, i) => 2005 + i);
  const months = [
    { value: 1, label: 'January - ஜனவரி' },
    { value: 2, label: 'February - பிப்ரவரி' },
    { value: 3, label: 'March - மார்ச்' },
    { value: 4, label: 'April - ஏப்ரல்' },
    { value: 5, label: 'May - மே' },
    { value: 6, label: 'June - ஜூன்' },
    { value: 7, label: 'July - ஜூலை' },
    { value: 8, label: 'August - ஆகஸ்ட்' },
    { value: 9, label: 'September - செப்டம்பர்' },
    { value: 10, label: 'October - அக்டோபர்' },
    { value: 11, label: 'November - நவம்பர்' },
    { value: 12, label: 'December - டிசம்பர்' },
  ];

  const tamilMonths = ['தை', 'மாசி', 'பங்குனி', 'சித்திரை', 'வைகாசி', 'ஆனி', 'ஆடி', 'ஆவணி', 'புரட்டாசி', 'ஐப்பசி', 'கார்த்திகை', 'மார்கழி'];

  const fetchCalendarData = async () => {
    setLoading(true);
    try {
      const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
      const monthData = [];
      
      for (let day = 1; day <= daysInMonth; day++) {
        const data = await calendarAPI.getDailyCalendar(selectedYear, selectedMonth, day);
        monthData.push({ day, ...data });
      }
      
      const specialDays = await calendarAPI.getSpecialDays(selectedYear, selectedMonth);
      
      setCalendarData({ days: monthData, specialDays });
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Tamil Calendar - ${months[selectedMonth - 1].label} ${selectedYear}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f97316; color: white; }
            .header { text-align: center; margin-bottom: 20px; }
            .header h1 { color: #f97316; margin: 0; }
            .header p { color: #666; }
            .tamil { font-size: 12px; color: #666; }
            .special { background-color: #fef3c7; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const downloadCSV = () => {
    if (!calendarData) return;
    
    const headers = ['Date', 'Tamil Date', 'Day (Tamil)', 'Nalla Neram Morning', 'Nalla Neram Evening', 'Raahu Kaalam', 'Subakariyam'];
    const rows = calendarData.days.map(day => [
      `${day.day}/${selectedMonth}/${selectedYear}`,
      day.tamil_date || '',
      day.tamil_day || '',
      day.nalla_neram?.morning || '',
      day.nalla_neram?.evening || '',
      day.raahu_kaalam || '',
      day.subakariyam || ''
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `tamil_calendar_${selectedYear}_${selectedMonth}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Printer className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Print / Download Calendar</h1>
          <p className="text-green-200 text-lg">நாட்காட்டி அச்சிடு / பதிவிறக்கு</p>
        </div>

        {/* Options */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Format</label>
              <select
                value={printType}
                onChange={(e) => setPrintType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="month">Monthly View</option>
                <option value="detailed">Detailed View</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchCalendarData}
                disabled={loading}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition-all"
              >
                {loading ? 'Loading...' : 'Generate'}
              </button>
            </div>
          </div>

          {calendarData && (
            <div className="flex gap-4 justify-center">
              <button
                onClick={handlePrint}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <Printer className="w-5 h-5" />
                Print Calendar
              </button>
              <button
                onClick={downloadCSV}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download CSV
              </button>
            </div>
          )}
        </div>

        {/* Preview */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Generating calendar...</p>
          </div>
        )}

        {!loading && calendarData && (
          <div className="bg-white rounded-2xl shadow-lg p-8" ref={printRef}>
            <div className="header text-center mb-6">
              <h1 className="text-3xl font-bold text-orange-500">Tamil Daily Calendar</h1>
              <p className="text-gray-600 text-lg">
                {months[selectedMonth - 1].label} {selectedYear} - {tamilMonths[selectedMonth - 1]}
              </p>
            </div>

            {printType === 'month' && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-orange-500 text-white">
                      <th className="border p-3">Date</th>
                      <th className="border p-3">Tamil Date</th>
                      <th className="border p-3">Day</th>
                      <th className="border p-3">Nalla Neram</th>
                      <th className="border p-3">Raahu Kaalam</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calendarData.days.map((day, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="border p-3 font-bold">{day.day}</td>
                        <td className="border p-3">{day.tamil_date}</td>
                        <td className="border p-3">
                          <span>{day.english_day}</span>
                          <br />
                          <span className="text-sm text-gray-600">{day.tamil_day}</span>
                        </td>
                        <td className="border p-3 text-sm">
                          {day.nalla_neram?.morning}<br />
                          {day.nalla_neram?.evening}
                        </td>
                        <td className="border p-3">{day.raahu_kaalam}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {printType === 'detailed' && (
              <div className="space-y-4">
                {calendarData.days.map((day, index) => (
                  <div key={index} className="border rounded-xl p-4 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">
                          {day.day} {months[selectedMonth - 1].label.split(' - ')[0]} {selectedYear}
                        </h3>
                        <p className="text-gray-600">{day.tamil_date}</p>
                        <p className="text-sm">{day.english_day} - {day.tamil_day}</p>
                      </div>
                      <div className="text-right text-sm">
                        <p><strong>Nalla Neram:</strong> {day.nalla_neram?.morning}</p>
                        <p><strong>Raahu Kaalam:</strong> {day.raahu_kaalam}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">
                      <strong>Subakariyam:</strong> {day.subakariyam}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default PrintCalendar;

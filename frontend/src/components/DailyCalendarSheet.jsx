import React from 'react';

const DailyCalendarSheet = ({ date, calendarData }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="bg-white border border-gray-300 mb-6">
      <div className="bg-sky-200 text-center py-3 border-b border-gray-300">
        <h2 className="text-xl font-bold text-gray-800">{formatDate(date)}</h2>
      </div>

      <div className="p-6">
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 font-semibold text-gray-700 w-1/3">
                தேதி<br />
                <span className="text-sm font-normal">Date</span>
              </td>
              <td className="py-3 px-4 text-gray-800">
                {calendarData.tamilDate}<br />
                {calendarData.tamilDay}
              </td>
            </tr>

            <tr className="border-b border-gray-200 bg-gray-50">
              <td className="py-3 px-4 font-semibold text-gray-700">
                நல்ல நேரம்<br />
                <span className="text-sm font-normal">Nalla Neram</span>
              </td>
              <td className="py-3 px-4 text-gray-800">
                {calendarData.nallaNeram.morning}<br />
                {calendarData.nallaNeram.evening}
              </td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 font-semibold text-gray-700">
                கௌரி நல்ல நேரம்<br />
                <span className="text-sm font-normal">Gowri Nalla Neram</span>
              </td>
              <td className="py-3 px-4 text-gray-800">
                {calendarData.gowriNallaNeram.morning}<br />
                {calendarData.gowriNallaNeram.evening}
              </td>
            </tr>

            <tr className="border-b border-gray-200 bg-gray-50">
              <td className="py-3 px-4 font-semibold text-gray-700">
                இராகு காலம்<br />
                <span className="text-sm font-normal">Raahu Kaalam</span>
              </td>
              <td className="py-3 px-4 text-gray-800">{calendarData.raahuKaalam}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 font-semibold text-gray-700">
                எமகண்டம்<br />
                <span className="text-sm font-normal">Yemagandam</span>
              </td>
              <td className="py-3 px-4 text-gray-800">{calendarData.yemagandam}</td>
            </tr>

            <tr className="border-b border-gray-200 bg-gray-50">
              <td className="py-3 px-4 font-semibold text-gray-700">
                குளிகை<br />
                <span className="text-sm font-normal">Kuligai</span>
              </td>
              <td className="py-3 px-4 text-gray-800">{calendarData.kuligai}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 font-semibold text-gray-700">
                சூலம்<br />
                <span className="text-sm font-normal">Soolam</span>
              </td>
              <td className="py-3 px-4 text-gray-800">
                {calendarData.soolam.tamil}<br />
                {calendarData.soolam.english}
              </td>
            </tr>

            <tr className="border-b border-gray-200 bg-gray-50">
              <td className="py-3 px-4 font-semibold text-gray-700">
                பரிகாரம்<br />
                <span className="text-sm font-normal">Parigaram</span>
              </td>
              <td className="py-3 px-4 text-gray-800">
                {calendarData.parigaram.tamil}<br />
                {calendarData.parigaram.english}
              </td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 font-semibold text-gray-700">
                சந்திராஷ்டமம்<br />
                <span className="text-sm font-normal">Chandirashtamam</span>
              </td>
              <td className="py-3 px-4 text-gray-800">{calendarData.chandirashtamam}</td>
            </tr>

            <tr className="border-b border-gray-200 bg-gray-50">
              <td className="py-3 px-4 font-semibold text-gray-700">
                நாள்<br />
                <span className="text-sm font-normal">Naal</span>
              </td>
              <td className="py-3 px-4 text-gray-800">{calendarData.naal}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 font-semibold text-gray-700">
                லக்னம்<br />
                <span className="text-sm font-normal">Lagnam</span>
              </td>
              <td className="py-3 px-4 text-gray-800">{calendarData.lagnam}</td>
            </tr>

            <tr className="border-b border-gray-200 bg-gray-50">
              <td className="py-3 px-4 font-semibold text-gray-700">
                சூரிய உதயம்<br />
                <span className="text-sm font-normal">Sun Rise</span>
              </td>
              <td className="py-3 px-4 text-gray-800">{calendarData.sunRise}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 font-semibold text-gray-700">
                ஸ்ரார்த திதி<br />
                <span className="text-sm font-normal">Sraardha Thithi</span>
              </td>
              <td className="py-3 px-4 text-gray-800">{calendarData.sraardhaThithi}</td>
            </tr>

            <tr className="border-b border-gray-200 bg-gray-50">
              <td className="py-3 px-4 font-semibold text-gray-700">
                திதி<br />
                <span className="text-sm font-normal">Thithi</span>
              </td>
              <td className="py-3 px-4 text-gray-800">{calendarData.thithi}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 font-semibold text-gray-700">
                நட்சத்திரம்<br />
                <span className="text-sm font-normal">Star</span>
              </td>
              <td className="py-3 px-4 text-gray-800">{calendarData.star}</td>
            </tr>

            <tr className="border-b border-gray-200 bg-gray-50">
              <td className="py-3 px-4 font-semibold text-gray-700">
                யோகம்<br />
                <span className="text-sm font-normal">Yogam</span>
              </td>
              <td className="py-3 px-4 text-gray-800">{calendarData.yogam}</td>
            </tr>

            <tr>
              <td className="py-3 px-4 font-semibold text-gray-700">
                சுபகாரியம்<br />
                <span className="text-sm font-normal">Subakariyam</span>
              </td>
              <td className="py-3 px-4 text-gray-800">{calendarData.subakariyam}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyCalendarSheet;

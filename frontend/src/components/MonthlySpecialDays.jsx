import React from 'react';
import { Calendar, Star, Moon, Sun } from 'lucide-react';

const MonthlySpecialDays = ({ specialDays, month, year }) => {
  return (
    <div className="bg-white border border-gray-300 p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
        Tamil Calendar December 2025
      </h3>

      <div className="space-y-4">
        {/* Amavasai */}
        <div className="border-b border-gray-200 pb-3">
          <div className="flex items-start gap-3">
            <Moon className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-700">Amavasai</p>
              {specialDays.amavasai.map((date, idx) => (
                <p key={idx} className="text-gray-600 text-sm">
                  {date}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Pournami */}
        <div className="border-b border-gray-200 pb-3">
          <div className="flex items-start gap-3">
            <Sun className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-700">Pournami</p>
              {specialDays.pournami.map((date, idx) => (
                <p key={idx} className="text-gray-600 text-sm">
                  {date}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Karthigai */}
        <div className="border-b border-gray-200 pb-3">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-700">Karthigai</p>
              {specialDays.karthigai.map((date, idx) => (
                <p key={idx} className="text-gray-600 text-sm">
                  {date}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Sashti Viradham */}
        <div className="border-b border-gray-200 pb-3">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-700">Sashti Viradham</p>
              {specialDays.sashtiViradham.map((date, idx) => (
                <p key={idx} className="text-gray-600 text-sm">
                  {date}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Sankatahara Chathurthi */}
        <div className="border-b border-gray-200 pb-3">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-700">Sankatahara Chathurthi</p>
              {specialDays.sankatharaChathurthi.map((date, idx) => (
                <p key={idx} className="text-gray-600 text-sm">
                  {date}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Chathurthi */}
        <div className="border-b border-gray-200 pb-3">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-700">Chathurthi</p>
              {specialDays.chathurthi.map((date, idx) => (
                <p key={idx} className="text-gray-600 text-sm">
                  {date}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Pradosham */}
        <div className="border-b border-gray-200 pb-3">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-700">Pradosham</p>
              {specialDays.pradosham.map((date, idx) => (
                <p key={idx} className="text-gray-600 text-sm">
                  {date}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Thiruvonam */}
        <div className="border-b border-gray-200 pb-3">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-700">Thiruvonam</p>
              {specialDays.thiruvonam.map((date, idx) => (
                <p key={idx} className="text-gray-600 text-sm">
                  {date}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Maadha Sivarathiri */}
        <div className="border-b border-gray-200 pb-3">
          <div className="flex items-start gap-3">
            <Moon className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-700">Maadha Sivarathiri</p>
              {specialDays.maadhasivarathiri.map((date, idx) => (
                <p key={idx} className="text-gray-600 text-sm">
                  {date}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Ekadhasi */}
        <div className="border-b border-gray-200 pb-3">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-700">Ekadhasi</p>
              {specialDays.ekadhasi.map((date, idx) => (
                <p key={idx} className="text-gray-600 text-sm">
                  {date}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Ashtami */}
        <div className="border-b border-gray-200 pb-3">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-700">Ashtami</p>
              {specialDays.ashtami.map((date, idx) => (
                <p key={idx} className="text-gray-600 text-sm">
                  {date}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Navami */}
        <div className="border-b border-gray-200 pb-3">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-700">Navami</p>
              {specialDays.navami.map((date, idx) => (
                <p key={idx} className="text-gray-600 text-sm">
                  {date}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Govt Holidays */}
        <div className="border-b border-gray-200 pb-3">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-700">Govt Holidays</p>
              {specialDays.govtHolidays.map((holiday, idx) => (
                <div key={idx} className="text-gray-600 text-sm mb-1">
                  <p>{holiday.date}</p>
                  <p className="text-xs">{holiday.tamil}</p>
                  <p className="text-xs">{holiday.english}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wedding Days */}
        <div className="border-b border-gray-200 pb-3">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-pink-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-700">Wedding Days</p>
              {specialDays.weddingDays.map((wedding, idx) => (
                <div key={idx} className="text-gray-600 text-sm mb-1">
                  <p>{wedding.date}</p>
                  <p className="text-xs">{wedding.phase}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Festivals */}
        <div className="pb-3">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-700">Festivals</p>
              {specialDays.festivals.map((festival, idx) => (
                <div key={idx} className="text-gray-600 text-sm mb-1">
                  <p>{festival.date}</p>
                  <p className="text-xs">{festival.tamil}</p>
                  <p className="text-xs">{festival.english}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlySpecialDays;

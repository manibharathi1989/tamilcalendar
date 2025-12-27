import React, { useState } from 'react';
import { Calendar, Moon, Sun, Star, Heart, Flag, PartyPopper } from 'lucide-react';

const ModernSpecialDays = ({ specialDays, month, year }) => {
  const [activeTab, setActiveTab] = useState('festivals');

  const tabs = [
    { id: 'festivals', label: 'Festivals', icon: PartyPopper, color: 'text-yellow-600' },
    { id: 'wedding', label: 'Wedding', icon: Heart, color: 'text-pink-600' },
    { id: 'special', label: 'Special Days', icon: Star, color: 'text-purple-600' },
    { id: 'holidays', label: 'Holidays', icon: Flag, color: 'text-red-600' }
  ];

  const DayCard = ({ icon: Icon, title, dates, iconColor = 'text-orange-600' }) => (
    <div className="bg-gradient-to-br from-white to-orange-50 rounded-xl p-4 border border-orange-100 hover:shadow-lg transition-all hover:scale-105">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-800 mb-2">{title}</p>
          {dates.map((date, idx) => (
            <p key={idx} className="text-sm text-gray-600 mb-1">
              {typeof date === 'string' ? date : (
                <>
                  <span className="font-medium">{date.date}</span>
                  {date.tamil && <span className="block text-xs text-gray-500">{date.tamil}</span>}
                  {date.english && <span className="block text-xs text-gray-500">{date.english}</span>}
                  {date.phase && <span className="block text-xs text-purple-600">{date.phase}</span>}
                </>
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
        Tamil Calendar {monthNames[month - 1]} {year}
      </h3>
      <p className="text-center text-purple-600 font-semibold mb-6">
        தமிழ் காலண்டர் {monthNames[month - 1]} {year}
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {activeTab === 'festivals' && (
          <>
            <DayCard icon={PartyPopper} title="Festivals" dates={specialDays.festivals} iconColor="text-yellow-600" />
          </>
        )}
        
        {activeTab === 'wedding' && (
          <>
            <DayCard icon={Heart} title="Wedding Days" dates={specialDays.weddingDays} iconColor="text-pink-600" />
          </>
        )}
        
        {activeTab === 'special' && (
          <>
            <DayCard icon={Moon} title="Amavasai" dates={specialDays.amavasai} iconColor="text-gray-700" />
            <DayCard icon={Sun} title="Pournami" dates={specialDays.pournami} iconColor="text-yellow-500" />
            <DayCard icon={Star} title="Karthigai" dates={specialDays.karthigai} iconColor="text-orange-500" />
            <DayCard icon={Calendar} title="Sashti Viradham" dates={specialDays.sashtiViradham} iconColor="text-green-600" />
            <DayCard icon={Calendar} title="Sankatahara Chathurthi" dates={specialDays.sankatharaChathurthi} iconColor="text-blue-600" />
            <DayCard icon={Calendar} title="Chathurthi" dates={specialDays.chathurthi} iconColor="text-purple-600" />
            <DayCard icon={Star} title="Pradosham" dates={specialDays.pradosham} iconColor="text-indigo-600" />
            <DayCard icon={Star} title="Thiruvonam" dates={specialDays.thiruvonam} iconColor="text-teal-600" />
            <DayCard icon={Moon} title="Maadha Sivarathiri" dates={specialDays.maadhasivarathiri} iconColor="text-purple-700" />
            <DayCard icon={Calendar} title="Ekadhasi" dates={specialDays.ekadhasi} iconColor="text-green-500" />
            <DayCard icon={Calendar} title="Ashtami" dates={specialDays.ashtami} iconColor="text-red-500" />
            <DayCard icon={Calendar} title="Navami" dates={specialDays.navami} iconColor="text-pink-500" />
          </>
        )}
        
        {activeTab === 'holidays' && (
          <>
            <DayCard icon={Flag} title="Government Holidays" dates={specialDays.govtHolidays} iconColor="text-red-600" />
          </>
        )}
      </div>
    </div>
  );
};

export default ModernSpecialDays;

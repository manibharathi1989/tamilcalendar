import React from 'react';
import { Sun, Moon, Clock, Star, AlertCircle } from 'lucide-react';

const ModernDailyCalendar = ({ date, calendarData }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      weekday: 'long'
    });
  };

  const InfoCard = ({ icon: Icon, tamilLabel, englishLabel, value, bgColor = 'bg-gradient-to-br from-orange-50 to-red-50' }) => (
    <div className={`${bgColor} rounded-xl p-4 border border-orange-100 hover:shadow-lg transition-all hover:scale-105`}>
      <div className="flex items-start gap-3">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <Icon className="w-5 h-5 text-orange-600" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-800 text-sm">{tamilLabel}</p>
          <p className="text-xs text-gray-600 mb-2">{englishLabel}</p>
          <p className="text-gray-700 font-medium">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Date Header */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl shadow-xl p-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">{formatDate(date)}</h2>
        <p className="text-orange-100 text-lg">{calendarData.tamil_date}</p>
        <p className="text-orange-100 text-lg font-semibold">{calendarData.tamil_day}</p>
      </div>

      {/* Auspicious Times Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sun className="w-6 h-6 text-yellow-500" />
          <h3 className="text-2xl font-bold text-gray-800">Auspicious Times</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard
            icon={Sun}
            tamilLabel="நல்ல நேரம்"
            englishLabel="Nalla Neram"
            value={`${calendarData.nalla_neram?.morning || ''}\n${calendarData.nalla_neram?.evening || ''}`}
            bgColor="bg-gradient-to-br from-yellow-50 to-orange-50"
          />
          <InfoCard
            icon={Star}
            tamilLabel="கௌரி நல்ல நேரம்"
            englishLabel="Gowri Nalla Neram"
            value={`${calendarData.gowri_nalla_neram?.morning || ''}\n${calendarData.gowri_nalla_neram?.evening || ''}`}
            bgColor="bg-gradient-to-br from-pink-50 to-purple-50"
          />
        </div>
      </div>

      {/* Inauspicious Times Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <h3 className="text-2xl font-bold text-gray-800">Inauspicious Times</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard
            icon={Moon}
            tamilLabel="இராகு காலம்"
            englishLabel="Raahu Kaalam"
            value={calendarData.raahu_kaalam || ''}
            bgColor="bg-gradient-to-br from-red-50 to-pink-50"
          />
          <InfoCard
            icon={Clock}
            tamilLabel="எமகண்டம்"
            englishLabel="Yemagandam"
            value={calendarData.yemagandam || ''}
            bgColor="bg-gradient-to-br from-red-50 to-orange-50"
          />
          <InfoCard
            icon={Clock}
            tamilLabel="குளிகை"
            englishLabel="Kuligai"
            value={calendarData.kuligai || ''}
            bgColor="bg-gradient-to-br from-orange-50 to-yellow-50"
          />
        </div>
      </div>

      {/* Daily Details Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-6 h-6 text-purple-500" />
          <h3 className="text-2xl font-bold text-gray-800">Daily Details</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard
            icon={Star}
            tamilLabel="சூலம்"
            englishLabel="Soolam"
            value={`${calendarData.soolam?.tamil || ''} / ${calendarData.soolam?.english || ''}`}
          />
          <InfoCard
            icon={Sun}
            tamilLabel="பரிகாரம்"
            englishLabel="Parigaram"
            value={`${calendarData.parigaram?.tamil || ''} / ${calendarData.parigaram?.english || ''}`}
          />
          <InfoCard
            icon={Moon}
            tamilLabel="சந்திராஷ்டமம்"
            englishLabel="Chandirashtamam"
            value={calendarData.chandirashtamam || ''}
          />
          <InfoCard
            icon={Star}
            tamilLabel="நாள்"
            englishLabel="Naal"
            value={calendarData.naal || ''}
          />
          <InfoCard
            icon={Sun}
            tamilLabel="லக்னம்"
            englishLabel="Lagnam"
            value={calendarData.lagnam || ''}
          />
          <InfoCard
            icon={Sun}
            tamilLabel="சூரிய உதயம்"
            englishLabel="Sun Rise"
            value={calendarData.sun_rise || ''}
          />
          <InfoCard
            icon={Moon}
            tamilLabel="ஸ்ரார்த திதி"
            englishLabel="Sraardha Thithi"
            value={calendarData.sraardha_thithi || ''}
          />
          <InfoCard
            icon={Moon}
            tamilLabel="திதி"
            englishLabel="Thithi"
            value={calendarData.thithi || ''}
          />
          <InfoCard
            icon={Star}
            tamilLabel="நட்சத்திரம்"
            englishLabel="Star"
            value={calendarData.star || ''}
          />
        </div>
      </div>

      {/* Auspicious Activities */}
      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 border-2 border-green-200">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-bold text-gray-800">சுபகாரியம் / Subakariyam</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">{calendarData.subakariyam || ''}</p>
      </div>
    </div>
  );
};

export default ModernDailyCalendar;

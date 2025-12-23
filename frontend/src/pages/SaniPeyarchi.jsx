import React from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { AlertCircle, TrendingDown, Calendar } from 'lucide-react';

const SaniPeyarchi = () => {
  const rasiList = [
    { id: 'mesham', tamil: 'மேஷம்', english: 'Aries', icon: '♈' },
    { id: 'rishabam', tamil: 'ரிஷபம்', english: 'Taurus', icon: '♉' },
    { id: 'mithunam', tamil: 'மிதுனம்', english: 'Gemini', icon: '♊' },
    { id: 'kadagam', tamil: 'கடகம்', english: 'Cancer', icon: '♋' },
    { id: 'simmam', tamil: 'சிம்மம்', english: 'Leo', icon: '♌' },
    { id: 'kanni', tamil: 'கன்னி', english: 'Virgo', icon: '♍' },
    { id: 'thulam', tamil: 'துலாம்', english: 'Libra', icon: '♎' },
    { id: 'viruchagam', tamil: 'விருச்சகம்', english: 'Scorpio', icon: '♏' },
    { id: 'dhanusu', tamil: 'தனுசு', english: 'Sagittarius', icon: '♐' },
    { id: 'makaram', tamil: 'மகரம்', english: 'Capricorn', icon: '♑' },
    { id: 'kumbam', tamil: 'கும்பம்', english: 'Aquarius', icon: '♒' },
    { id: 'meenam', tamil: 'மீனம்', english: 'Pisces', icon: '♓' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 via-gray-800 to-slate-900 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <AlertCircle className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Sani Peyarchi Palan</h1>
          <p className="text-gray-300 text-lg">சனி பெயர்ச்சி பலன் - Saturn Transit Predictions</p>
        </div>

        {/* Current Transit Info */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 mb-8 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Current Sani Transit 2025-2026</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-2">Current Position</h3>
              <p className="text-2xl font-bold text-blue-600 mb-2">கும்பம் (Aquarius)</p>
              <p className="text-sm text-gray-600">Saturn is currently transiting through Aquarius rasi</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-2">Transit Period</h3>
              <p className="text-lg font-semibold text-gray-700">January 2023 - March 2026</p>
              <p className="text-sm text-gray-600 mt-1">Duration: Approximately 2.5 years</p>
            </div>
          </div>
        </div>

        {/* Sade Sati Info */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-lg p-6 mb-8 border-2 border-orange-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <AlertCircle className="w-7 h-7 text-orange-600" />
            Sade Sati (சடைசதி) - 7.5 Years Period
          </h2>
          <p className="text-gray-700 mb-4">
            Sade Sati is a challenging period when Saturn transits through the 12th, 1st, and 2nd house from your Moon sign. This period lasts approximately 7.5 years.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-red-700 mb-2">Currently Affected</h3>
              <p className="text-sm text-gray-700">மகரம் (Capricorn)</p>
              <p className="text-sm text-gray-700">கும்பம் (Aquarius)</p>
              <p className="text-sm text-gray-700">மீனம் (Pisces)</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-yellow-700 mb-2">Upcoming</h3>
              <p className="text-sm text-gray-700">மீனம் (Pisces) - Next</p>
              <p className="text-sm text-gray-600">Prepare mentally</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-green-700 mb-2">Relief</h3>
              <p className="text-sm text-gray-700">தனுசு (Sagittarius)</p>
              <p className="text-sm text-gray-600">Completed Sade Sati</p>
            </div>
          </div>
        </div>

        {/* Rasi-wise Predictions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Rasi-wise Saturn Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rasiList.map((rasi) => (
              <div
                key={rasi.id}
                className="bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-2">{rasi.icon}</div>
                <h3 className="font-bold text-gray-800 text-lg">{rasi.english}</h3>
                <p className="text-sm text-gray-700 mb-2">{rasi.tamil}</p>
                <p className="text-xs text-gray-600">Click for detailed predictions</p>
              </div>
            ))}
          </div>
        </div>

        {/* Remedies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg p-6 border-2 border-purple-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Sani Remedies</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Visit Shani temple on Saturdays</li>
              <li>• Light sesame oil lamp</li>
              <li>• Donate black items</li>
              <li>• Chant Shani mantras</li>
              <li>• Feed crows and poor people</li>
              <li>• Wear blue sapphire (only after consultation)</li>
              <li>• Respect elders and workers</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 border-2 border-green-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">About Saturn</h3>
            <p className="text-gray-700 text-sm mb-3">
              Saturn (Shani) is known as the strict teacher in Vedic astrology. It represents discipline, hard work, karma, and justice.
            </p>
            <p className="text-gray-700 text-sm mb-3">
              <strong>Transit Duration:</strong> Saturn takes approximately 29.5 years to complete one cycle, spending about 2.5 years in each sign.
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Key Areas:</strong> Career, discipline, responsibilities, delays, obstacles, and karmic lessons.
            </p>
          </div>
        </div>
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default SaniPeyarchi;

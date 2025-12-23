import React from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { Star, TrendingUp, Calendar, Sparkles } from 'lucide-react';

const GuruPeyarchi = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <TrendingUp className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Guru Peyarchi Palan</h1>
          <p className="text-yellow-100 text-lg">குரு பெயர்ச்சி பலன் - Jupiter Transit Predictions</p>
        </div>

        {/* Current Transit Info */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 mb-8 border-2 border-amber-200">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-amber-600" />
            <h2 className="text-2xl font-bold text-gray-800">Current Guru Transit 2025-2026</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-2">Current Position</h3>
              <p className="text-2xl font-bold text-amber-600 mb-2">ரிஷபம் (Taurus)</p>
              <p className="text-sm text-gray-600">Jupiter is currently transiting through Taurus rasi</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-2">Transit Period</h3>
              <p className="text-lg font-semibold text-gray-700">May 1, 2025 - May 14, 2026</p>
              <p className="text-sm text-gray-600 mt-1">Duration: Approximately 13 months</p>
            </div>
          </div>
        </div>

        {/* Rasi-wise Predictions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Rasi-wise Predictions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rasiList.map((rasi, index) => {
              const predictions = ['Excellent', 'Good', 'Moderate', 'Average', 'Challenging'];
              const colors = ['green', 'blue', 'yellow', 'orange', 'red'];
              const predictionIndex = index % predictions.length;
              const color = colors[predictionIndex];
              
              return (
                <div
                  key={rasi.id}
                  className={`bg-gradient-to-br from-${color}-50 to-${color}-100 border-2 border-${color}-200 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer`}
                >
                  <div className="text-3xl mb-2">{rasi.icon}</div>
                  <h3 className="font-bold text-gray-800 text-lg">{rasi.english}</h3>
                  <p className="text-sm text-gray-700 mb-2">{rasi.tamil}</p>
                  <div className={`inline-block px-3 py-1 bg-${color}-200 rounded-full text-${color}-800 text-xs font-semibold`}>
                    {predictions[predictionIndex]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* General Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 border-2 border-green-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-green-600" />
              Positive Effects
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Growth in career and profession</li>
              <li>• Financial prosperity and gains</li>
              <li>• Educational advancement</li>
              <li>• Spiritual growth</li>
              <li>• Marriage and family happiness</li>
              <li>• Children's wellbeing</li>
              <li>• Wisdom and knowledge increase</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-red-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Remedies for Guru</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Worship Lord Vishnu on Thursdays</li>
              <li>• Chant Guru mantras</li>
              <li>• Wear yellow clothes on Thursdays</li>
              <li>• Donate yellow items</li>
              <li>• Feed Brahmins and cows</li>
              <li>• Read religious scriptures</li>
              <li>• Wear yellow sapphire (consult astrologer)</li>
            </ul>
          </div>
        </div>

        {/* About Jupiter */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Guru (Jupiter)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Significance</h3>
              <p className="text-gray-700 text-sm">Jupiter is the most benefic planet in Vedic astrology, representing wisdom, prosperity, and expansion.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Transit Duration</h3>
              <p className="text-gray-700 text-sm">Jupiter takes approximately 12 years to complete one cycle through all 12 zodiac signs, spending about 1 year in each sign.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Importance</h3>
              <p className="text-gray-700 text-sm">Guru Peyarchi significantly impacts education, marriage, children, wealth, and spiritual growth.</p>
            </div>
          </div>
        </div>
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default GuruPeyarchi;

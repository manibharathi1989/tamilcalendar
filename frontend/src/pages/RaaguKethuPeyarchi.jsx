import React from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { Eclipse, TrendingUp, Calendar } from 'lucide-react';

const RaaguKethuPeyarchi = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Eclipse className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Raagu Kethu Peyarchi Palan</h1>
          <p className="text-purple-200 text-lg">ராகு கேது பெயர்ச்சி பலன் - Rahu Ketu Transit Predictions</p>
        </div>

        {/* Current Transit Info */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-8 mb-8 border-2 border-indigo-200">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">Current Transit 2025-2026</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-3">Raagu (ராகு)</h3>
              <p className="text-2xl font-bold text-purple-600 mb-2">மீனம் (Pisces)</p>
              <p className="text-sm text-gray-600">Rahu is currently in Pisces sign</p>
              <p className="text-xs text-gray-500 mt-2">May 18, 2025 - November 2026</p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-3">Kethu (கேது)</h3>
              <p className="text-2xl font-bold text-indigo-600 mb-2">கன்னி (Virgo)</p>
              <p className="text-sm text-gray-600">Ketu is currently in Virgo sign</p>
              <p className="text-xs text-gray-500 mt-2">May 18, 2025 - November 2026</p>
            </div>
          </div>
          <div className="mt-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Rahu and Ketu always move in retrograde motion and are positioned 180° opposite to each other.
            </p>
          </div>
        </div>

        {/* Rasi-wise Predictions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Rasi-wise Predictions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rasiList.map((rasi) => (
              <div
                key={rasi.id}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-3xl mb-2">{rasi.icon}</div>
                <h3 className="font-bold text-gray-800 text-lg">{rasi.english}</h3>
                <p className="text-sm text-gray-700 mb-2">{rasi.tamil}</p>
                <p className="text-xs text-gray-600">View detailed predictions</p>
              </div>
            ))}
          </div>
        </div>

        {/* About Raagu & Kethu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-red-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">About Raagu (Rahu)</h3>
            <p className="text-gray-700 text-sm mb-3">
              Rahu is the North Node of the Moon, representing worldly desires, materialism, and ambition. It's a shadow planet known for causing illusions and unexpected events.
            </p>
            <div className="space-y-2 text-gray-700 text-sm">
              <p><strong>Transit Duration:</strong> 18 months per sign</p>
              <p><strong>Key Areas:</strong> Technology, foreign connections, sudden changes</p>
              <p><strong>Nature:</strong> Malefic but can give sudden gains</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">About Kethu (Ketu)</h3>
            <p className="text-gray-700 text-sm mb-3">
              Ketu is the South Node of the Moon, representing spirituality, moksha (liberation), and detachment. It's associated with past karma and spiritual enlightenment.
            </p>
            <div className="space-y-2 text-gray-700 text-sm">
              <p><strong>Transit Duration:</strong> 18 months per sign</p>
              <p><strong>Key Areas:</strong> Spirituality, intuition, research</p>
              <p><strong>Nature:</strong> Malefic but grants spiritual wisdom</p>
            </div>
          </div>
        </div>

        {/* Remedies */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Remedies for Raagu & Kethu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="font-bold text-purple-800 mb-3 text-lg">Raagu Remedies</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Worship Goddess Durga</li>
                <li>• Chant Rahu mantras on Saturdays</li>
                <li>• Donate black items or sesame</li>
                <li>• Feed dogs and lower caste people</li>
                <li>• Wear hessonite garnet (Gomed) - consult astrologer</li>
                <li>• Keep fasts on Saturdays</li>
                <li>• Visit Rahu temples</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="font-bold text-blue-800 mb-3 text-lg">Kethu Remedies</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Worship Lord Ganesha</li>
                <li>• Chant Ketu mantras on Tuesdays</li>
                <li>• Donate multi-colored blankets</li>
                <li>• Feed dogs and street animals</li>
                <li>• Wear cat's eye gemstone - consult astrologer</li>
                <li>• Practice meditation and yoga</li>
                <li>• Visit Ganesha temples</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default RaaguKethuPeyarchi;

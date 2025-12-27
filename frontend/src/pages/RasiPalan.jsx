import React, { useState, useEffect } from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { Star, Sparkles } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { calendarAPI } from '../services/calendarAPI';

const RasiPalan = () => {
  const { type } = useParams();
  const [selectedRasi, setSelectedRasi] = useState('mesham');
  const [rasiData, setRasiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRasiPalan = async () => {
        setLoading(true);
        try {
            const data = await calendarAPI.getRasiPalan(type || 'daily');
            setRasiData(data);
        } catch (error) {
            console.error("Failed to fetch rasi palan", error);
        } finally {
            setLoading(false);
        }
    };
    fetchRasiPalan();
  }, [type]);

  const currentRasiData = rasiData.find(r => r.rasi === selectedRasi);

  const rasiList = [
    { id: 'mesham', tamil: 'மேஷம்', english: 'Aries (Mesham)', icon: '♈' },
    { id: 'rishabam', tamil: 'ரிஷபம்', english: 'Taurus (Rishabam)', icon: '♉' },
    { id: 'mithunam', tamil: 'மிதுனம்', english: 'Gemini (Mithunam)', icon: '♊' },
    { id: 'kadagam', tamil: 'கடகம்', english: 'Cancer (Kadagam)', icon: '♋' },
    { id: 'simmam', tamil: 'சிம்மம்', english: 'Leo (Simmam)', icon: '♌' },
    { id: 'kanni', tamil: 'கன்னி', english: 'Virgo (Kanni)', icon: '♍' },
    { id: 'thulam', tamil: 'துலாம்', english: 'Libra (Thulam)', icon: '♎' },
    { id: 'vrichikam', tamil: 'விருச்சிகம்', english: 'Scorpio (Vrichikam)', icon: '♏' },
    { id: 'dhanusu', tamil: 'தனுசு', english: 'Sagittarius (Dhanusu)', icon: '♐' },
    { id: 'makaram', tamil: 'மகரம்', english: 'Capricorn (Makaram)', icon: '♑' },
    { id: 'kumbam', tamil: 'கும்பம்', english: 'Aquarius (Kumbam)', icon: '♒' },
    { id: 'meenam', tamil: 'மீனம்', english: 'Pisces (Meenam)', icon: '♓' },
  ];

  const palanTypes = [
    { id: 'daily', tamil: 'இன்றைய ராசி பலன்', english: 'Daily Rasi Palan' },
    { id: 'weekly', tamil: 'வார ராசி பலன்', english: 'Weekly Rasi Palan' },
    { id: 'monthly', tamil: 'மாத ராசி பலன்', english: 'Monthly Rasi Palan' },
    { id: 'yearly', tamil: 'ஆண்டு ராசி பலன்', english: 'Yearly Rasi Palan' },
  ];

  const currentType = palanTypes.find(t => t.id === (type || 'daily')) || palanTypes[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Star className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">{currentType.english}</h1>
          <p className="text-purple-100 text-lg">{currentType.tamil}</p>
        </div>

        {/* Rasi Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Select Your Rasi</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {rasiList.map((rasi) => (
              <button
                key={rasi.id}
                onClick={() => setSelectedRasi(rasi.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedRasi === rasi.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500 text-white shadow-lg scale-105'
                    : 'bg-white border-purple-200 text-gray-700 hover:border-purple-400 hover:shadow-md'
                }`}
              >
                <div className="text-3xl mb-2">{rasi.icon}</div>
                <div className="font-semibold text-sm">{rasi.english.split(' ')[0]}</div>
                <div className="text-xs mt-1">{rasi.tamil}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Palan Display */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-800">
              {rasiList.find(r => r.id === selectedRasi)?.english} - {currentType.english}
            </h2>
          </div>

          {loading ? (
             <div className="text-center py-12">Loading...</div>
          ) : currentRasiData ? (
            <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="text-lg font-bold text-purple-800 mb-3">Prediction (Tamil / English)</h3>
                <p className="text-gray-800 text-lg font-medium leading-relaxed mb-4">
                    {currentRasiData.prediction_tamil}
                </p>
                 <p className="text-gray-700 leading-relaxed italic">
                    {currentRasiData.prediction_english}
                </p>
                </div>

                {currentType.id === 'daily' && (
                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200">
                        <h3 className="text-lg font-bold text-orange-800 mb-3">Lucky Factors</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Lucky Number</p>
                                <p className="text-2xl font-bold text-orange-600">{currentRasiData.lucky_number}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Lucky Color</p>
                                <p className="text-2xl font-bold text-orange-600">{currentRasiData.lucky_color}</p>
                            </div>
                        </div>
                    </div>
                )}
                 {currentType.id === 'weekly' && (
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                        <h3 className="text-lg font-bold text-blue-800 mb-3">Weekly Lucky Days</h3>
                        <p className="text-xl font-bold text-blue-600">{currentRasiData.lucky_days}</p>
                    </div>
                )}
            </div>
          ) : (
             <div className="text-center py-12 text-gray-500">No data available for this Rasi.</div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-6 mt-8 border-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-3">⚠️ Disclaimer</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            The predictions given here are based on general astrological principles and Moon sign (Rasi). 
            For accurate and personalized predictions, please consult a qualified astrologer with your complete birth chart details.
            These predictions are for entertainment and guidance purposes only.
          </p>
        </div>
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default RasiPalan;

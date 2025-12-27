import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { calendarAPI } from '../services/calendarAPI';
import { useNavigate } from 'react-router-dom';

const ModernRasiPalan = () => {
  const [rasiData, setRasiData] = useState([]);
  const [selectedRasi, setSelectedRasi] = useState('mesham');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const rasiList = [
    { id: 'mesham', label: 'மேஷம்', icon: '♈' },
    { id: 'rishabam', label: 'ரிஷபம்', icon: '♉' },
    { id: 'mithunam', label: 'மிதுனம்', icon: '♊' },
    { id: 'kadagam', label: 'கடகம்', icon: '♋' },
    { id: 'simmam', label: 'சிம்மம்', icon: '♌' },
    { id: 'kanni', label: 'கன்னி', icon: '♍' },
    { id: 'thulam', label: 'துலாம்', icon: '♎' },
    { id: 'vrichikam', label: 'விருச்சிகம்', icon: '♏' },
    { id: 'dhanusu', label: 'தனுசு', icon: '♐' },
    { id: 'makaram', label: 'மகரம்', icon: '♑' },
    { id: 'kumbam', label: 'கும்பம்', icon: '♒' },
    { id: 'meenam', label: 'மீனம்', icon: '♓' },
  ];

  useEffect(() => {
    const fetchRasiPalan = async () => {
      setLoading(true);
      try {
        const data = await calendarAPI.getRasiPalan('daily');
        setRasiData(data);
      } catch (error) {
        console.error("Failed to fetch daily rasi palan", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRasiPalan();
  }, []);

  const currentData = rasiData.find(r => r.rasi === selectedRasi);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">இன்றைய ராசி பலன்</h3>
        <Sparkles className="w-5 h-5 text-purple-500" />
      </div>

      {/* Rasi Selector Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {rasiList.map((rasi) => (
          <button
            key={rasi.id}
            onClick={() => setSelectedRasi(rasi.id)}
            className={`p-2 rounded-lg text-center transition-all ${
              selectedRasi === rasi.id
                ? 'bg-purple-100 text-purple-700 font-bold border-2 border-purple-200'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="text-xl mb-1">{rasi.icon}</div>
            <div className="text-[10px]">{rasi.label}</div>
          </button>
        ))}
      </div>

      {/* Prediction */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 min-h-[120px]">
        {loading ? (
          <p className="text-gray-500 text-center text-sm py-4">Loading...</p>
        ) : currentData ? (
          <>
            <h4 className="font-bold text-purple-800 mb-2">{rasiList.find(r => r.id === selectedRasi)?.label}</h4>
            <p className="text-gray-700 text-sm leading-relaxed mb-2">
              {currentData.prediction_tamil}
            </p>
             <p className="text-gray-600 text-xs italic">
              {currentData.prediction_english}
            </p>
          </>
        ) : (
          <p className="text-gray-500 text-center text-sm py-4">No data available.</p>
        )}
      </div>

      <button 
        onClick={() => navigate('/rasi-palan/daily')}
        className="w-full mt-4 py-2 text-purple-600 font-medium text-sm hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
      >
        View Full Rasi Palan →
      </button>
    </div>
  );
};

export default ModernRasiPalan;

import React from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp, Calendar, Sparkles } from 'lucide-react';
import { rasiPalanLinks } from '../data/mockCalendarData';

const ModernRasiPalan = () => {
  const getIcon = (index) => {
    const icons = [Star, TrendingUp, Calendar, Sparkles, Star, TrendingUp, Calendar];
    return icons[index % icons.length];
  };

  const getGradient = (index) => {
    const gradients = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-orange-500 to-red-500',
      'from-green-500 to-teal-500',
      'from-yellow-500 to-orange-500',
      'from-pink-500 to-rose-500',
      'from-indigo-500 to-purple-500'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Star className="w-7 h-7 text-purple-500" />
        <h3 className="text-2xl font-bold text-gray-800 text-center">
          Rasi Palan
        </h3>
      </div>
      <p className="text-center text-lg text-purple-600 font-semibold mb-6">
        தமிழ் ராசி பலன்
      </p>
      
      <div className="space-y-3">
        {rasiPalanLinks.map((link, index) => {
          const Icon = getIcon(index);
          const gradient = getGradient(index);
          
          return (
            <Link
              key={index}
              to={link.link}
              className="group block"
            >
              <div className={`bg-gradient-to-r ${gradient} rounded-xl p-4 hover:shadow-xl transition-all transform hover:scale-105`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{link.english}</p>
                      <p className="text-white/80 text-sm">{link.tamil}</p>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ModernRasiPalan;

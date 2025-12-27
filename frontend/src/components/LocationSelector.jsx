import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

const PRESET_LOCATIONS = [
  { name: 'New Delhi', lat: '28.6139', lon: '77.2090' },
  { name: 'Chennai', lat: '13.0827', lon: '80.2707' },
  { name: 'Mumbai', lat: '19.0760', lon: '72.8777' },
  { name: 'Kolkata', lat: '22.5726', lon: '88.3639' },
  { name: 'Bengaluru', lat: '12.9716', lon: '77.5946' },
  { name: 'Hyderabad', lat: '17.3850', lon: '78.4867' },
  { name: 'Madurai', lat: '9.9252', lon: '78.1198' },
  { name: 'Coimbatore', lat: '11.0168', lon: '76.9558' },
  { name: 'Trichy', lat: '10.7905', lon: '78.7047' },
  { name: 'Salem', lat: '11.6643', lon: '78.1460' },
  { name: 'Tirunelveli', lat: '8.7139', lon: '77.7567' },
];

const LocationSelector = ({ currentLocation, onLocationChange }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAutoDetect = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationChange({
            name: 'Current Location',
            lat: latitude.toFixed(4),
            lon: longitude.toFixed(4)
          });
          setLoading(false);
          setIsOpen(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please select manually.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  const handleSelect = (loc) => {
    onLocationChange(loc);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-6 z-40">
      <div 
        className="bg-white/80 backdrop-blur-sm border border-orange-200 rounded-xl p-3 flex items-center justify-between shadow-sm cursor-pointer hover:bg-white transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-5 h-5 text-orange-600" />
          <span className="font-medium">
            {currentLocation.name} 
            <span className="text-xs text-gray-500 ml-2">
              ({currentLocation.lat}, {currentLocation.lon})
            </span>
          </span>
        </div>
        <div className="text-orange-600 text-sm font-semibold">Change</div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-orange-100 overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="p-2 border-b border-gray-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAutoDetect();
              }}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 p-2 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg transition-colors font-medium"
            >
              <Navigation className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Detecting...' : 'Auto Detect My Location'}
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {PRESET_LOCATIONS.map((loc) => (
              <button
                key={loc.name}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(loc);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex justify-between items-center ${
                  currentLocation.name === loc.name ? 'bg-orange-50 text-orange-700' : 'text-gray-700'
                }`}
              >
                <span>{loc.name}</span>
                {currentLocation.name === loc.name && <MapPin className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;

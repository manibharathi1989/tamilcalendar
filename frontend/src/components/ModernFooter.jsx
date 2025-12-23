import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail, Shield, Heart } from 'lucide-react';
import { yearLinks } from '../data/mockCalendarData';

const ModernFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-6 h-6 text-orange-500" />
              <h3 className="text-xl font-bold">Tamil Daily Calendar</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              In service to Tamil people around the world, providing authentic Tamil calendar information for your auspicious events. Based on Moon and Star events, following traditional Tamil calendar system.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/today" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Today's Calendar
              </Link>
              <Link to="/monthly" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Monthly View
              </Link>
              <Link to="/festivals" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Festivals
              </Link>
              <Link to="/wedding" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Wedding Dates
              </Link>
              <Link to="/rasi-palan" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Rasi Palan
              </Link>
              <Link to="/muhurtham" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Muhurtham Dates
              </Link>
            </div>
          </div>

          {/* Contact & Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-500" />
              Information
            </h3>
            <div className="space-y-2">
              <Link
                to="/contact"
                className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </Link>
              <Link
                to="/privacy"
                className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors text-sm"
              >
                <Shield className="w-4 h-4" />
                Privacy Policy
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors text-sm"
              >
                <Heart className="w-4 h-4" />
                About Us
              </Link>
            </div>
          </div>
        </div>

        {/* Year Archive Links */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <h3 className="text-lg font-bold mb-4 text-center">Calendar Archives</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {yearLinks.slice(0, 12).map((year) => (
              <Link
                key={year}
                to={`/daily/${year}`}
                className="bg-gray-800 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 text-center py-2 px-3 rounded-lg transition-all text-sm font-medium"
              >
                {year}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 TamilDailyCalendar.com - All Rights Reserved
            </p>
            <p className="text-gray-400 text-sm">
              Made with <span className="text-red-500">♥</span> for Tamil Community
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-xs text-center">
            ⚠️ All timings shown are for Indian Standard Time (IST). Please consult your local astrologer for specific timings based on your location and for important auspicious events.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;

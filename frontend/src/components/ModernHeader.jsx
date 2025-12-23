import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Menu, X, Sun, Moon, Star, Heart } from 'lucide-react';

const ModernHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainLinks = [
    { to: '/today', label: 'Today', icon: Sun },
    { to: '/daily', label: 'Daily Calendar', icon: Calendar },
    { to: '/monthly', label: 'Monthly', icon: Calendar },
    { to: '/festivals', label: 'Festivals', icon: Star },
    { to: '/wedding', label: 'Wedding Dates', icon: Heart },
    { to: '/rasi-palan', label: 'Rasi Palan', icon: Moon }
  ];

  return (
    <header className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-white p-2 rounded-lg shadow-md group-hover:scale-110 transition-transform">
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Tamil Daily Calendar
              </h1>
              <p className="text-orange-100 text-sm">
                தமிழ் தினசரி காலண்டர் 2026
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {mainLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-all hover:scale-105"
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-2">
            {mainLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};

export default ModernHeader;

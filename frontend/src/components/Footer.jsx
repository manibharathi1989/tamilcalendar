import React from 'react';
import { Link } from 'react-router-dom';
import { yearLinks } from '../data/mockCalendarData';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Year Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {yearLinks.map((year) => (
            <div key={year} className="space-y-2">
              <Link
                to={`/daily/${year}`}
                className="text-blue-600 hover:text-blue-800 hover:underline block"
              >
                Tamil Daily Calendar {year}
              </Link>
              <Link
                to={`/monthly/${year}`}
                className="text-blue-600 hover:text-blue-800 hover:underline block"
              >
                Tamil Monthly Calendar {year}
              </Link>
              <Link
                to={`/daily/${year}`}
                className="text-blue-600 hover:text-blue-800 hover:underline block text-sm"
              >
                தமிழ் தின காலண்டர் {year}
              </Link>
              <Link
                to={`/monthly/${year}`}
                className="text-blue-600 hover:text-blue-800 hover:underline block text-sm"
              >
                தமிழ் மாத காலண்டர் {year}
              </Link>
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="border-t border-gray-300 pt-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/contact"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Contact
            </Link>
            <Link
              to="/privacy"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Privacy Policy
            </Link>
            <p className="text-gray-600">
              Copyright 2025 TamilDailyCalendar.com
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="border-t border-gray-300 pt-6">
          <div className="text-gray-700 text-sm space-y-3">
            <p>
              Welcome to Tamil Daily Calendar Website. In service to tamil people all
              around the world, we bring you the tamil daily calendar sheets for your
              auspicious events reference. Calendars shown above is for Indian timings.
              Kindly consult your astrologers for the specific time for your auspicious
              events.
            </p>
            <p>
              Tamil Calendar is followed by Tamil people around the world is based on Moon
              and Star events. Tamil people traditionally follow the calendar to auspicious
              events and timings.
            </p>
            <p>
              Tamil Calendar is used in Tamil Nadu, Puducherry and Tamil people of
              Malaysia, Singapore and SriLanka. Tamil people refer this for all events
              like cultural or religious. Traditionally Tamil year starts on 14th April
              every year. Week Days are named after the planets on solar system.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white border-b-2 border-gray-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Tamil Daily Calendar 2026 - 2005
        </h1>
        <h2 className="text-xl text-center text-gray-700 mb-4">
          தமிழ் தினசரி காலண்டர் 2026 - 2005
        </h2>
        
        <nav className="bg-gray-100 border border-gray-300 rounded">
          <div className="flex flex-wrap justify-center items-center gap-2 py-3 px-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">
              Home
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/today" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">
              Tamil Calendar Today
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/daily" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">
              Tamil Daily Calendar
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/monthly" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">
              Tamil Monthly Calendar
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/muhurtham" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">
              Tamil Muhurtham Dates
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/wedding" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">
              Tamil Wedding Dates
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/festivals" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">
              Tamil Festival Dates
            </Link>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2 py-3 px-4 border-t border-gray-300">
            <Link to="/pournami" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">
              Pournami
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/amavasai" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">
              Amavasai
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/pradosham" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">
              Pradosham
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/karinal" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">
              Karinal
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/govt-holidays" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">
              TN Govt Holidays
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/contact" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">
              Contact Us
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/about" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">
              About Us
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/rasi-palan" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">
              Rasi Palan
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

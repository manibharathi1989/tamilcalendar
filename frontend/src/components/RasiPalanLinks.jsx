import React from 'react';
import { Link } from 'react-router-dom';
import { rasiPalanLinks } from '../data/mockCalendarData';

const RasiPalanLinks = () => {
  return (
    <div className="bg-white border border-gray-300 p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
        Tamil Rasi Palan : தமிழ் ராசி பலன்
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rasiPalanLinks.map((link, index) => (
          <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-2">
            <Link
              to={link.link}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {link.english}
            </Link>
            <Link
              to={link.link}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {link.tamil}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RasiPalanLinks;

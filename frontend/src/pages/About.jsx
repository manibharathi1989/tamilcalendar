import React from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { Heart, Users, Target, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Heart className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">About Us</h1>
          <p className="text-teal-100 text-lg">எங்களை பற்றி</p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-teal-600" />
            <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Tamil Daily Calendar is dedicated to preserving and promoting Tamil culture by providing authentic, 
            traditional Tamil Panchangam (calendar) information to Tamil people around the world. Our mission is to 
            make it easy for everyone to access daily auspicious timings, festival dates, and important Tamil calendar 
            information in both Tamil and English languages.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            தமிழ் தினசரி காலண்டர் உலகம் முழுவதும் தமிழ் மக்களுக்கு நம்பகமான தமிழ் பஞ்சாங்கம் தகவல்களை வழங்குவது எங்கள் நோக்கமாகும்.
          </p>
        </div>

        {/* What We Offer */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">நல்ல நேரம்</h3>
              <p className="text-gray-700">Daily auspicious timings for starting new ventures, ceremonies, and important activities.</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border-2 border-pink-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">திருமண நாட்கள்</h3>
              <p className="text-gray-700">Comprehensive list of auspicious wedding dates based on Tamil calendar.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">திருவிழாக்கள்</h3>
              <p className="text-gray-700">Complete information about Tamil festivals and religious observances throughout the year.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">ராசி பலன்</h3>
              <p className="text-gray-700">Daily, weekly, monthly, and yearly horoscope predictions for all zodiac signs.</p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-teal-600" />
            <h2 className="text-3xl font-bold text-gray-800">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Authenticity</h3>
              <p className="text-gray-600 text-sm">Traditional Tamil Panchangam calculations based on ancient wisdom</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Accessibility</h3>
              <p className="text-gray-600 text-sm">Free access to calendar information for Tamil people worldwide</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Accuracy</h3>
              <p className="text-gray-600 text-sm">Carefully calculated timings and dates for reliable reference</p>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 border-2 border-amber-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our History</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Founded in 2005, Tamil Daily Calendar has been serving the Tamil community for over 18 years. 
            What started as a simple daily calendar website has grown into a comprehensive resource for Tamil 
            cultural and astrological information.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Over the years, we have continuously improved our services, adding new features like Rasi Palan, 
            monthly views, and detailed festival information. Our commitment to preserving Tamil culture and 
            making it accessible to future generations remains stronger than ever.
          </p>
        </div>
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default About;

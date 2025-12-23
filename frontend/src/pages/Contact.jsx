import React, { useState } from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the data to backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Mail className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-blue-100 text-lg">எங்களை தொடர்பு கொள்ளவும்</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-6">
                <p className="text-green-800 font-semibold">Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Message Subject"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-600">info@tamildailycalendar.com</p>
                    <p className="text-gray-600">support@tamildailycalendar.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                    <p className="text-gray-600">+91 (044) 1234-5678</p>
                    <p className="text-gray-600">Monday - Friday, 9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                    <p className="text-gray-600">
                      Tamil Daily Calendar<br />
                      123 Temple Street<br />
                      Chennai, Tamil Nadu 600001<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-lg p-6 border-2 border-orange-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Business Hours</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">How accurate is the Tamil calendar data?</h3>
              <p className="text-gray-600">Our calendar data is based on traditional Tamil Panchangam calculations. However, for important auspicious events, we recommend consulting a qualified astrologer.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Can I download the calendar?</h3>
              <p className="text-gray-600">Currently, the calendar is available for online viewing. We are working on downloadable PDF versions for future releases.</p>
            </div>
            <div className="pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">How do I report an error?</h3>
              <p className="text-gray-600">Please use the contact form above to report any errors. Include the date and specific issue, and we'll review it promptly.</p>
            </div>
          </div>
        </div>
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default Contact;

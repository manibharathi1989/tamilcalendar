import React from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { Shield, Lock, Eye, Database } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <ModernHeader />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <Shield className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-indigo-100">Last Updated: December 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Tamil Daily Calendar. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we handle your personal data when you visit our website and 
              tell you about your privacy rights.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
            </div>
            <div className="space-y-3 text-gray-700">
              <p><strong>Usage Data:</strong> We may collect information about how you access and use the website, including your IP address, browser type, pages visited, and time spent on pages.</p>
              <p><strong>Contact Information:</strong> When you contact us through our contact form, we collect your name, email address, and message content.</p>
              <p><strong>Cookies:</strong> We use cookies and similar tracking technologies to improve your experience on our website.</p>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
            </div>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>To provide and maintain our service</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To analyze usage patterns and improve our website</li>
              <li>To send you updates about Tamil calendar and festivals (only if you opt-in)</li>
              <li>To detect and prevent technical issues</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-800">Data Security</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal data. 
              However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Cookies Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use cookies to enhance your experience. Cookies are small text files stored on your device. You can 
              control cookies through your browser settings.
            </p>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600"><strong>Essential Cookies:</strong> Required for the website to function properly</p>
              <p className="text-sm text-gray-600"><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</p>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed">
              We may use third-party services for analytics and advertising. These services may collect information about 
              your online activities across different websites. We do not control these third parties' tracking technologies.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">You have the right to:</p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>Access your personal data</li>
              <li>Rectify inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our service is not directed to individuals under the age of 13. We do not knowingly collect personal 
              information from children under 13. If you are a parent or guardian and believe your child has provided 
              us with personal data, please contact us.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="text-gray-700">
              <p><strong>Email:</strong> privacy@tamildailycalendar.com</p>
              <p><strong>Address:</strong> Tamil Daily Calendar, Chennai, Tamil Nadu, India</p>
            </div>
          </section>
        </div>
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default Privacy;

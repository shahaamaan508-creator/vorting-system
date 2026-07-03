import React from 'react';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-8 w-8" />
              <div>
                <h3 className="text-xl font-bold">Election Commission of India</h3>
                <p className="text-blue-200">Government of India</p>
              </div>
            </div>
            <p className="text-blue-200 mb-4">
              Ensuring free, fair, and transparent elections for the world's largest democracy.
              Our commitment to integrity and excellence makes every vote count.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-300">Community Guidelines:</h4>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• No fight in matters of religion</li>
                <li>• If you give respect, you will get respect</li>
                <li>• Maintain electoral integrity</li>
                <li>• Promote peaceful democratic participation</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-300">Quick Links</h4>
            <ul className="space-y-2 text-blue-200">
              <li><a href="/voting" className="hover:text-white transition-colors">Vote Now</a></li>
              <li><a href="/results" className="hover:text-white transition-colors">Results</a></li>
              <li><a href="/live-polls" className="hover:text-white transition-colors">Live Polls</a></li>
              <li><a href="/analytics" className="hover:text-white transition-colors">Analytics</a></li>
              <li><a href="/historical" className="hover:text-white transition-colors">Historical Data</a></li>
              <li><a href="/construction" className="hover:text-white transition-colors">Construction</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-300">Support</h4>
            <ul className="space-y-2 text-blue-200">
              <li><a href="/feedback" className="hover:text-white transition-colors">Feedback</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/help-us" className="hover:text-white transition-colors">Help Us</a></li>
              <li><a href="/reset-password" className="hover:text-white transition-colors">Reset Password</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-300">Contact Us</h4>
            <div className="space-y-3 text-blue-200">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Nirvachan Sadan, New Delhi</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+91-11-23052205</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@eci.gov.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p className="text-blue-200 text-sm">
            © 2024 Election Commission of India. All rights reserved. | 
            <span className="text-orange-300"> Satyameva Jayate</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
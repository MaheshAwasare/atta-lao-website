import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Phone className="text-[#4a9f45]" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="text-[#4a9f45]" />
                  <span>contact@attalao.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="text-[#4a9f45]" />
                  <span>123 Flour Mill Road, Mumbai, India</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
              <div className="flex items-start space-x-4">
                <Clock className="text-[#4a9f45]" />
                <div>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-[#4a9f45]">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-gray-600 hover:text-[#4a9f45]">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-gray-600 hover:text-[#4a9f45]">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
          <div>
            {/* You might want to add some visual content here like a map, image, etc. for balance */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
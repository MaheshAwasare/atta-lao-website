import React from 'react';
import { Award, Leaf, Shield } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-200 rounded-lg transform rotate-3 transition-transform duration-300 hover:rotate-0" />
            <img
              src="./images/wheat_flour.png"
              alt="Traditional chakki grinding"
              className="rounded-lg shadow-xl relative transform transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-[#4a9f45] to-[#3d8438] text-white p-6 rounded-lg shadow-xl hidden lg:block transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold">25+</div>
              <div className="text-sm font-medium">Years of Excellence</div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold mb-6 text-gray-800 relative">
                <span className="relative">
                  Our Story
                  <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-[#4a9f45] rounded-full"></span>
                </span>
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                At AttaLao, we're committed to preserving the authentic taste and nutritional value of traditional Indian flours. Our journey began with a simple mission: to bring the purest, chakki-ground flours to your kitchen, just like they were made generations ago.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-br from-[#4a9f45]/20 to-[#4a9f45]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
                  <Leaf className="text-[#4a9f45]" size={28} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Traditional Process</h3>
                <p className="text-gray-600">Chakki-ground to preserve nutrients</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-br from-[#4a9f45]/20 to-[#4a9f45]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
                  <Shield className="text-[#4a9f45]" size={28} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Quality Control</h3>
                <p className="text-gray-600">Rigorous testing at every step</p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
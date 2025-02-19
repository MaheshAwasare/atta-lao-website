import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Shop', href: '#shop' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center space-x-2">
            <img
              src="/images/atta_lao_logo.png"
              alt="AttaLao Logo"
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold text-gray-800">AttaLao</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-[#4a9f45] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button className="bg-[#4a9f45] text-white px-6 py-2 rounded-full hover:bg-[#3d8438] transition-colors">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-gray-600 hover:text-[#4a9f45] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button className="w-full mt-4 bg-[#4a9f45] text-white px-6 py-2 rounded-full hover:bg-[#3d8438] transition-colors">
              Login
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

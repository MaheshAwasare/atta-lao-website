import React, { useState, useEffect } from 'react';
import { Menu, X, User, MapPin, Package, LogOut } from 'lucide-react';
import RegisterModal from './RegistrationModal';

interface HeaderProps {
  onViewChange: (view: 'main' | 'addresses' | 'orders') => void;
}

const Header: React.FC<HeaderProps> = ({ onViewChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Shop', href: '#shop' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const phoneNumber = localStorage.getItem('phoneNumber');
    setIsLoggedIn(!!phoneNumber);
  }, []);

  const handleLoginClick = () => {
    setIsMenuOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('deviceId');
    setIsLoggedIn(false);
    setIsProfileMenuOpen(false);
    onViewChange('main');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsRegisterModalOpen(false);
  };

  const handleNavigation = (view: 'main' | 'addresses' | 'orders') => {
    onViewChange(view);
    setIsProfileMenuOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a 
              href="#" 
              className="flex items-center space-x-2"
              onClick={() => handleNavigation('main')}
            >
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
                  onClick={() => handleNavigation('main')}
                >
                  {item.label}
                </a>
              ))}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-[#4a9f45] transition-colors"
                  >
                    <User size={20} />
                    <span>Profile</span>
                  </button>
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <button
                        onClick={() => handleNavigation('addresses')}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <MapPin size={16} className="mr-2" />
                        Addresses
                      </button>
                      <button
                        onClick={() => handleNavigation('orders')}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <Package size={16} className="mr-2" />
                        Orders
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={handleLoginClick}
                  className="bg-[#4a9f45] text-white px-6 py-2 rounded-full hover:bg-[#3d8438] transition-colors"
                >
                  Login
                </button>
              )}
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
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleNavigation('main');
                  }}
                >
                  {item.label}
                </a>
              ))}
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => handleNavigation('addresses')}
                    className="block w-full text-left py-2 text-gray-600 hover:text-[#4a9f45] transition-colors"
                  >
                    Addresses
                  </button>
                  <button
                    onClick={() => handleNavigation('orders')}
                    className="block w-full text-left py-2 text-gray-600 hover:text-[#4a9f45] transition-colors"
                  >
                    Orders
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-gray-600 hover:text-[#4a9f45] transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleLoginClick}
                  className="w-full mt-4 bg-[#4a9f45] text-white px-6 py-2 rounded-full hover:bg-[#3d8438] transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </nav>
      </header>

      <RegisterModal 
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        product={null}
      />
    </>
  );
};

export default Header;
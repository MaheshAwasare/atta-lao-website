import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm mb-4 md:mb-0">
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={acceptCookies}
              className="bg-[#4a9f45] px-6 py-2 rounded-lg hover:bg-[#3d8438] transition-colors text-sm"
            >
              Accept
            </button>
            <a
              href="#"
              className="text-sm underline hover:text-gray-300"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
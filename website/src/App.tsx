import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Shop from './components/Shop';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

function App() {
  const [currentView, setCurrentView] = useState<'main' | 'addresses' | 'orders'>('main');
  const handleViewChange = useCallback((view: 'main' | 'addresses' | 'orders') => {
    setCurrentView(view);
  }, []); 
  return (
    <div className="min-h-screen">
     <Header onViewChange={handleViewChange} />
      <main>
        <Hero />
        <Shop />
        <About />
        <Contact />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}

export default App;
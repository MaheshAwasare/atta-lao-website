import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Shop from './components/Shop';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
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
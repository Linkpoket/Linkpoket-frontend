import React from 'react';
import HeroSection from './sections/HeroSection';
import CtaSection from './sections/CtaSection';
import Footer from './sections/Footer';
import NewSection from './sections/NewSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="from-gray-5 min-h-screen bg-white bg-gradient-to-br via-white to-white">
      <HeroSection />
      <NewSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

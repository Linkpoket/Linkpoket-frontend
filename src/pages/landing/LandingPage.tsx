import React from 'react';
import HeroSection from './sections/HeroSection';
import CtaSection from './sections/CtaSection';
import Footer from './sections/Footer';
import NewSection from './sections/NewSection';

export const LandingPage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <NewSection />
      <CtaSection />
      <Footer />
    </>
  );
};

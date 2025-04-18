import React from 'react';
import HeroSection from './sections/HeroSection';
import ProblemSection from './sections/ProblemSection';
import FeatureSection from './sections/FeatureSection';
import CtaSection from './sections/CtaSection';
import Footer from './sections/Footer';

export const LandingPage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <FeatureSection />
      <CtaSection />
      <Footer />
    </>
  );
};

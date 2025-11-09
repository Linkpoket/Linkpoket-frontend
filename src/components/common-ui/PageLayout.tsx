import MobileNavigation from '@/navigation/mobileNavigation';
import React, { ReactNode } from 'react';
import MobilePageBackground from '../page-layout-ui/MobilePageBackground';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className = '',
}) => (
  <>
    <MobilePageBackground />
    <div
      className={`bg-gray-5 flex min-h-screen min-w-[328px] flex-col px-[24px] py-[20px] md:px-[64px] md:py-[56px] xl:px-[102px] ${className}`}
    >
      {children}
      <MobileNavigation />
    </div>
  </>
);

import MobileNavigation from '@/navigation/mobileNavigation';
import React, { ReactNode } from 'react';
import MobilePageBackground from '../page-layout-ui/MobilePageBackground';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  isMobile: boolean;
  pageImageUrl?: string;
  pageTitle?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  isMobile,
  pageImageUrl,
  pageTitle,
  className = '',
}) => {
  return (
    <>
      {isMobile && (
        <MobilePageBackground
          isMobile={isMobile}
          pageImageUrl={pageImageUrl ?? ''}
          pageTitle={pageTitle}
        />
      )}
      <div
        className={`bg-gray-5 flex min-h-screen min-w-[328px] flex-col px-[24px] py-[20px] md:px-[64px] md:py-[56px] xl:px-[102px] ${isMobile ? 'pb-16' : ''} ${className}`}
      >
        {children}
      </div>
      {isMobile && <MobileNavigation />}
    </>
  );
};

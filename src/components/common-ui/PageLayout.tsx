import React, { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className = '',
}) => (
  <div
    className={`bg-gray-5 flex h-screen min-w-[328px] flex-col px-[64px] py-[56px] xl:px-[102px] ${className}`}
  >
    {children}
  </div>
);

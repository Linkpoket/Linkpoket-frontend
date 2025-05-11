import { useEffect, useState } from 'react';
import { useMobile } from '@/hooks/useMobile';
import PageHeaderSection from './PageHeaderSection';
import PageControllerSection from './PageControllerSection';
import PageContentSection from './PageContentSection';

export default function PageLayout() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const isMobile = useMobile();

  useEffect(() => {
    if (isMobile) {
      setView('list');
    }
  }, [isMobile]);

  function decodeJwt(token: string) {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (error) {
      console.error('JWT 디코딩 실패:', error);
      return null;
    }
  }

  const token = localStorage.getItem('access_token');

  if (token) {
    const decoded = decodeJwt(token);
    console.log('디코딩된 payload:', decoded);
  }

  return (
    <div className="flex h-screen flex-col">
      {/* HEADER SECTION*/}
      <PageHeaderSection />

      {/* Boundary line */}
      <div className="border-b-gray-30 mb-[40px] w-full border-b" />

      {/* CONTROLLER SECTION*/}
      <PageControllerSection view={view} setView={setView} />

      {/*CONTENT SECTION*/}
      <PageContentSection view={view} />
    </div>
  );
}

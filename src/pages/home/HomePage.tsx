import { lazy, Suspense } from 'react';
import { useMobile } from '@/hooks/useMobile';

// 동적 import로 필요한 컴포넌트만 로드
const MobileHome = lazy(() => import('./MobileHome'));
const WebHome = lazy(() => import('./WebHome'));

export default function HomePage() {
  const isMobile = useMobile();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      {isMobile ? <MobileHome /> : <WebHome />}
    </Suspense>
  );
}

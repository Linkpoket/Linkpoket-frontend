import { lazy, Suspense } from 'react';
import { useMobile } from '@/hooks/useMobile';
import { Spinner } from '@/components/common-ui/Spinner';

// 동적 import로 필요한 컴포넌트만 로드
const MobileHome = lazy(() => import('./MobileHome'));
const WebHome = lazy(() => import('./WebHome'));

export default function HomePage() {
  const isMobile = useMobile();

  return (
    <Suspense fallback={<Spinner display={true} position="center" />}>
      {isMobile ? <MobileHome /> : <WebHome />}
    </Suspense>
  );
}

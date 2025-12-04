import { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useMobile } from '@/hooks/useMobile';
import { useUserStore } from '@/stores/userStore';
import { useNotificationSSE } from '@/hooks/useNotificationSSE';
import useRouteChangeTracker from '@/hooks/useRouteChangeTracker';
import { Header } from '@/components/header/Header';
import { Spinner } from '@/components/common-ui/Spinner';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorState } from '@/components/common-ui/ErrorState';
import SideBar from '@/components/side-bar/SideBar';

export default function Layout() {
  useRouteChangeTracker();
  const location = useLocation();
  const path = location.pathname;
  const isHomePage = path === '/home';
  const isMobile = useMobile();
  const [showSidebar, setShowSidebar] = useState(() =>
    isMobile ? false : !isHomePage
  );
  const [isFoldSidebar, setIsFoldSidebar] = useState(() => isHomePage);
  const { setIsLoggedIn, isLoggedIn } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && !isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, setIsLoggedIn]);

  const isLoginPage = path === '/login';
  const isSignUpPage = path === '/signup';
  const isLandingPage = path === '/landing';

  const isHideSidebar = isLoginPage || isSignUpPage || isLandingPage; // 로그인 페이지 또는 회원가입 페이지에서 사이드바 숨김
  const isHideHeader = isLoginPage || isLandingPage; // 로그인 페이지에서 헤더 숨김
  const showHeaderButton = !isSignUpPage; // 회원가입 페이지에서 header의 button 숨김 숨김
  const showDepth = !isLoginPage && !isSignUpPage; // 로그인,회원가입 페이지에서 header의 button 숨김 숨김

  useNotificationSSE(isLoggedIn);

  useEffect(() => {
    if (isMobile) {
      setShowSidebar(false);
      setIsFoldSidebar(true);
    } else {
      setShowSidebar(!isHomePage);
      setIsFoldSidebar(isHomePage);
    }
  }, [isHomePage, isMobile]);

  return (
    <div className="flex h-screen flex-col">
      {!isHideHeader ? (
        <Header
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          isLoggedIn={isLoggedIn}
          showDepth={showDepth}
          showHeaderButton={showHeaderButton}
        />
      ) : null}

      <div className="flex flex-1 overflow-hidden">
        {!isHideSidebar ? (
          <SideBar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            isFoldSidebar={isFoldSidebar}
            setIsFoldSidebar={setIsFoldSidebar}
            initialCollapsed={isHomePage}
          />
        ) : null}
        <main id="app-scroll-container" className="flex-1 overflow-auto">
          {/* 페이지 렌더링 컴포넌트 */}
          <ErrorBoundary
            fallbackRender={() => (
              <ErrorState message="페이지를 불러올 수 없습니다." />
            )}
          >
            <Suspense fallback={<Spinner display={true} position="center" />}>
              <Outlet context={{ showSidebar }} />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

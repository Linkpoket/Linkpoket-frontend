import { lazy, Suspense, useEffect, useState } from 'react';
import { Header } from '@/components/header/Header';
import SideBar from '@/components/side-bar/SideBar';
import { Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { useProfileModalStore } from '@/stores/profileModalStore';
import { useNotificationSSE } from '@/hooks/useNotificationSSE';
import useRouteChangeTracker from '@/hooks/useRouteChangeTracker';
import { ProfileSettingsModalSkeleton } from '@/components/skeleton/ProfileSettingModal';
import { DeleteModalSkeleton } from '@/components/skeleton/DeleteModalSkeleton';

const ProfileSettingsModal = lazy(
  () => import('@/components/modal/profile/ProfileSettingsModal')
);

const WithdrawAccountModal = lazy(
  () => import('@/components/modal/profile/WithdrawAccountModal')
);

export default function Layout() {
  useRouteChangeTracker();
  const location = useLocation();
  const path = location.pathname;
  const isHomePage = path === '/home';
  const [showSidebar, setShowSidebar] = useState(() => !isHomePage);
  const [isFoldSidebar, setIsFoldSidebar] = useState(() => isHomePage);
  const {
    isProfileModalOpen,
    isWithdrawModalOpen,
    closeProfileModal,
    closeWithdrawModal,
  } = useProfileModalStore();
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
    setShowSidebar(!isHomePage);
    setIsFoldSidebar(isHomePage);
  }, [isHomePage]);

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
          <Suspense
            fallback={
              <div className="flex h-screen items-center justify-center">
                <div>로딩 중...</div>
              </div>
            }
          >
            <Outlet context={{ showSidebar }} />
          </Suspense>

          {isProfileModalOpen && (
            <Suspense fallback={<ProfileSettingsModalSkeleton />}>
              <ProfileSettingsModal
                isOpen={isProfileModalOpen}
                onClose={closeProfileModal}
              />
            </Suspense>
          )}

          {isWithdrawModalOpen && (
            <Suspense fallback={<DeleteModalSkeleton />}>
              <WithdrawAccountModal
                isOpen={isWithdrawModalOpen}
                onClose={closeWithdrawModal}
              />
            </Suspense>
          )}
        </main>
      </div>
    </div>
  );
}

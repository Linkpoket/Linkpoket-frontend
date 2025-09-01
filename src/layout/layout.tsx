import { Header } from '@/components/header/Header';
import SideBar from '@/components/side-bar/SideBar';
import { Suspense, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import ProfileSettingsModal from '@/components/modal/profile/ProfileSettingsModal';
import { useProfileModalStore } from '@/stores/profileModalStore';
import WithdrawAccountModal from '@/components/modal/profile/WithdrawAccountModal';
import { useNotificationSSE } from '@/hooks/useNotificationSSE';
import useRouteChangeTracker from '@/hooks/useRouteChangeTracker';

export default function Layout() {
  useRouteChangeTracker();
  const location = useLocation();
  const path = location.pathname;
  const [showSidebar, setShowSidebar] = useState(true);
  const [isFoldSidebar, setIsFoldSidebar] = useState(false);
  const {
    isProfileModalOpen,
    isWithdrawModalOpen,
    closeProfileModal,
    closeWithdrawModal,
  } = useProfileModalStore();

  const isLoggedIn = useUserStore((s) => s.isLoggedIn);

  const isLoginPage = path === '/login';
  const isSignUpPage = path === '/signup';
  const isLandingPage = path === '/landing';

  const isHideSidebar = isLoginPage || isSignUpPage || isLandingPage; // 로그인 페이지 또는 회원가입 페이지에서 사이드바 숨김
  const isHideHeader = isLoginPage || isLandingPage; // 로그인 페이지에서 헤더 숨김
  const showHeaderButton = !isSignUpPage; // 회원가입 페이지에서 header의 button 숨김 숨김
  const showDepth = !isLoginPage && !isSignUpPage; // 로그인,회원가입 페이지에서 header의 button 숨김 숨김

  useNotificationSSE(isLoggedIn);

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
          />
        ) : null}
        <main className="flex-1 overflow-auto">
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
            <ProfileSettingsModal
              isOpen={isProfileModalOpen}
              onClose={closeProfileModal}
            />
          )}

          {isWithdrawModalOpen && (
            <WithdrawAccountModal
              isOpen={isWithdrawModalOpen}
              onClose={closeWithdrawModal}
            />
          )}
        </main>
      </div>
    </div>
  );
}

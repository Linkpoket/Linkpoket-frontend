import { Header } from '@/components/header/Header';
import SideBar from '@/components/side-bar/SideBar';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import ProfileSettingsModal from '@/components/modal/profile/ProfileSettingsModal';
import { useProfileModalStore } from '@/stores/profileModalStore';
import { useNotificationSSE } from '@/hooks/useNotificationSSE';
import WithdrawAccountModal from '@/components/modal/profile/WithdrawAccountModal';

export default function Layout() {
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
  const isLadningPage = path === '/landing';

  const isHideSidebar = isLoginPage || isSignUpPage || isLadningPage; // 로그인 페이지 또는 회원가입 페이지에서 사이드바 숨김
  const isHideHeader = isLoginPage || isLadningPage; // 로그인 페이지에서 헤더 숨김
  const showHeaderButton = !isSignUpPage; // 회원가입 페이지에서 header의 button 숨김 숨김
  const showDepth = !isLoginPage && !isSignUpPage; // 로그인,회원가입 페이지에서 header의 button 숨김 숨김

  // useNotificationSSE(isLoggedIn);

  return (
    <div className="flex flex-col">
      {!isHideHeader ? (
        <Header
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          isLoggedIn={isLoggedIn}
          showDepth={showDepth}
          showHeaderButton={showHeaderButton}
        />
      ) : null}

      <div className="flex">
        {!isHideSidebar ? (
          <SideBar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            isFoldSidebar={isFoldSidebar}
            setIsFoldSidebar={setIsFoldSidebar}
          />
        ) : null}
        <main className="flex-1">
          <Outlet context={{ showSidebar }} />

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

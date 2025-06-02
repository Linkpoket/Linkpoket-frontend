import { Header } from '@/components/header/Header';
import SideBar from '@/components/side-bar/SideBar';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { useNotificationStore } from '@/stores/notification';

export default function Layout() {
  const location = useLocation();
  const path = location.pathname;
  const [showSidebar, setShowSidebar] = useState(true);

  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount);

  const isLoginPage = path === '/login';
  const isSignUpPage = path === '/signup';
  const isLadningPage = path === '/landing';

  const isHideSidebar = isLoginPage || isSignUpPage || isLadningPage; // 로그인 페이지 또는 회원가입 페이지에서 사이드바 숨김
  const isHideHeader = isLoginPage || isLadningPage; // 로그인 페이지에서 헤더 숨김
  const showHeaderButton = !isSignUpPage; // 회원가입 페이지에서 header의 button 숨김 숨김
  const showDepth = !isLoginPage && !isSignUpPage; // 로그인,회원가입 페이지에서 header의 button 숨김 숨김

  useEffect(() => {
    if (!isLoggedIn) return;

    const eventSource = new EventSource('/api/notification/subscribe', {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('🔔 알림 수신:', data);
      setUnreadCount(data.countUnreadNotifications);
    };

    eventSource.onerror = (error) => {
      console.error('❌ SSE 연결 오류:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [isLoggedIn]);

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
          <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        ) : null}
        <main className="flex-1">
          <Outlet context={{ showSidebar }} />
        </main>
      </div>
    </div>
  );
}

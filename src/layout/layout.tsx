import { Header } from '@/components/header/Header';
import SideBar from '@/components/side-bar/SideBar';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const sharedPagesData = [
  { id: '1', title: '공유 페이지 1' },
  { id: '2', title: '공유 페이지 2' },
]; // 해당 데이터는 목데이터로, 추후 query로 대체

export default function Layout() {
  const location = useLocation();
  const path = location.pathname;
  const [showSidebar, setShowSidebar] = useState(true);
  const isLoggedIn = true; //추후 유저 정보를 전역으로 관리하여 해당값 boolean 처리. 임시로 true로 두었음.

  const isLoginPage = path === '/login';
  const isSignUpPage = path === '/signup';
  const isLadningPage = path === '/landing';

  const isHideSidebar = isLoginPage || isSignUpPage || isLadningPage; // 로그인 페이지 또는 회원가입 페이지에서 사이드바 숨김
  const isHideHeader = isLoginPage || isLadningPage; // 로그인 페이지에서 헤더 숨김
  const showHeaderButton = !isSignUpPage; // 회원가입 페이지에서 header의 button 숨김 숨김
  const showDepth = !isLoginPage && !isSignUpPage; // 로그인,회원가입 페이지에서 header의 button 숨김 숨김

  return (
    <div className="flex">
      {!isHideSidebar ? (
        <SideBar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          avatarUrl="/avatar.png"
          nickname="김링크"
          email="linkmoa@gmail.com"
          sharedPages={sharedPagesData}
        />
      ) : null}

      <div className="flex flex-1 flex-col">
        {!isHideHeader ? (
          <Header
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            isLoggedIn={isLoggedIn}
            showDepth={showDepth}
            showHeaderButton={showHeaderButton}
          />
        ) : null}
        <main>
          <Outlet context={{ showSidebar }} />
        </main>
      </div>
    </div>
  );
}

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface BackButtonProps {
  className?: string;
  onClick?: () => void;
  isMobile: boolean;
}

export const BackButton: React.FC<BackButtonProps> = ({
  className = '',
  onClick,
  isMobile,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 개인페이지, 공유 페이지, 북마크 페이지, 폴더 페이지인지 확인
  const isPersonalPage =
    location.pathname === '/' || location.pathname.startsWith('/personal');
  const isSharedPage = location.pathname.startsWith('/shared');
  const isBookmarkPage = location.pathname.startsWith('/bookmarks');
  const isFolderPage = location.pathname.includes('/folder/');
  const shouldShow =
    isPersonalPage || isSharedPage || isBookmarkPage || isFolderPage;

  const handleBackClick = () => {
    if (onClick) {
      onClick();
    } else {
      // 모바일에서도 이전 위치로 이동
      navigate(-1);
    }
  };

  if (!shouldShow || !isMobile) return null;

  return (
    <button
      onClick={handleBackClick}
      className={`hover:bg-gray-10 active:bg-gray-20 absolute top-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md transition-colors ${className}`}
      aria-label="뒤로가기"
    >
      <svg
        className="text-gray-90 h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

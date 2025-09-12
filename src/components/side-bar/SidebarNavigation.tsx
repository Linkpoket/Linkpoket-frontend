import React from 'react';
import { Link } from 'react-router-dom';
import BookMark from '@/assets/widget-ui-assets/BookMark.svg?react';
import BookMarkActive from '@/assets/widget-ui-assets/BookMarkActive.svg?react';
import PersonalPage from '@/assets/widget-ui-assets/PersonalPage.svg?react';
import PersonalPageActive from '@/assets/widget-ui-assets/PersonalPageActive.svg?react';

interface SidebarNavigationProps {
  isPersonalActive: boolean;
  isBookmarksActive: boolean;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  isPersonalActive,
  isBookmarksActive,
}) => {
  return (
    <>
      <Link
        to="/"
        className={`group flex items-center gap-[12px] rounded-[8px] p-[8px] text-[14px] font-[600] ${
          isPersonalActive
            ? 'bg-gray-5 text-gray-90'
            : 'text-gray-70 hover:bg-gray-5'
        }`}
      >
        {isPersonalActive ? (
          <PersonalPageActive width={20} height={20} />
        ) : (
          <PersonalPage width={20} height={20} />
        )}
        개인 페이지
      </Link>

      <Link
        to="/bookmarks"
        className={`group flex items-center gap-[12px] rounded-[8px] p-[8px] text-[14px] font-[600] ${
          isBookmarksActive
            ? 'bg-gray-5 text-gray-90'
            : 'text-gray-70 hover:bg-gray-5'
        }`}
      >
        {isBookmarksActive ? (
          <BookMarkActive width={20} height={20} />
        ) : (
          <BookMark width={20} height={20} />
        )}
        북마크
      </Link>
    </>
  );
};

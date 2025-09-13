import React from 'react';
import { Link } from 'react-router-dom';
import PersonalPage from '@/assets/widget-ui-assets/PersonalPage.svg?react';
import PersonalPageActive from '@/assets/widget-ui-assets/PersonalPageActive.svg?react';
import BookMark from '@/assets/widget-ui-assets/BookMark.svg?react';
import BookMarkActive from '@/assets/widget-ui-assets/BookMarkActive.svg?react';
import SidebarOpen from '@/assets/widget-ui-assets/SidebarOpen.svg?react';

interface CollapsedSidebarProps {
  isPersonalActive: boolean;
  isBookmarksActive: boolean;
  onOpenSidebar: () => void;
}

export const CollapsedSidebar: React.FC<CollapsedSidebarProps> = ({
  isPersonalActive,
  isBookmarksActive,
  onOpenSidebar,
}) => {
  return (
    <aside className="border-gray-10 h-screen w-[80px] border-r p-4">
      <div className="flex justify-end">
        <button
          onClick={onOpenSidebar}
          className="mb-2 cursor-pointer"
          aria-label="사이드바 열기"
        >
          <SidebarOpen />
        </button>
      </div>

      <div className="flex flex-col items-center gap-[8px]">
        <button
          className={`cursor-pointer rounded-[8px] p-3 text-[14px] font-[600] ${
            isPersonalActive
              ? 'bg-gray-5 text-gray-90'
              : 'text-gray-70 hover:bg-gray-5'
          }`}
        >
          <Link to="/">
            {isPersonalActive ? (
              <PersonalPageActive width={20} height={20} />
            ) : (
              <PersonalPage width={20} height={20} />
            )}
          </Link>
        </button>
        <button
          className={`cursor-pointer rounded-[8px] p-3 text-[14px] font-[600] ${
            isBookmarksActive
              ? 'bg-gray-5 text-gray-90'
              : 'text-gray-70 hover:bg-gray-5'
          }`}
        >
          <Link to="/bookmarks">
            {isBookmarksActive ? (
              <BookMarkActive width={20} height={20} />
            ) : (
              <BookMark width={20} height={20} />
            )}
          </Link>
        </button>
      </div>
    </aside>
  );
};

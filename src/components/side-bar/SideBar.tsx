import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BookMark from '@/assets/widget-ui-assets/BookMark.svg?react';
import PersonalPage from '@/assets/widget-ui-assets/PersonalPage.svg?react';
import PlusIcon from '@/assets/common-ui-assets/PlusIcon.svg?react';
import SidebarOpen from '@/assets/widget-ui-assets/SidebarOpen.svg?react';
import SidebarClose from '@/assets/widget-ui-assets/SidebarClose.svg?react';
import { useMobile } from '@/hooks/useMobile';
import useFetchJoinedPage from '@/hooks/queries/useFetchJoinedPage';

type MenubarProps = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar: React.FC<MenubarProps> = ({ showSidebar, setShowSidebar }) => {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const isMobile = useMobile();

  //768px 이하의 경우, showSidebar를 false처리, 이외엔 true처리
  useEffect(() => {
    setShowSidebar(!isMobile);
  }, [isMobile, setShowSidebar]);

  //useClickOutside 사용시 isMobile === false일 때도 계속 리스너가 등록되어 있어 명시적으로
  useEffect(() => {
    if (!isMobile || !showSidebar) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setShowSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, setShowSidebar, showSidebar]);

  const { joinedPage } = useFetchJoinedPage();
  console.log('joinedPage', joinedPage);

  return showSidebar ? (
    <aside
      ref={sidebarRef}
      className={`border-gray-10 flex h-screen w-[220px] flex-col justify-between border-r ${isMobile ? 'bg-gray-0 absolute top-0 left-0 z-50' : 'relative'} `}
    >
      <div className="flex flex-col gap-[8px] p-[16px]">
        <div className="flex justify-end">
          <button
            onClick={() => setShowSidebar(false)}
            className="cursor-pointer"
          >
            <SidebarClose />
          </button>
        </div>
        <ul>
          <li>
            <Link
              to="/"
              className="group hover:bg-primary-5 text-gray-70 focus:bg-primary-10 focus:text-primary-50 flex items-center gap-[12px] p-[8px] text-[14px] font-[600] hover:rounded-[8px] focus:rounded-[8px]"
            >
              <PersonalPage
                width={20}
                height={20}
                className="group-focus:text-primary-50 text-gray-70"
              />
              개인 페이지
            </Link>

            <Link
              to="bookmarks"
              className="hover:bg-primary-5 group text-gray-70 focus:bg-primary-10 focus:text-primary-50 flex items-center gap-[12px] p-[8px] text-[14px] font-[600] hover:rounded-[8px] focus:rounded-[8px]"
            >
              <BookMark
                width={20}
                height={20}
                className="text-gray-70 group-focus:text-primary-50 my-[2px]"
              />
              북마크
            </Link>

            <div className="mt-[16px] flex items-center px-[8px] py-[4px] text-[14px] font-[500] text-gray-50 hover:rounded-[8px] focus:rounded-[8px]">
              <div className="group flex w-full items-center justify-between">
                <div className="flex gap-[20px]">
                  <div>공유 페이지</div>
                </div>
                <PlusIcon
                  className="text-gray-40 hover:text-gray-90 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center px-[8px] py-[4px] text-[14px] font-[500] text-gray-50 hover:rounded-[8px] focus:rounded-[8px]">
              <div className="group flex w-full items-center justify-between">
                <div className="flex gap-[20px]">
                  <div>폴더</div>
                </div>
                <PlusIcon
                  className="text-gray-40 hover:text-gray-90 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  ) : (
    <aside className="border-gray-10 h-screen w-[80px] border-r p-4">
      <div className="flex justify-end">
        <button
          onClick={() => setShowSidebar(true)}
          className="mb-2 cursor-pointer"
        >
          <SidebarOpen />
        </button>
      </div>

      <div className="flex flex-col items-center gap-[8px]">
        <div className="p-3">
          <PersonalPage
            width={20}
            height={20}
            className="group-focus:text-primary-50 text-gray-70"
          />
        </div>
        <div className="p-3">
          <BookMark
            width={20}
            height={20}
            className="text-gray-70 group-focus:text-primary-50 my-[2px]"
          />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;

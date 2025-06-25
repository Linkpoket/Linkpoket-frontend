import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import BookMark from '@/assets/widget-ui-assets/BookMark.svg?react';
import PersonalPage from '@/assets/widget-ui-assets/PersonalPage.svg?react';
import SharedPage from '@/assets/widget-ui-assets/SharedPage.svg?react';
import PlusIcon from '@/assets/common-ui-assets/PlusIcon.svg?react';
import { useMobile } from '@/hooks/useMobile';
import { useUserStore } from '@/stores/userStore';
import AddSharedPageModal from '../modal/page/AddSharedPageModal';
import useFetchJoinedPage from '@/hooks/queries/useFetchJoinedPage';
import { JoinedPageData } from '@/types/pages';
import { useProfileModalStore } from '@/stores/profileModalStore';

type MenubarProps = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar: React.FC<MenubarProps> = ({ showSidebar, setShowSidebar }) => {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const isMobile = useMobile();
  const { nickname, email, colorCode } = useUserStore();
  const [showAddSharedPageModal, setShowAddSharedPageModal] = useState(false);
  const { openProfileModal } = useProfileModalStore();

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

  // 현재 참여중인 페이지 호출
  const { joinedPage } = useFetchJoinedPage();
  //첫 번째 항목은 항상 개인 페이지이므로 제외합니다
  const joinedPageData = (joinedPage ?? []).slice(1);

  //추후 지울 코드 (개발중 res값 확인용)
  useEffect(() => {
    if (joinedPage) {
      console.log('참여중인 페이지', joinedPage);
    }
  }, [joinedPage]);

  return showSidebar ? (
    <aside
      ref={sidebarRef}
      className={`border-gray-30 flex h-screen w-[260px] flex-col justify-between border-r ${isMobile ? 'bg-gray-0 absolute top-0 left-0 z-50' : 'relative'} `}
    >
      {/* TODO: 유저 정보쪽 데이터 전달까지 스켈레톤 처리 필요 */}
      <div className="flex flex-col gap-[16px] px-[12px] pt-[24px] pb-[8px]">
        <div className="flex flex-col gap-[16px]">
          <div
            className="flex gap-[12px] p-[8px] hover:cursor-pointer"
            onClick={() => openProfileModal()}
          >
            <div
              style={{ backgroundColor: colorCode }}
              className="flex h-[50px] w-[50px] items-center justify-center rounded-full p-[8px] text-[22px]"
            >
              {nickname.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-gray-90 text-[18px] font-semibold">
                {nickname}
              </p>
              <p className="text-[16px] font-[400] text-gray-50">{email}</p>
            </div>
          </div>
        </div>
        {/* 메뉴 리스트 */}
        <ul>
          <li>
            <Link
              to="bookmarks"
              className="hover:bg-primary-5 group text-gray-90 focus:bg-primary-10 focus:text-primary-50 flex items-center gap-[20px] px-[8px] py-[12px] text-[18px] font-[600] hover:rounded-[8px] focus:rounded-[8px]"
            >
              <BookMark
                width={16}
                height={20}
                className="text-gray-90 group-focus:text-primary-50 mx-[4px] my-[2px]"
              />
              즐겨찾기 / 북마크
            </Link>
            <Link
              to="/"
              className="group hover:bg-primary-5 text-gray-90 focus:bg-primary-10 focus:text-primary-50 flex items-center gap-[20px] px-[8px] py-[14px] text-[18px] font-[600] hover:rounded-[8px] focus:rounded-[8px]"
            >
              <PersonalPage
                width={20}
                height={20}
                className="group-focus:text-primary-50 m-[2px]"
              />
              개인 페이지
            </Link>
            <Link
              to="#"
              className="group hover:bg-primary-5 text-gray-90 focus:bg-primary-10 focus:text-primary-50 flex items-center px-[8px] py-[14px] text-[18px] font-[600] hover:rounded-[8px] focus:rounded-[8px]"
            >
              <div className="group flex w-full items-center justify-between">
                <div className="flex gap-[20px]">
                  <SharedPage
                    width={20}
                    height={20}
                    className="group-focus:text-primary-50 m-[2px]"
                  />
                  <div>공유 페이지</div>
                </div>
                <PlusIcon
                  className="text-gray-60 hover:text-gray-90 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setShowAddSharedPageModal(true);
                  }}
                />
              </div>
            </Link>
            {showAddSharedPageModal && (
              <AddSharedPageModal
                isOpen={showAddSharedPageModal}
                onClose={() => setShowAddSharedPageModal(false)}
              />
            )}

            {joinedPageData.map((page: JoinedPageData) => (
              <Link
                to={`shared/${page.pageId}`}
                key={page.pageId}
                className="text-gray-70 hover:bg-primary-5 focus:bg-primary-10 focus:text-primary-50 flex py-[12px] pr-[8px] pl-[52px] text-[18px] font-[600] hover:rounded-[8px] focus:rounded-[8px]"
              >
                {page.pageTitle}
              </Link>
            ))}
          </li>
        </ul>
      </div>

      <Footer />
    </aside>
  ) : null;
};

export default SideBar;

// 다음과 같이 사용함

// import SideBar from '@/widgets/side-bar/SideBar';

// const sharedPagesData = [
//   { id: '1', title: '공유 페이지 1' },
//   { id: '2', title: '공유 페이지 2' },
// ];

// export default function TEST() {
//   return (
//     <div>
//       <SideBar
//         sharedPages={sharedPagesData}
//         showFooter={true}
//       />
//     </div>
//   );
// }

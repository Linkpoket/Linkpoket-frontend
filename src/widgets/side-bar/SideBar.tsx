import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { HamburgerButton } from '../header/HamburgerButton';
import BookMark from '@/widgets/assets/BookMark.svg?react';
import PersonalPage from '@/widgets/assets/PersonalPage.svg?react';
import SharedPage from '@/widgets/assets/SharedPage.svg?react';
import PlusIcon from '@/shared/assets/PlusIcon.svg?react';

type SharedPage = {
  id: string;
  title: string;
};

type MenubarProps = {
  avatarUrl: string;
  nickname: string;
  email: string;
  sharedPages: SharedPage[];
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar: React.FC<MenubarProps> = ({
  avatarUrl,
  nickname,
  email,
  sharedPages,
  showSidebar,
  setShowSidebar,
}) => {
  const HandleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return showSidebar ? (
    <aside className="border-r-gray-30 flex min-h-screen w-[260px] flex-col justify-between border-r">
      <div className="flex flex-col gap-[16px] px-[12px] pt-[12px] pb-[8px]">
        <div className="flex flex-col gap-[16px]">
          <div className="py-[10px]">
            <HamburgerButton onClick={HandleSidebar} />
          </div>
          <div className="flex gap-[12px] p-[8px]">
            <img
              src={avatarUrl}
              alt="avatar"
              className="rounded-full p-[8px]"
            />
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
          <Link
            to="#"
            className="hover:bg-primary-5 group text-gray-90 focus:bg-primary-10 focus:text-primary-50 flex items-center gap-[20px] px-[8px] py-[12px] text-[18px] font-[600] hover:rounded-[8px] focus:rounded-[8px]"
          >
            <BookMark className="text-gray-90 group-focus:text-primary-50" />
            즐겨찾기 / 북마크
          </Link>
          <Link
            to="#"
            className="group hover:bg-primary-5 text-gray-90 focus:bg-primary-10 focus:text-primary-50 flex items-center gap-[20px] px-[8px] py-[14px] text-[18px] font-[600] hover:rounded-[8px] focus:rounded-[8px]"
          >
            <PersonalPage className="group-focus:text-primary-50" /> 개인 페이지
          </Link>
          <Link
            to="#"
            className="group hover:bg-primary-5 text-gray-90 focus:bg-primary-10 focus:text-primary-50 flex items-center px-[8px] py-[14px] text-[18px] font-[600] hover:rounded-[8px] focus:rounded-[8px]"
          >
            <div className="group flex w-full items-center justify-between">
              <div className="flex gap-[20px]">
                <SharedPage className="group-focus:text-primary-50" />
                <div>공유 페이지</div>
              </div>
              <PlusIcon className="text-gray-60 hover:text-gray-90 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </Link>

          {sharedPages.map((page) => (
            <Link
              to="#"
              key={page.id}
              // TODO: 만약 공유페이지에도 아이콘이 들어간다면 padding 수정
              className="text-gray-70 hover:bg-primary-5 focus:bg-primary-10 focus:text-primary-50 flex py-[12px] pr-[8px] pl-[52px] text-[18px] font-[600] hover:rounded-[8px] focus:rounded-[8px]"
            >
              {page.title}
            </Link>
          ))}
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
//         avatarUrl="/avatar.png"
//         nickname="김링크"
//         email="linkmoa@gmail.com"
//         sharedPages={sharedPagesData}
//         showFooter={true}
//       />
//     </div>
//   );
// }

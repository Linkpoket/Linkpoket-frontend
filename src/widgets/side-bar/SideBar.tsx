import React from 'react';
import { Footer } from '../footer/Footer';
import { HamburgerButton } from '../header/HamburgerButton';
import BookMark from '@/widgets/assets/BookMark.svg?react';
import PersonalPage from '@/widgets/assets/PersonalPage.svg?react';
import SharedPage from '@/widgets/assets/SharedPage.svg?react';
import { Link } from 'react-router-dom';

type SharedPage = {
  id: string;
  title: string;
};

type MenubarProps = {
  avatarUrl: string;
  nickname: string;
  email: string;
  sharedPages: SharedPage[];
  showFooter?: boolean;
};

const SideBar: React.FC<MenubarProps> = ({
  avatarUrl,
  nickname,
  email,
  sharedPages,
  showFooter = true,
}) => {
  return (
    <aside className="flex flex-col justify-between h-screen w-[320px] pt-[14px] px-[10px]">
      <div className="mb-[16px]">
        <div className="flex flex-col gap-[16px]">
          <HamburgerButton />
          <div className="flex gap-[12px] py-[8px] px-[10px]">
            <img src={avatarUrl} alt="avatar" className="p-[8px]" />
            <div>
              <p className="text-gray-90 text-[21px] font-bold">{nickname}</p>
              <p className="text-gray-50 text-[17px] font-[400]">{email}</p>
            </div>
          </div>
        </div>

        {/* 메뉴 리스트 */}
        <ul>
          <Link
            to="#"
            className="group flex items-center gap-[20px] py-[14px] px-[8px] text-gray-90 font-[600] active:bg-primary-10 active:text-primary-50"
          >
            <BookMark className="text-gray-90 group-active:text-primary-50" />
            즐겨찾기 / 북마크
          </Link>
          <Link
            to="#"
            className="group flex items-center  gap-[20px] py-[14px] px-[8px] text-gray-90 font-[600] active:bg-primary-10 active:text-primary-50"
          >
            <PersonalPage className="group-active:text-primary-50" /> 개인
            페이지
          </Link>
          <Link
            to="#"
            className="group flex items-center  gap-[20px] py-[14px] px-[8px] text-gray-90 font-[600] active:bg-primary-10 active:text-primary-50"
          >
            <SharedPage className="group-active:text-primary-50" /> 공유 페이지
          </Link>

          {sharedPages.map((page) => (
            <Link
              to="#"
              key={page.id}
              // TODO: 만약 공유페이지에도 아이콘이 들어간다면 padding 수정
              className="flex gap-[20px] py-[14px] pl-[48px] pr-[8px] text-gray-90 font-[500] active:bg-primary-10 active:text-primary-50"
            >
              {page.title}
            </Link>
          ))}
        </ul>
      </div>

      {showFooter && <Footer />}
    </aside>
  );
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

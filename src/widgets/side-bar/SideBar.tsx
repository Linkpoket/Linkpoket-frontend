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
    <aside className="border-r-gray-30 flex min-h-screen w-[320px] flex-col justify-between border-r">
      <div className="gap-[16px pt-[14px]] mb-[16px] flex flex-col px-[10px]">
        <div className="flex flex-col gap-[16px]">
          <div className="py-[10px]">
            <HamburgerButton onClick={HandleSidebar} />
          </div>
          <div className="flex gap-[12px] px-[10px] py-[8px]">
            <img src={avatarUrl} alt="avatar" className="p-[8px]" />
            <div>
              <p className="text-gray-90 text-[21px] font-bold">{nickname}</p>
              <p className="text-[17px] font-[400] text-gray-50">{email}</p>
            </div>
          </div>
        </div>
        {/* 메뉴 리스트 */}
        <ul>
          <Link
            to="#"
            className="group text-gray-90 focus:bg-primary-10 focus:text-primary-50 flex items-center gap-[20px] px-[8px] py-[14px] font-[600] focus:rounded-[8px]"
          >
            <BookMark className="text-gray-90 group-focus:text-primary-50" />
            즐겨찾기 / 북마크
          </Link>
          <Link
            to="#"
            className="group text-gray-90 focus:bg-primary-10 focus:text-primary-50 flex items-center gap-[20px] px-[8px] py-[14px] font-[600] focus:rounded-[8px]"
          >
            <PersonalPage className="group-focus:text-primary-50" /> 개인 페이지
          </Link>
          <Link
            to="#"
            className="group text-gray-90 focus:bg-primary-10 focus:text-primary-50 flex items-center gap-[20px] px-[8px] py-[14px] font-[600] focus:rounded-[8px]"
          >
            <SharedPage className="group-focus:text-primary-50" /> 공유 페이지
          </Link>

          {sharedPages.map((page) => (
            <Link
              to="#"
              key={page.id}
              // TODO: 만약 공유페이지에도 아이콘이 들어간다면 padding 수정
              className="text-gray-90 focus:bg-primary-10 focus:text-primary-50 flex gap-[20px] py-[14px] pr-[8px] pl-[48px] font-[500] focus:rounded-[8px]"
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

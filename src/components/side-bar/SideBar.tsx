import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BookMark from '@/assets/widget-ui-assets/BookMark.svg?react';
import PersonalPage from '@/assets/widget-ui-assets/PersonalPage.svg?react';
import PlusIcon from '@/assets/common-ui-assets/PlusIcon.svg?react';
import SidebarOpen from '@/assets/widget-ui-assets/SidebarOpen.svg?react';
import SidebarClose from '@/assets/widget-ui-assets/SidebarClose.svg?react';
import { useMobile } from '@/hooks/useMobile';
import useFetchJoinedPage from '@/hooks/queries/useFetchJoinedPage';
import { useCreateSharedPage } from '@/hooks/mutations/useCreateSharedPage';
import { useCreateFolder } from '@/hooks/mutations/useCreateFolder';
import { toast } from 'react-hot-toast';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import useFetchFolderList from '@/hooks/queries/useFetchFolderList';

type MenubarProps = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isFoldSidebar: boolean;
  setIsFoldSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar: React.FC<MenubarProps> = ({
  showSidebar,
  setShowSidebar,
  isFoldSidebar,
  setIsFoldSidebar,
}) => {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const isMobile = useMobile();
  const { pageId } = usePageStore();
  const { parentsFolderId } = useParentsFolderIdStore();
  const isBookmarks = useLocation().pathname === '/bookmarks';
  const location = useLocation();

  //768px 이하의 경우, showSidebar를 false처리, 이외엔 true처리
  useEffect(() => {
    setShowSidebar(!isMobile);
    setIsFoldSidebar(isMobile);
  }, [isMobile, setShowSidebar, setIsFoldSidebar]);

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

  //사이드바 페이지 목록 조회
  const { joinedPage } = useFetchJoinedPage();

  //사이드바 폴더 목록 조회
  const { folderList } = useFetchFolderList(pageId);
  const refinedFolderList = folderList?.data?.directories;

  //공유페이지 생성
  const { mutate: createSharedPage } = useCreateSharedPage({
    onSuccess: () => {
      toast.success('공유페이지 생성 완료');
    },
    onError: () => {
      toast.error('공유페이지 생성 실패');
    },
  });

  const handleCreateSharedPage = () => {
    createSharedPage({
      pageType: 'SHARED',
    });
  };

  //폴더 생성
  const { mutate: createFolder } = useCreateFolder(pageId as string, {
    onSuccess: () => {
      toast.success('폴더 생성 완료');
    },
    onError: () => {
      toast.error('폴더 생성 실패');
    },
  });

  const handleCreateFolder = () => {
    createFolder({
      baseRequest: {
        pageId: pageId as string,
        commandType: 'CREATE',
      },
      folderName: '새 폴더',
      parentFolderId: parentsFolderId as string,
    });
  };

  if (
    (showSidebar && !isFoldSidebar && !isMobile) ||
    (isMobile && showSidebar)
  ) {
    return (
      <aside
        ref={sidebarRef}
        className={`border-gray-10 flex h-screen w-[220px] flex-col justify-between border-r ${isMobile ? 'bg-gray-0 absolute top-0 left-0 z-50' : 'relative'} `}
      >
        <div className="flex flex-col gap-[8px] p-[16px]">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setShowSidebar(false);
                setIsFoldSidebar(true);
              }}
              className="cursor-pointer"
              aria-label="사이드바 닫기"
            >
              <SidebarClose />
            </button>
          </div>
          <ul>
            <li>
              <Link
                to="/"
                className={`group flex items-center gap-[12px] rounded-[8px] p-[8px] text-[14px] font-[600] ${
                  location.pathname === '/'
                    ? 'bg-primary-10 text-primary-50'
                    : 'text-gray-70 hover:bg-primary-5 hover:text-primary-50 hover:rounded-[8px]'
                }`}
              >
                <PersonalPage
                  width={20}
                  height={20}
                  className={`${
                    location.pathname === '/'
                      ? 'text-primary-50'
                      : 'text-gray-70'
                  }`}
                />
                개인 페이지
              </Link>

              <Link
                to="bookmarks"
                className={`group flex items-center gap-[12px] rounded-[8px] p-[8px] text-[14px] font-[600] ${
                  location.pathname === '/bookmarks'
                    ? 'bg-primary-10 text-primary-50'
                    : 'text-gray-70 hover:bg-primary-5 hover:text-primary-50 hover:rounded-[8px]'
                }`}
              >
                <BookMark
                  width={20}
                  height={20}
                  className={`my-[2px] ${
                    location.pathname === '/bookmarks'
                      ? 'text-primary-50'
                      : 'text-gray-70'
                  }`}
                />
                북마크
              </Link>

              <div className="mt-4 flex items-center px-[8px] py-[4px] text-[14px] font-[500] text-gray-50 hover:rounded-[8px] active:rounded-[8px]">
                <div className="group flex w-full items-center justify-between">
                  <div className="flex gap-[20px]">
                    <div>공유 페이지</div>
                  </div>
                  <PlusIcon
                    className="text-gray-40 hover:text-gray-90 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleCreateSharedPage();
                    }}
                    aria-label="공유페이지 추가"
                    height={18}
                    width={18}
                  />
                </div>
              </div>

              {/* 공유페이지 리스트 */}
              <div className="mt-2 flex flex-col gap-[2px]">
                {joinedPage?.map((page: any) => (
                  <Link
                    key={page.pageId}
                    to={`/shared/${page.pageId}`}
                    className={`block rounded-[8px] py-2 pr-3 pl-2 text-[14px] font-[600] ${
                      location.pathname === `/shared/${page.pageId}`
                        ? 'bg-gray-10 text-gray-90'
                        : 'text-gray-70 hover:bg-gray-5 hover:rounded-[8px]'
                    }`}
                  >
                    {page.pageTitle}
                  </Link>
                ))}
              </div>

              {/* 공유페이지에 따른 폴더 생성  */}
              <div className="mt-4 flex items-center px-[8px] py-[4px] text-[14px] font-[500] text-gray-50 hover:rounded-[8px] active:rounded-[8px]">
                <div className="group flex w-full items-center justify-between">
                  <div className="flex gap-[20px]">
                    <div>폴더</div>
                  </div>
                  <PlusIcon
                    className="text-gray-40 hover:text-gray-90 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleCreateFolder();
                    }}
                    aria-label="폴더 추가"
                    height={18}
                    width={18}
                  />
                </div>
              </div>

              {/* 폴더 뎁스1  리스트 */}
              <div className="mt-2 flex flex-col gap-[2px]">
                {refinedFolderList?.map((folder: any) => (
                  <div key={folder.folderId}>
                    <Link
                      to={`/folder/${folder.folderId}`}
                      className={`block rounded-[8px] py-2 pr-3 pl-2 text-[14px] font-[600] ${
                        location.pathname === `/folder/${folder.folderId}`
                          ? 'bg-primary-10 text-primary-50'
                          : 'text-gray-70 hover:bg-primary-5 hover:text-primary-50 hover:rounded-[8px]'
                      }`}
                    >
                      {folder.folderTitle}
                    </Link>
                    {/* 폴더 뎁스2  리스트 */}
                    {folder.children && (
                      <div className="mt-1 ml-4 flex flex-col gap-[2px]">
                        {folder.children.map((child: any) => (
                          <Link
                            key={child.folderId}
                            to={`/folder/${child.folderId}`}
                            className={`block rounded-[8px] py-2 pr-3 pl-2 text-[14px] font-[600] ${
                              location.pathname === `/folder/${child.folderId}`
                                ? 'bg-primary-10 text-primary-50'
                                : 'text-gray-70 hover:bg-primary-5 hover:text-primary-50 hover:rounded-[8px]'
                            }`}
                          >
                            <span className="pr-2">•</span>
                            <span>{child.folderTitle}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </aside>
    );
  } else if (!showSidebar && isFoldSidebar && !isMobile) {
    return (
      <aside className="border-gray-10 h-screen w-[80px] border-r p-4">
        <div className="flex justify-end">
          <button
            onClick={() => {
              setShowSidebar(true);
              setIsFoldSidebar(false);
            }}
            className="mb-2 cursor-pointer"
            aria-label="사이드바 열기"
          >
            <SidebarOpen />
          </button>
        </div>

        <div className="flex flex-col items-center gap-[8px]">
          <button
            className={`cursor-pointer rounded-[8px] p-3 text-[14px] font-[600] ${
              location.pathname === '/' && !isBookmarks
                ? 'bg-gray-5 text-gray-70'
                : 'text-gray-70'
            }`}
          >
            <Link to="/">
              <PersonalPage
                width={20}
                height={20}
                className={`${
                  location.pathname === '/' ? 'text-primary-50' : 'text-gray-70'
                }`}
              />
            </Link>
          </button>
          <button
            className={`cursor-pointer rounded-[8px] p-3 text-[14px] font-[600] ${
              isBookmarks ? 'bg-gray-5 text-gray-70' : 'text-gray-70'
            }`}
          >
            <Link to="/bookmarks">
              <BookMark
                width={20}
                height={20}
                className={`my-[2px] ${
                  location.pathname === '/bookmarks'
                    ? 'text-primary-50'
                    : 'text-gray-70'
                }`}
              />
            </Link>
          </button>
        </div>
      </aside>
    );
  } else if (isMobile && !showSidebar) {
    return null;
  }
};

export default SideBar;

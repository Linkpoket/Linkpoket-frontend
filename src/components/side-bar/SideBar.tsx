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

              <div className="mt-4 flex items-center px-[8px] py-[4px] text-[14px] font-[500] text-gray-50 hover:rounded-[8px] focus:rounded-[8px]">
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
                  />
                </div>
              </div>

              {/* 공유페이지 리스트 */}
              <div className="mt-2 flex flex-col gap-[2px]">
                {joinedPage?.map((page: any) => (
                  <Link
                    key={page.pageId}
                    to={`/shared/${page.pageId}`}
                    className="text-gray-70 hover:bg-gray-5 focus:bg-gray-5 py-2 pr-3 pl-2 text-[14px] font-[600] hover:rounded-[8px] focus:rounded-[8px]"
                  >
                    {page.pageTitle}
                  </Link>
                ))}
              </div>

              {/* 공유페이지에 따른 폴더 생성  */}
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
                      handleCreateFolder();
                    }}
                  />
                </div>
              </div>

              {/* 폴더 뎁스1  리스트 */}
              <div className="mt-2 flex flex-col gap-[2px]">
                {refinedFolderList?.map((folder: any) => (
                  <Link
                    key={folder.folderId}
                    to={`/folder/${folder.folderId}`}
                    className="text-gray-70 hover:text-primary-50 focus:text-primary-50 hover:bg-primary-5 focus:bg-primary-5 py-2 pr-3 pl-2 text-[14px] font-[600] hover:rounded-[8px] focus:rounded-[8px]"
                  >
                    {folder.folderTitle}
                    {/* 폴더 뎁스2  리스트 */}
                    {folder.children && (
                      <div className="mt-2 flex flex-col gap-[2px]">
                        {folder.children.map((child: any) => (
                          <Link
                            key={child.folderId}
                            to={`/folder/${child.folderId}`}
                            className="text-gray-70 hover:text-primary-50 focus:text-primary-50 hover:bg-primary-5 focus:bg-primary-5 py-2 pr-3 pl-2 text-[14px] font-[600] hover:rounded-[8px] focus:rounded-[8px]"
                          >
                            <span className="pr-2">•</span>
                            <span>{child.folderTitle}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </Link>
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
          >
            <SidebarOpen />
          </button>
        </div>

        <div className="flex flex-col items-center gap-[8px]">
          <button
            className={`cursor-pointer p-3 ${!isBookmarks && 'text-gray-70 bg-gray-5 rounded-[8px] text-[14px] font-[600]'}`}
          >
            <Link to="/">
              <PersonalPage
                width={20}
                height={20}
                className="group-focus:text-primary-50 text-gray-70"
              />
            </Link>
          </button>
          <button
            className={`cursor-pointer p-3 ${isBookmarks && 'text-gray-70 bg-gray-5 rounded-[8px] text-[14px] font-[600]'}`}
          >
            <Link to="/bookmarks">
              <BookMark
                width={20}
                height={20}
                className="text-gray-70 group-focus:text-primary-50 my-[2px]"
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

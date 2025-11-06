import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import BookMark from '@/assets/widget-ui-assets/BookMark.svg?react';
import BookMarkActive from '@/assets/widget-ui-assets/BookMarkActive.svg?react';
import PersonalPage from '@/assets/widget-ui-assets/PersonalPage.svg?react';
import PersonalPageActive from '@/assets/widget-ui-assets/PersonalPageActive.svg?react';
import PlusIcon from '@/assets/common-ui-assets/PlusIcon.svg?react';
import ColorUp from '@/assets/common-ui-assets/ColorUp.svg?react';
import ColorDown from '@/assets/common-ui-assets/ColorDown.svg?react';
import NoColorUp from '@/assets/common-ui-assets/NoColorUp.svg?react';
import NoColorDown from '@/assets/common-ui-assets/NoColorDown.svg?react';
import SidebarOpen from '@/assets/widget-ui-assets/SidebarOpen.svg?react';
import SidebarClose from '@/assets/widget-ui-assets/SidebarClose.svg?react';
import { useMobile } from '@/hooks/useMobile';
import useFetchJoinedPage from '@/hooks/queries/useFetchJoinedPage';
import { useCreateSharedPage } from '@/hooks/mutations/useCreateSharedPage';
import { toast } from 'react-hot-toast';
import { usePageStore } from '@/stores/pageStore';
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
  const [isFolderListOpen, setIsFolderListOpen] = useState(true);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const isMobile = useMobile();
  const { pageId } = usePageStore();
  const location = useLocation();
  const params = useParams();

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

  // 현재 컨텍스트 파악
  const getCurrentContext = () => {
    const path = location.pathname;
    if (path === '/') return 'personal';
    if (path.startsWith('/shared/')) return 'shared';
    if (path.startsWith('/bookmarks')) return 'bookmarks';
    if (path.startsWith('/personal/')) return 'personal';
    return 'personal'; // 기본값
  };

  const currentContext = getCurrentContext();

  // 메뉴 활성 상태 확인
  const isPersonalActive =
    location.pathname === '/' || location.pathname.startsWith('/personal/');
  const isBookmarksActive =
    location.pathname === '/bookmarks' ||
    location.pathname.startsWith('/bookmarks/');
  const isSharedPageActive = (pageId: string) => {
    return (
      location.pathname === `/shared/${pageId}` ||
      location.pathname.startsWith(`/shared/${pageId}/`)
    );
  };

  // 폴더 링크 생성 헬퍼 함수
  const getFolderLink = (folderId: string) => {
    switch (currentContext) {
      case 'shared':
        return `/shared/${params.pageId}/folder/${folderId}`;
      case 'personal':
      default:
        return `/personal/folder/${folderId}`;
    }
  };

  // 현재 폴더가 활성화되어 있는지 확인
  const isFolderActive = (folderId: string) => {
    return location.pathname === getFolderLink(folderId);
  };

  //사이드바 페이지 목록 조회
  const { joinedPage } = useFetchJoinedPage();

  //사이드바 폴더 목록 조회
  const { folderList } = useFetchFolderList(pageId);
  const refinedFolderList = folderList?.data?.folders;

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

  const handleToggleFolderList = () => {
    setIsFolderListOpen(!isFolderListOpen);
  };

  // 펼쳐진 폴더들의 ID를 저장 (초기값: 빈 Set = 모든 폴더 접힌 상태)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );

  // 폴더 토글 함수
  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  const FolderToggleIcon = ({
    isCollapsed,
    folderId,
  }: {
    isCollapsed: boolean;
    folderId: string;
  }) => {
    const isActive = isFolderActive(folderId);

    if (isActive) {
      return isCollapsed ? (
        <ColorDown width={16} height={16} />
      ) : (
        <ColorUp width={16} height={16} />
      );
    } else {
      return isCollapsed ? (
        <NoColorDown width={16} height={16} />
      ) : (
        <NoColorUp width={16} height={16} />
      );
    }
  };

  //JSX
  if (
    (showSidebar && !isFoldSidebar && !isMobile) ||
    (isMobile && showSidebar)
  ) {
    return (
      <aside
        ref={sidebarRef}
        className={`border-gray-10 flex h-screen flex-col justify-between border-r ${isMobile ? 'bg-gray-0 absolute top-0 left-0 z-50 w-[220px]' : 'relative w-[15vw] min-w-[150px]'} `}
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
                className={`group flex items-center gap-[12px] rounded-[8px] p-[8px] text-[clamp(12px,15vw,14px)] font-[600] ${
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
                className={`group flex items-center gap-[12px] rounded-[8px] p-[8px] text-[min(0.5vw,15px)] font-[600] ${
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

              <div className="mt-4 flex items-center px-[8px] py-[4px] text-[min(0.5vw,15px)] font-[500] text-gray-50 hover:rounded-[8px] active:rounded-[8px]">
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
                    className={`block rounded-[8px] py-2 pr-3 pl-2 text-[min(0.5vw,15px)] font-[600] ${
                      isSharedPageActive(page.pageId)
                        ? 'bg-gray-5 text-gray-90'
                        : 'text-gray-70 hover:bg-gray-5'
                    }`}
                  >
                    {page.pageTitle}
                  </Link>
                ))}
              </div>

              {/* 폴더 섹션 - 개인페이지 내 폴더 표시 */}
              {currentContext === 'personal' && (
                <>
                  <div className="mt-4 flex items-center px-[8px] py-[4px] text-[min(0.5vw,15px)] font-[500] text-gray-50 hover:rounded-[8px] active:rounded-[8px]">
                    <div className="group flex w-full items-center justify-between">
                      <div className="flex gap-[20px]">
                        <div>폴더</div>
                      </div>
                      {isFolderListOpen ? (
                        <NoColorUp
                          className="text-gray-40 hover:text-gray-90 cursor-pointer"
                          onClick={(e) => {
                            if (location.pathname === '/bookmarks') {
                              toast.error(
                                '북마크에서는 폴더를 생성할 수 없습니다.'
                              );
                            }
                            e.stopPropagation();
                            e.preventDefault();
                            handleToggleFolderList();
                          }}
                          aria-label="폴더 추가"
                          height={18}
                          width={18}
                        />
                      ) : (
                        <NoColorDown
                          className="text-gray-40 hover:text-gray-90 cursor-pointer"
                          onClick={(e) => {
                            if (location.pathname === '/bookmarks') {
                              toast.error(
                                '북마크에서는 폴더를 생성할 수 없습니다.'
                              );
                            }
                            e.stopPropagation();
                            e.preventDefault();
                            handleToggleFolderList();
                          }}
                          aria-label="폴더 추가"
                          height={18}
                          width={18}
                        />
                      )}
                    </div>
                  </div>

                  {isFolderListOpen && (
                    <>
                      {/* 폴더 뎁스1 리스트 */}
                      <div className="mt-2 flex flex-col gap-[2px]">
                        {refinedFolderList?.map((folder: any) => (
                          <div key={folder.folderId}>
                            <div className="flex items-center">
                              {/* 하위 폴더가 있는 경우 화살표 표시 */}

                              <Link
                                to={getFolderLink(folder.folderId)}
                                className={`flex w-full items-center justify-between rounded-[8px] py-2 pr-3 pl-2 text-[min(0.5vw,15px)] font-[600] ${
                                  isFolderActive(folder.folderId)
                                    ? 'bg-primary-5 text-primary-50'
                                    : 'text-gray-70 hover:bg-primary-5'
                                }`}
                              >
                                {folder.folderTitle}
                                {folder.children &&
                                folder.children.length > 0 ? (
                                  <button
                                    onClick={() =>
                                      toggleFolder(folder.folderId)
                                    }
                                    className="hover:text-gray-70 mr-1 flex h-4 w-4 cursor-pointer items-center justify-center text-gray-50"
                                    aria-label={`${folder.folderTitle} 폴더 ${expandedFolders.has(folder.folderId) ? '접기' : '펼치기'}`}
                                  >
                                    <FolderToggleIcon
                                      isCollapsed={
                                        !expandedFolders.has(folder.folderId)
                                      }
                                      folderId={folder.folderId}
                                    />
                                  </button>
                                ) : (
                                  <div className="mr-1 h-4 w-4" />
                                )}
                              </Link>
                            </div>

                            {/* 폴더 뎁스2 리스트 - 펼쳐져 있을 때만 표시 */}
                            {folder.children &&
                              folder.children.length > 0 &&
                              expandedFolders.has(folder.folderId) && (
                                <div className="mt-1 ml-5 flex flex-col gap-[2px]">
                                  {folder.children.map((child: any) => (
                                    <Link
                                      key={child.folderId}
                                      to={getFolderLink(child.folderId)}
                                      className={`block rounded-[8px] py-2 pr-3 pl-2 text-[min(0.5vw,15px)] font-[600] ${
                                        isFolderActive(child.folderId)
                                          ? 'bg-primary-5 text-primary-50'
                                          : 'text-gray-70 hover:bg-primary-5'
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
                    </>
                  )}
                </>
              )}

              {/* 공유페이지 내 폴더 표시 */}
              {currentContext === 'shared' && params.pageId && (
                <>
                  <div className="mt-4 flex items-center px-[8px] py-[4px] text-[min(0.5vw,15px)] font-[500] text-gray-50 hover:rounded-[8px] active:rounded-[8px]">
                    <div className="group flex w-full items-center justify-between">
                      <div className="flex gap-[20px]">
                        <div>폴더</div>
                      </div>
                      {isFolderListOpen ? (
                        <NoColorUp
                          className="text-gray-40 hover:text-gray-90 cursor-pointer"
                          onClick={(e) => {
                            if (location.pathname === '/bookmarks') {
                              toast.error(
                                '북마크에서는 폴더를 생성할 수 없습니다.'
                              );
                            }
                            e.stopPropagation();
                            e.preventDefault();
                            handleToggleFolderList();
                          }}
                          aria-label="폴더 추가"
                          height={18}
                          width={18}
                        />
                      ) : (
                        <NoColorDown
                          className="text-gray-40 hover:text-gray-90 cursor-pointer"
                          onClick={(e) => {
                            if (location.pathname === '/bookmarks') {
                              toast.error(
                                '북마크에서는 폴더를 생성할 수 없습니다.'
                              );
                            }
                            e.stopPropagation();
                            e.preventDefault();
                            handleToggleFolderList();
                          }}
                          aria-label="폴더 추가"
                          height={18}
                          width={18}
                        />
                      )}
                    </div>
                  </div>
                  {isFolderListOpen && (
                    <>
                      <div className="mt-2 flex flex-col gap-[2px]">
                        {refinedFolderList?.map((folder: any) => (
                          <div key={folder.folderId}>
                            <div className="flex items-center">
                              {/* 하위 폴더가 있는 경우 화살표 표시 */}

                              <Link
                                to={`/shared/${params.pageId}/folder/${folder.folderId}`}
                                className={`flex w-full items-center justify-between rounded-[8px] py-2 pr-3 pl-2 text-[min(0.5vw,15px)] font-[600] ${
                                  location.pathname ===
                                  `/shared/${params.pageId}/folder/${folder.folderId}`
                                    ? 'bg-primary-5 text-primary-50'
                                    : 'text-gray-70 hover:bg-primary-5'
                                }`}
                              >
                                {folder.folderTitle}
                                {folder.children &&
                                folder.children.length > 0 ? (
                                  <button
                                    onClick={() =>
                                      toggleFolder(folder.folderId)
                                    }
                                    className="hover:text-gray-70 mr-1 flex h-4 w-4 cursor-pointer items-center justify-center text-gray-50"
                                    aria-label={`${folder.folderTitle} 폴더 ${expandedFolders.has(folder.folderId) ? '접기' : '펼치기'}`}
                                  >
                                    <FolderToggleIcon
                                      isCollapsed={
                                        !expandedFolders.has(folder.folderId)
                                      }
                                      folderId={folder.folderId}
                                    />
                                  </button>
                                ) : (
                                  <div className="mr-1 h-4 w-4" />
                                )}
                              </Link>
                            </div>

                            {/* 폴더 뎁스2 리스트 - 펼쳐져 있을 때만 표시 */}
                            {folder.children &&
                              folder.children.length > 0 &&
                              expandedFolders.has(folder.folderId) && (
                                <div className="mt-1 ml-5 flex flex-col gap-[2px]">
                                  {folder.children.map((child: any) => (
                                    <Link
                                      key={child.folderId}
                                      to={`/shared/${params.pageId}/folder/${child.folderId}`}
                                      className={`block rounded-[8px] py-2 pr-3 pl-2 text-[min(0.5vw,15px)] font-[600] ${
                                        location.pathname ===
                                        `/shared/${params.pageId}/folder/${child.folderId}`
                                          ? 'bg-primary-5 text-primary-50'
                                          : 'text-gray-70 hover:bg-primary-5'
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
                    </>
                  )}
                </>
              )}
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
            className={`cursor-pointer rounded-[8px] p-3 text-[min(0.5vw,15px)] font-[600] ${
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
            className={`cursor-pointer rounded-[8px] p-3 text-[min(0.5vw,15px)] font-[600] ${
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
  } else if (isMobile && !showSidebar) {
    return null;
  }
};

export default SideBar;

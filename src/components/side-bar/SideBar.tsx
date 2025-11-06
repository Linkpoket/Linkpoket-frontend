import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useMobile } from '@/hooks/useMobile';
import useFetchJoinedPage from '@/hooks/queries/useFetchJoinedPage';
import { useCreateSharedPage } from '@/hooks/mutations/useCreateSharedPage';
import { useCreateFolder } from '@/hooks/mutations/useCreateFolder';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import useFetchFolderList from '@/hooks/queries/useFetchFolderList';
import { toast } from 'react-hot-toast';
import {
  getCurrentContext,
  isPersonalActive as checkPersonalActive,
  isBookmarksActive as checkBookmarksActive,
  isSharedPageActive as checkSharedPageActive,
  getFolderLink as createFolderLink,
  isFolderActive as checkFolderActive,
} from '@/utils/sidebarRouting';
import SidebarClose from '@/assets/widget-ui-assets/SidebarClose.svg?react';
import FolderList from './FolderList';
import SharedPageList from './SharedPageList';
import MainMenuItems from './MainMenuItems';
import FoldedSidebar from './FoldedSidebar';
import SharedPageSectionHeader from './SharedPageSectionHeader';
import FolderSectionHeader from './FolderSectionHeader';

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
  const { parentsFolderId } = useParentsFolderIdStore();
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
  const currentContext = getCurrentContext(location.pathname);

  // 메뉴 활성 상태 확인
  const isPersonalActive = checkPersonalActive(location.pathname);
  const isBookmarksActive = checkBookmarksActive(location.pathname);
  const isSharedPageActive = (pageId: number) => {
    return checkSharedPageActive(location.pathname, pageId);
  };

  // 폴더 링크 생성 헬퍼 함수
  const getFolderLink = (folderId: number) => {
    return createFolderLink(currentContext, folderId, params.pageId);
  };

  // 현재 폴더가 활성화되어 있는지 확인
  const isFolderActive = (folderId: number) => {
    const folderLink = getFolderLink(folderId);
    return checkFolderActive(location.pathname, folderLink);
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

  //폴더 생성
  const { mutate: createFolder } = useCreateFolder(pageId, {
    onSuccess: () => {
      toast.success('폴더 생성 완료');
    },
    onError: (error: any) => {
      toast.error((error as any).response.data.detail);
    },
  });

  const handleCreateFolder = () => {
    createFolder({
      baseRequest: {
        pageId: pageId,
        commandType: 'CREATE',
      },
      folderName: '새 폴더',
      parentFolderId: parentsFolderId ?? 0,
    });
  };

  const handleToggleFolderList = () => {
    setIsFolderListOpen((prev) => !prev);
  };

  //JSX
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
              <MainMenuItems
                isPersonalActive={isPersonalActive}
                isBookmarksActive={isBookmarksActive}
              />

              <SharedPageSectionHeader
                onCreateClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleCreateSharedPage();
                }}
              />

              {/* 공유페이지 리스트 */}
              {joinedPage && (
                <SharedPageList
                  pages={joinedPage}
                  isSharedPageActive={isSharedPageActive}
                />
              )}

              {/* 폴더 섹션 - 개인페이지 내 폴더 표시 */}
              {currentContext === 'personal' && refinedFolderList && (
                <>
                  <FolderSectionHeader
                    isOpen={isFolderListOpen}
                    showToggle={true}
                    onToggleClick={(e) => {
                      if (location.pathname === '/bookmarks') {
                        toast.error('북마크에서는 폴더를 생성할 수 없습니다.');
                      }
                      e.stopPropagation();
                      e.preventDefault();
                      handleToggleFolderList();
                    }}
                  />

                  {isFolderListOpen && (
                    <FolderList
                      folders={refinedFolderList}
                      getFolderLink={getFolderLink}
                      isFolderActive={isFolderActive}
                    />
                  )}
                </>
              )}

              {/* 공유페이지 내 폴더 표시 */}
              {currentContext === 'shared' &&
                params.pageId &&
                refinedFolderList && (
                  <>
                    <FolderSectionHeader
                      onCreateClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleCreateFolder();
                      }}
                    />
                    <FolderList
                      folders={refinedFolderList}
                      getFolderLink={getFolderLink}
                      isFolderActive={isFolderActive}
                    />
                  </>
                )}
            </li>
          </ul>
        </div>
      </aside>
    );
  } else if (!showSidebar && isFoldSidebar && !isMobile) {
    return (
      <FoldedSidebar
        isPersonalActive={isPersonalActive}
        isBookmarksActive={isBookmarksActive}
        onOpen={() => {
          setShowSidebar(true);
          setIsFoldSidebar(false);
        }}
      />
    );
  } else if (isMobile && !showSidebar) {
    return null;
  }
};

export default SideBar;

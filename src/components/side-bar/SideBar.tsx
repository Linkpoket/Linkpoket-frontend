import React, { useEffect, useRef } from 'react';
import SidebarClose from '@/assets/widget-ui-assets/SidebarClose.svg?react';
import { toast } from 'react-hot-toast';
import { useCreateSharedPage } from '@/hooks/mutations/useCreateSharedPage';
import { useCreateFolder } from '@/hooks/mutations/useCreateFolder';
import { useMobile } from '@/hooks/useMobile';
import { useSidebarLogic } from '@/hooks/useSidebarLogic';
import { CollapsedSidebar } from './CollapsedSidebar';
import { SidebarNavigation } from './SidebarNavigation';
import { SharedPageSection } from './SharedPageSection';
import { FolderSection } from './FolderSection';

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

  const {
    currentContext,
    pageId,
    parentsFolderId,
    params,
    expandedFolders,
    toggleFolder,
    joinedPage,
    contextualFolderList,
    isPersonalActive,
    isBookmarksActive,
    isSharedPageActive,
    getFolderLink,
    isFolderActive,
  } = useSidebarLogic(setShowSidebar, setIsFoldSidebar);

  // 외부 클릭 감지
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, setShowSidebar, showSidebar]);

  // 공유페이지 생성
  const { mutate: createSharedPage } = useCreateSharedPage({
    onSuccess: () => toast.success('공유페이지 생성 완료'),
    onError: () => toast.error('공유페이지 생성 실패'),
  });

  const handleCreateSharedPage = () => {
    createSharedPage({ pageType: 'SHARED' });
  };

  // 폴더 생성
  const { mutate: createFolder } = useCreateFolder(pageId as string, {
    onSuccess: () => toast.success('폴더 생성 완료'),
    onError: () => toast.error('폴더 생성 실패'),
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

  // 접힌 사이드바 렌더링
  if (!showSidebar && isFoldSidebar && !isMobile) {
    return (
      <CollapsedSidebar
        isPersonalActive={isPersonalActive}
        isBookmarksActive={isBookmarksActive}
        onOpenSidebar={() => {
          setShowSidebar(true);
          setIsFoldSidebar(false);
        }}
      />
    );
  }

  // 모바일에서 숨김 상태
  if (isMobile && !showSidebar) {
    return null;
  }

  // 메인 사이드바 렌더링
  if (
    (showSidebar && !isFoldSidebar && !isMobile) ||
    (isMobile && showSidebar)
  ) {
    return (
      <aside
        ref={sidebarRef}
        className={`border-gray-10 flex h-screen w-[220px] flex-col justify-between border-r ${
          isMobile ? 'bg-gray-0 absolute top-0 left-0 z-50' : 'relative'
        }`}
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
              <SidebarNavigation
                isPersonalActive={isPersonalActive}
                isBookmarksActive={isBookmarksActive}
              />

              <SharedPageSection
                joinedPage={joinedPage}
                isSharedPageActive={isSharedPageActive}
                handleCreateSharedPage={handleCreateSharedPage}
              />

              {/* 개인페이지/북마크 폴더 */}
              {(currentContext === 'personal' ||
                currentContext === 'bookmarks') && (
                <FolderSection
                  contextualFolderList={contextualFolderList}
                  expandedFolders={expandedFolders}
                  toggleFolder={toggleFolder}
                  getFolderLink={getFolderLink}
                  isFolderActive={isFolderActive}
                  handleCreateFolder={handleCreateFolder}
                />
              )}

              {/* 공유페이지 폴더 */}
              {currentContext === 'shared' && params.pageId && (
                <FolderSection
                  contextualFolderList={contextualFolderList}
                  expandedFolders={expandedFolders}
                  toggleFolder={toggleFolder}
                  getFolderLink={getFolderLink}
                  isFolderActive={isFolderActive}
                  handleCreateFolder={handleCreateFolder}
                />
              )}
            </li>
          </ul>
        </div>
      </aside>
    );
  }
};

export default SideBar;

import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useMobile } from '@/hooks/useMobile';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import useFetchJoinedPage from '@/hooks/queries/useFetchJoinedPage';
import useFetchFolderList from '@/hooks/queries/useFetchFolderList';
import useFetchFavorite from '@/hooks/queries/useFetchFavorite';

export const useSidebarLogic = (
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>,
  setIsFoldSidebar: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const isMobile = useMobile();
  const { pageId } = usePageStore();
  const { parentsFolderId } = useParentsFolderIdStore();
  const location = useLocation();
  const params = useParams();

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );

  // 현재 컨텍스트 파악
  const getCurrentContext = () => {
    const path = location.pathname;
    if (path === '/') return 'personal';
    if (path.startsWith('/shared/')) return 'shared';
    if (path.startsWith('/bookmarks')) return 'bookmarks';
    if (path.startsWith('/personal/')) return 'personal';
    return 'personal';
  };

  const currentContext = getCurrentContext();

  // 데이터 조회
  const { joinedPage } = useFetchJoinedPage();
  const { folderList } = useFetchFolderList(pageId);
  const { favorite } = useFetchFavorite();

  // 컨텍스트별 폴더 목록
  const getContextualFolderList = () => {
    switch (currentContext) {
      case 'bookmarks':
        return favorite?.directorySimpleResponses || [];
      case 'personal':
      case 'shared':
      default:
        return folderList?.data?.folders || [];
    }
  };

  const contextualFolderList = getContextualFolderList();

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

  // 폴더 링크 생성
  const getFolderLink = (folderId: string) => {
    switch (currentContext) {
      case 'shared':
        return `/shared/${params.pageId}/folder/${folderId}`;
      case 'bookmarks':
        return `/bookmarks/folder/${folderId}`;
      case 'personal':
      default:
        return `/personal/folder/${folderId}`;
    }
  };

  // 현재 폴더 활성 상태
  const isFolderActive = (folderId: string) => {
    return location.pathname === getFolderLink(folderId);
  };

  // 모바일 대응
  useEffect(() => {
    setShowSidebar(!isMobile);
    setIsFoldSidebar(isMobile);
  }, [isMobile, setShowSidebar, setIsFoldSidebar]);

  return {
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
  };
};

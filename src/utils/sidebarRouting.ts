export type SidebarContext = 'personal' | 'shared' | 'bookmarks';

//현재 경로를 기반으로 사이드바 경로로 반환
export const getCurrentContext = (pathname: string): SidebarContext => {
  if (pathname === '/') return 'personal';
  if (pathname.startsWith('/shared/')) return 'shared';
  if (pathname.startsWith('/bookmarks')) return 'bookmarks';
  if (pathname.startsWith('/personal/')) return 'personal';
  return 'personal'; // 기본값
};

//개인 페이지가 활성화되어 있는지 확인
export const isPersonalActive = (pathname: string): boolean => {
  return pathname === '/' || pathname.startsWith('/personal/');
};

//북마크 페이지가 활성화되어 있는지 확인
export const isBookmarksActive = (pathname: string): boolean => {
  return pathname === '/bookmarks' || pathname.startsWith('/bookmarks/');
};

// 공유 페이지가 활성화되어 있는지 확인
export const isSharedPageActive = (
  pathname: string,
  pageId: string
): boolean => {
  return (
    pathname === `/shared/${pageId}` ||
    pathname.startsWith(`/shared/${pageId}/`)
  );
};

// 컨텍스트에 따라 폴더 링크를 생성
export const getFolderLink = (
  context: SidebarContext,
  folderId: string,
  pageId?: string
): string => {
  switch (context) {
    case 'shared':
      return `/shared/${pageId}/folder/${folderId}`;
    case 'personal':
    default:
      return `/personal/folder/${folderId}`;
  }
};

// 폴더가 활성화되어 있는지 확인용
export const isFolderActive = (
  pathname: string,
  folderLink: string
): boolean => {
  return pathname === folderLink;
};

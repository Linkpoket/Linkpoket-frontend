import { useState, useRef, Suspense, lazy } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useFolderColorStore } from '@/stores/folderColorStore';
import { useMobile } from '@/hooks/useMobile';
import useUpdateFolderBookmark from '@/hooks/mutations/useUpdateFolderBookmark';
import useFetchFolderDetails from '@/hooks/queries/useFetchFolderDetails';
import { FolderDetail } from '@/types/folders';
import { DropDownInlineSkeleton } from '../skeleton/DropdownInlineSkeleton';
import LinksInFolder from './LinksInFolder';
import FolderBackground from './FolderBackground';
import FolderPocket from './FolderPocket';
import FolderDeviderLine from './FolderDeviderLine';
import InactiveBookmarkIcon from '@/assets/common-ui-assets/InactiveBookmark.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/ActiveBookmark.svg?react';
import CardMenu from '@/assets/widget-ui-assets/CardMenu.svg?react';
const DropDownInline = lazy(() => import('../common-ui/DropDownInline'));

export default function FolderCard({
  isBookmark,
  item,
}: {
  isBookmark: boolean;
  item: FolderDetail;
}) {
  const [isDropDownInline, setIsDropDownInline] = useState(false);
  const isMobile = useMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const { pageId } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const { getCurrentColor } = useFolderColorStore();

  const currentFolderColor = getCurrentColor();
  const folderId = item.folderId?.toString();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const { mutate: updateFolderBookmark } = useUpdateFolderBookmark({
    folderId: folderId,
    pageId: pageId as string,
  });

  // 폴더 상세 정보를 가져와서 링크 정보 추출
  const requestParams = {
    pageId: pageId || '',
    commandType: 'VIEW',
    folderId: item.folderId,
    sortType: 'BASIC',
  };

  const { data: folderDetailsData } = useFetchFolderDetails(requestParams);
  const linkData = folderDetailsData?.data?.linkDetailResponses ?? [];

  const getFolderLink = (folderId: string) => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/shared/')) {
      const pathParts = currentPath.split('/');
      const sharedPageId = pathParts[2];
      return `/shared/${sharedPageId}/folder/${folderId}`;
    }
    if (currentPath.startsWith('/bookmarks')) {
      return `/bookmarks/folder/${folderId}`;
    }
    return `/personal/folder/${folderId}`;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isDropdownArea = target.closest('[data-dropdown]');
    const isButtonArea = target.closest('[data-card-button]');
    const isModalArea = target.closest('[data-ignore-outside-click]');
    if (isDropdownArea || isButtonArea || isModalArea) return;

    setParentsFolderId(folderId);
    const folderLink = getFolderLink(item.folderId);
    navigate(folderLink);
  };

  const handleBookmarkClick = () => {
    updateFolderBookmark();
  };

  const handleMenuClick = () => {
    setIsDropDownInline((v) => !v);
  };

  // 링크 데이터 사용 (상위 3개만)
  const displayLinks = linkData.slice(0, 3);

  return (
    <div
      // 바깥 컨테이너 투명 처리
      className={`group relative flex h-[242px] flex-col items-center gap-4 rounded-[16px] border border-transparent bg-transparent p-[16px] hover:cursor-pointer ${
        isMobile ? 'min-w-[125px]' : 'min-w-[156px]'
      }`}
      onClick={handleCardClick}
    >
      {/* 폴더 스타일 */}
      <div
        className="relative mx-auto"
        style={{
          width: isMobile ? '96px' : '120px',
          height: isMobile ? '96px' : '120px',
        }}
      >
        {/* 폴더 배경 */}
        <FolderBackground backgroundColor={currentFolderColor.gradient} />

        {/* 폴더 내부 링크들 */}
        <LinksInFolder displayLinks={displayLinks} />

        {/* Front pocket (투명도 적용) */}
        <FolderPocket backgroundColor={currentFolderColor.gradient} />

        {/* Divider line */}
        <FolderDeviderLine />
      </div>

      {/* 북마크 버튼 - 우측 상단 */}
      <button
        data-card-button
        className="absolute top-2 right-2 z-10 cursor-pointer"
        onClick={handleBookmarkClick}
        aria-label={isBookmark ? '북마크 제거' : '북마크 추가'}
      >
        {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
      </button>

      {/* 폴더 이름 및 메뉴 버튼 */}
      <div className="flex flex-1 flex-col items-center justify-between">
        <div className="flex flex-col gap-1 text-center">
          <p
            className={`text-[15px] font-bold ${isMobile ? 'overflow-hidden' : ''}`}
            style={
              isMobile
                ? {
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: '1.2em',
                    maxHeight: '2.4em',
                  }
                : {}
            }
          >
            {item.folderName}
          </p>

          {!isMobile && (
            <p className="text-[13px] font-[400] text-gray-50">
              {item.createdDate} · 폴더
            </p>
          )}
        </div>

        <div className="mt-2 flex items-center justify-end">
          <div className="relative">
            <button
              ref={menuButtonRef}
              data-card-button
              className="cursor-pointer p-1"
              onClick={handleMenuClick}
              aria-label="메뉴 열기"
            >
              <CardMenu />
            </button>
          </div>
        </div>

        {/* 드롭다운을 카드 외부로 이동 */}
        {isDropDownInline && (
          <Suspense fallback={<DropDownInlineSkeleton />}>
            <DropDownInline
              id={folderId}
              type="folder"
              initialTitle={item.folderName}
              isDropDownInline={isDropDownInline}
              setIsDropDownInline={setIsDropDownInline}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}

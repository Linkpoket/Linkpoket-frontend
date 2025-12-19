import { useState, useRef, Suspense, lazy } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useFolderColorStore } from '@/stores/folderColorStore';
import { useMobile } from '@/hooks/useMobile';
import useUpdateFolderBookmark from '@/hooks/mutations/useUpdateFolderBookmark';
import { useQuery } from '@tanstack/react-query';
import fetchFolderDetails from '@/apis/folder-apis/fetchFolderDetails';
import { fetchPersonalPage } from '@/apis/page-apis/fetchPersonalPage';
import { FolderDetail } from '@/types/folders';
import { LinkDetail } from '@/types/links';
import { DropDownInlineSkeleton } from '../skeleton/DropdownInlineSkeleton';
import LinksInFolder from './LinksInFolder';
import FolderBackground from './FolderBackground';
import FolderPocket from './FolderPocket';
import FolderDeviderLine from './FolderDeviderLine';
import InactiveBookmarkIcon from '@/assets/common-ui-assets/InactiveBookmark.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/ActiveBookmark.svg?react';
import CardMenu from '@/assets/widget-ui-assets/CardMenu.svg?react';
import MemoButton from '../common-ui/MemoButton';
import MoreIcon from '@/assets/common-ui-assets/더보기.png';
import { useFolderMemo } from '@/hooks/useFolderMemo';

const DropDownInline = lazy(() => import('../common-ui/DropDownInline'));
const MemoModal = lazy(() => import('../modal/memo/MemoModal'));

export default function FolderCard({
  isBookmark,
  item,
}: {
  isBookmark: boolean;
  item: FolderDetail;
}) {
  const [isDropDownInline, setIsDropDownInline] = useState(false);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
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

  // 북마크 페이지인지 확인
  const isBookmarkPage = location.pathname.startsWith('/bookmarks');

  // 북마크 페이지인 경우 개인 페이지 정보 가져오기 (pageId 비교용)
  const { data: personalPageData } = useQuery({
    queryKey: ['personalPage'],
    queryFn: () => fetchPersonalPage(),
    select: (response) => response.data,
    enabled: isBookmarkPage, // 북마크 페이지에서만 조회
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });

  // 폴더 상세 정보를 가져와서 링크 정보 추출
  const actualPageId = item.pageId || pageId || '';

  const { data: folderDetailsData } = useQuery({
    queryKey: ['folderDetails', actualPageId, folderId, 'preview'],
    queryFn: () =>
      fetchFolderDetails({
        pageId: actualPageId,
        commandType: 'VIEW',
        folderId: folderId || '',
        sortType: 'BASIC',
      }),
    // pageId와 folderId가 있을 때만 fetch
    enabled: !!actualPageId && !!folderId,
    select: (response) => response.data,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });

  const linkData: LinkDetail[] = folderDetailsData?.linkDetailResponses || [];

  // 링크 데이터 사용 (상위 3개만)
  const displayLinks = linkData.slice(0, 3);

  const getFolderLink = (folderId: string) => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/shared/')) {
      const pathParts = currentPath.split('/');
      const sharedPageId = pathParts[2];
      return `/shared/${sharedPageId}/folder/${folderId}`;
    }
    if (currentPath.startsWith('/bookmarks')) {
      const personalPageId = personalPageData?.pageId;

      if (!item.pageId || item.pageId === personalPageId) {
        return `/personal/folder/${folderId}`;
      } else {
        return `/shared/${item.pageId}/folder/${folderId}`;
      }
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

  const handleInlineDropdownOpen = () => {
    setIsDropDownInline((v) => !v);
  };

  const handleMoreEnter = () => {
    if (!isMobile) setIsDropDownInline(true);
  };

  const handleMoreLeave = () => {
    if (!isMobile) setIsDropDownInline(false);
  };

  // 폴더 메모 기능
  const { memo, hasMemo, memoContent, handleMemoSave } = useFolderMemo({
    folderId,
    itemPageId: item.pageId,
  });

  const handleMemoSaveAndClose = (memoContent: string) => {
    handleMemoSave(memoContent, () => {
      setIsMemoModalOpen(false);
    });
  };

  return (
    <>
      <div
        // 바깥 컨테이너 투명 처리
        className={`group relative flex ${isMobile ? 'h-[170px]' : 'h-[242px]'} flex-col items-center gap-4 rounded-[16px] border border-transparent bg-transparent p-[16px] hover:cursor-pointer ${
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

        {/* 북마크/메모/더보기: 북마크와 동일한 세로줄(같은 right, 같은 간격) */}
        <div className="absolute top-2 right-2 z-20 flex flex-col items-center gap-2">
          <button
            data-card-button
            className="cursor-pointer"
            onClick={handleBookmarkClick}
            aria-label={isBookmark ? '북마크 제거' : '북마크 추가'}
          >
            {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
          </button>

          <MemoButton
            hasMemo={hasMemo}
            onClick={() => setIsMemoModalOpen(true)}
            className="static top-auto right-auto z-auto"
          />

          <div onMouseEnter={handleMoreEnter} onMouseLeave={handleMoreLeave}>
            <button
              ref={menuButtonRef}
              data-card-button
              className="flex cursor-pointer items-center justify-center p-1"
              onClick={(e) => {
                e.stopPropagation();
                if (isMobile) handleInlineDropdownOpen();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              style={{ touchAction: 'manipulation' }}
              aria-label="더보기"
            >
              <img
                src={MoreIcon}
                alt=""
                className="h-4 w-4 object-contain opacity-30 grayscale select-none"
                draggable={false}
              />
            </button>

            {/* 투명 브릿지: 버튼 → 드롭다운으로 이동할 때 닫힘 방지 */}
            {!isMobile && isDropDownInline && (
              <div className="absolute top-[60px] right-0 h-3 w-[80px]" />
            )}
          </div>
        </div>

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
            {/* 기존 하단 메뉴 버튼은 숨김 처리 (로직은 유지) */}
            <div className="relative hidden">
              <button
                ref={menuButtonRef}
                data-card-button
                className="cursor-pointer p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleInlineDropdownOpen();
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                }}
                style={{ touchAction: 'manipulation' }}
                aria-label="메뉴 열기"
              >
                <CardMenu />
              </button>
            </div>
          </div>

          {/* 드롭다운을 카드 외부로 이동 */}
          {isDropDownInline && (
            <div onMouseEnter={handleMoreEnter} onMouseLeave={handleMoreLeave}>
              <Suspense fallback={<DropDownInlineSkeleton />}>
                <DropDownInline
                  id={folderId}
                  type="folder"
                  initialTitle={item.folderName}
                  onMemoClick={() => setIsMemoModalOpen(true)}
                  className="!top-[84px] !right-3"
                  isDropDownInline={isDropDownInline}
                  setIsDropDownInline={setIsDropDownInline}
                />
              </Suspense>
            </div>
          )}
        </div>
      </div>

      {/* 메모 모달 */}
      {isMemoModalOpen && (
        <Suspense fallback={null}>
          <MemoModal
            isOpen={isMemoModalOpen}
            onClose={() => setIsMemoModalOpen(false)}
            initialMemo={memoContent}
            onSave={handleMemoSaveAndClose}
            title={item.folderName}
            memoData={memo || undefined}
          />
        </Suspense>
      )}
    </>
  );
}

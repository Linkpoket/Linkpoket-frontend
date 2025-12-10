import { useState, useRef, Suspense, lazy, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useFolderColorStore } from '@/stores/folderColorStore';
import { useMobile } from '@/hooks/useMobile';
import useUpdateFolderBookmark from '@/hooks/mutations/useUpdateFolderBookmark';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
import { useFetchMemo } from '@/hooks/queries/useFetchMemo';
import { useCreateMemo } from '@/hooks/mutations/useCreateMemo';
import { useDeleteMemo } from '@/hooks/mutations/useDeleteMemo';
import { ItemType } from '@/types/memos';

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
      // 북마크 폴더의 경우:
      // 1. item.pageId가 없으면 → 개인 페이지로 이동
      // 2. item.pageId가 있고, 개인 페이지 pageId와 같으면 → 개인 페이지로 이동
      // 3. item.pageId가 있고, 개인 페이지 pageId와 다르면 → 공유 페이지로 이동
      const personalPageId = personalPageData?.pageId;

      if (!item.pageId || item.pageId === personalPageId) {
        // item.pageId가 없거나 개인 페이지와 같으면 개인 페이지로
        return `/personal/folder/${folderId}`;
      } else {
        // item.pageId가 있고 개인 페이지와 다르면 공유 페이지로
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

  // 메모 조회에 사용할 pageId 결정
  // 북마크 페이지: item.pageId가 있으면 그것을 사용, 없으면 개인 페이지 pageId 사용
  // 일반 페이지: store의 pageId 사용
  const memoPageId = useMemo(() => {
    if (isBookmarkPage) {
      return item.pageId || personalPageData?.pageId || pageId || '';
    }
    return pageId || '';
  }, [isBookmarkPage, item.pageId, personalPageData?.pageId, pageId]);

  // Memo 조회
  const memoParams = useMemo(
    () =>
      memoPageId && folderId
        ? {
            pageId: memoPageId,
            commandType: 'VIEW' as const,
            itemType: 'FOLDER' as ItemType,
            itemId: folderId,
          }
        : null,
    [memoPageId, folderId]
  );

  const { data: memo } = useFetchMemo(memoParams);

  const queryClient = useQueryClient();

  // Memo 생성
  const { mutate: createMemo } = useCreateMemo({
    onSuccess: () => {
      console.log('폴더 메모 생성 성공');
      queryClient.invalidateQueries({
        queryKey: ['memo', 'FOLDER', folderId, memoPageId],
      });
      queryClient.invalidateQueries({
        queryKey: ['folderDetails'],
        exact: false,
      });
      setIsMemoModalOpen(false);
    },
    onError: (error) => {
      console.error('폴더 메모 생성 실패:', error);
    },
  });

  // Memo 삭제
  const { mutate: deleteMemo } = useDeleteMemo({
    onSuccess: () => {
      console.log('폴더 메모 삭제 성공');
      queryClient.invalidateQueries({
        queryKey: ['memo', 'FOLDER', folderId, memoPageId],
      });
      queryClient.invalidateQueries({
        queryKey: ['folderDetails'],
        exact: false,
      });
      setIsMemoModalOpen(false);
    },
    onError: (error) => {
      console.error('폴더 메모 삭제 실패:', error);
    },
  });

  const handleMemoSave = (memoContent: string) => {
    if (!memoPageId || !folderId) {
      console.error('pageId 또는 folderId가 없습니다.');
      return;
    }

    const trimmedMemo = memoContent.trim();

    // 메모가 비어있으면 삭제
    if (trimmedMemo === '') {
      if (memo?.memoId) {
        deleteMemo({
          baseRequest: {
            pageId: memoPageId,
            commandType: 'EDIT',
          },
          memoId: memo.memoId,
        });
      } else {
        // 메모가 없는데 삭제하려고 하면 모달만 닫기
        setIsMemoModalOpen(false);
      }
      return;
    }

    // 메모가 있으면
    if (memo?.memoId) {
      // 기존 메모가 있고 내용이 다르면 삭제 후 새로 생성 (수정처럼 동작)
      if (memo.content !== trimmedMemo) {
        deleteMemo(
          {
            baseRequest: {
              pageId: memoPageId,
              commandType: 'EDIT',
            },
            memoId: memo.memoId,
          },
          {
            onSuccess: () => {
              // 삭제 성공 후 새 메모 생성
              createMemo({
                baseRequest: {
                  pageId: memoPageId,
                  commandType: 'CREATE',
                },
                itemType: 'FOLDER',
                itemId: folderId,
                content: trimmedMemo,
              });
            },
          }
        );
      } else {
        // 내용이 같으면 그냥 모달 닫기
        setIsMemoModalOpen(false);
      }
    } else {
      // 기존 메모가 없으면 바로 생성
      createMemo({
        baseRequest: {
          pageId: memoPageId,
          commandType: 'CREATE',
        },
        itemType: 'FOLDER',
        itemId: folderId,
        content: trimmedMemo,
      });
    }
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

        {/* 북마크 버튼 - 우측 상단 */}
        <button
          data-card-button
          className="absolute top-2 right-2 z-10 cursor-pointer"
          onClick={handleBookmarkClick}
          aria-label={isBookmark ? '북마크 제거' : '북마크 추가'}
        >
          {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
        </button>

        {/* 메모 버튼 - 북마크 아래 */}
        <MemoButton
          hasMemo={!!memo?.content}
          onClick={() => setIsMemoModalOpen(true)}
        />

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

      {/* 메모 모달 */}
      {isMemoModalOpen && (
        <Suspense fallback={null}>
          <MemoModal
            isOpen={isMemoModalOpen}
            onClose={() => setIsMemoModalOpen(false)}
            initialMemo={memo?.content || ''}
            onSave={handleMemoSave}
            title={item.folderName}
          />
        </Suspense>
      )}
    </>
  );
}

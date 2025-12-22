import { useState, useRef, Suspense, lazy, useMemo, useEffect } from 'react';
import { LinkDetail } from '@/types/links';
import { usePageStore } from '@/stores/pageStore';
import { useMobile } from '@/hooks/useMobile';
import useUpdateLinkBookmark from '@/hooks/mutations/useUpdateLinkBookmark';
import { useFetchMemo } from '@/hooks/queries/useFetchMemo';
import { useCreateMemo } from '@/hooks/mutations/useCreateMemo';
import { useDeleteMemo } from '@/hooks/mutations/useDeleteMemo';
import DropDownInline from '../common-ui/DropDownInline';
import LinkLogo from '../common-ui/LinkLogo';
import { DropDownInlineSkeleton } from '../skeleton/DropdownInlineSkeleton';
import InactiveBookmarkIcon from '@/assets/common-ui-assets/InactiveBookmark.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/ActiveBookmark.svg?react';
import CardMenu from '@/assets/widget-ui-assets/CardMenu.svg?react';
import MoreIcon from '@/assets/common-ui-assets/More.png';

const MemoModal = lazy(() => import('../modal/memo/MemoModal'));

export default function LinkCard({
  isBookmark,
  item,
}: {
  isBookmark: boolean;
  item: LinkDetail;
}) {
  const [isDropDownInline, setIsDropDownInline] = useState<boolean>(false);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState<boolean>(false);
  const { pageId } = usePageStore();
  // const { isFocusMode } = useFocusModeStore();
  const isMobile = useMobile();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memo 조회
  const memoParams = useMemo(
    () =>
      pageId
        ? {
            pageId,
            commandType: 'VIEW' as const,
            itemType: 'LINK' as const,
            itemId: item.linkId,
          }
        : null,
    [pageId, item.linkId]
  );

  const { data: memo } = useFetchMemo(memoParams);

  // 컴포넌트 언마운트 시 타임아웃 정리
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    // 드롭다운이나 버튼 영역인지 확인
    const target = e.target as HTMLElement;
    const isDropdownArea = target.closest('[data-dropdown]');
    const isButtonArea = target.closest('[data-card-button]');
    const isModalArea = target.closest('[data-ignore-outside-click]');

    if (isDropdownArea || isButtonArea || isModalArea) return;

    // 카드 클릭 시 링크 열기
    window.open(item.linkUrl, '_blank');
  };

  const { mutate: updateLinkBookmark } = useUpdateLinkBookmark({
    linkId: item.linkId,
    pageId: pageId as string,
  });

  const handleBookmarkClick = () => {
    updateLinkBookmark(item.linkId);
  };

  const handleInlineDropdownOpen = () => {
    setIsDropDownInline((v) => !v);
  };

  const handleMoreEnter = () => {
    if (!isMobile) {
      // 기존 타임아웃 클리어
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      setIsDropDownInline(true);
    }
  };

  const handleMoreLeave = () => {
    if (!isMobile) {
      // 약간의 지연을 주어 드롭다운으로 마우스 이동 시간 확보
      closeTimeoutRef.current = setTimeout(() => {
        setIsDropDownInline(false);
        closeTimeoutRef.current = null;
      }, 200);
    }
  };

  // Memo 생성
  const { mutate: createMemo } = useCreateMemo({
    onSuccess: () => {
      console.log('메모 생성 성공');
      setIsMemoModalOpen(false);
    },
    onError: (error) => {
      console.error('메모 생성 실패:', error);
    },
  });

  // Memo 삭제
  const { mutate: deleteMemo } = useDeleteMemo({
    onSuccess: () => {
      console.log('메모 삭제 성공');
      setIsMemoModalOpen(false);
    },
    onError: (error) => {
      console.error('메모 삭제 실패:', error);
    },
  });

  const handleMemoSave = (memoContent: string) => {
    if (!pageId) {
      console.error('pageId가 없습니다.');
      return;
    }

    const trimmedMemo = memoContent.trim();

    // 메모가 비어있으면 삭제
    if (trimmedMemo === '') {
      if (memo?.memoId) {
        deleteMemo({
          baseRequest: {
            pageId,
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
              pageId,
              commandType: 'EDIT',
            },
            memoId: memo.memoId,
          },
          {
            onSuccess: () => {
              // 삭제 성공 후 새 메모 생성
              createMemo({
                baseRequest: {
                  pageId,
                  commandType: 'CREATE',
                },
                itemType: 'LINK',
                itemId: item.linkId,
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
      // 기존 메모가 없으면 새로 생성
      createMemo({
        baseRequest: {
          pageId,
          commandType: 'CREATE',
        },
        itemType: 'LINK',
        itemId: item.linkId,
        content: trimmedMemo,
      });
    }
  };

  const imageUrl = (() => {
    const url = item.representImageUrl;

    if (
      url &&
      (url.toLowerCase().includes('.png') ||
        url.toLowerCase().includes('.jpg') ||
        url.toLowerCase().includes('.jpeg'))
    ) {
      return item.representImageUrl;
    }

    if (item.faviconUrl) {
      return item.faviconUrl;
    }

    return null; // 이미지가 없으면 null 반환
  })();

  const isFaviconOnly = !item.representImageUrl && item.faviconUrl;

  // LinkLogo를 표시할지 결정
  const showLinkLogo = !imageUrl; // 이미지가 없으면 LinkLogo 표시

  // favicon인지 확인 (LinkLogo가 아닌 경우)
  const isSmallIcon =
    !showLinkLogo &&
    (isFaviconOnly || imageUrl?.includes('favicon') || !item.representImageUrl); // representImageUrl이 없으면 작은 아이콘으로 처리

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // 이미지를 숨기고 LinkLogo가 표시되도록 함
    e.currentTarget.style.display = 'none';
    const parent = e.currentTarget.parentElement;
    if (parent && !parent.querySelector('.link-logo-fallback')) {
      const containerSize = isMobile ? 96 : 120;

      const linkLogo = document.createElement('div');
      linkLogo.className = 'link-logo-fallback';
      linkLogo.innerHTML = `
        <div class="link-logo-fallback-container flex items-center justify-center text-center font-bold select-none relative overflow-hidden" 
             style="width: ${containerSize}px; height: ${containerSize}px; background-color: #f8f8f8; font-size: ${Math.floor(containerSize * 0.45)}px; border-radius: 16px; cursor: pointer;">
          <span class="hover-text" 
                style="font-weight: 800; color: #000000; transition: transform 0.2s ease; position: relative;">${item.linkName?.charAt(0)?.toUpperCase() || '?'}</span>
        </div>
      `;
      parent.appendChild(linkLogo);
    }
  };

  // 그리드 뷰 렌더링
  return (
    <>
      <div
        className={`group relative flex transition-all duration-300 hover:translate-y-[-4px] ${isMobile ? 'h-[170px]' : 'h-[242px]'} flex-col items-center gap-4 overflow-visible p-[16px] hover:cursor-pointer ${
          // isFocusMode
          // ? 'w-[125px]'
          isMobile ? 'min-w-[125px]' : 'min-w-[156px]'
        }`}
        onClick={handleCardClick}
      >
        <div
          className="relative mx-auto flex items-center justify-center overflow-hidden rounded-2xl"
          style={{
            width: isMobile ? '96px' : '120px',
            height: isMobile ? '96px' : '120px',
            minWidth: isMobile ? '96px' : '120px',
            minHeight: isMobile ? '96px' : '120px',
            maxWidth: isMobile ? '96px' : '120px',
            maxHeight: isMobile ? '96px' : '120px',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          {showLinkLogo ? (
            <LinkLogo
              title={item.linkName || '?'}
              size={isMobile ? 96 : 120}
              className="transition-transform duration-300 ease-in-out group-hover:scale-50"
            />
          ) : (
            <img
              loading="lazy"
              src={imageUrl}
              alt={item.linkName || '링크 이미지'}
              onError={handleImageError}
              className={
                isSmallIcon
                  ? 'object-cover transition-transform duration-300 ease-in-out group-hover:scale-110'
                  : 'h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110'
              }
              style={
                isSmallIcon
                  ? {
                      aspectRatio: '1/1',
                      width: isMobile ? '70px' : '87px',
                      height: isMobile ? '70px' : '87px',
                      objectFit: 'cover',
                    }
                  : undefined
              }
            />
          )}
        </div>

        {/* 북마크/더보기: 북마크와 동일한 세로줄(같은 right, 같은 간격) */}
        <div className="absolute top-2 right-2 z-20 flex flex-col items-center gap-2">
          <button
            data-card-button
            className="cursor-pointer"
            onClick={handleBookmarkClick}
            aria-label={isBookmark ? '북마크 제거' : '북마크 추가'}
          >
            {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
          </button>

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
              <div className="absolute top-[28px] right-0 h-8 w-[180px]" />
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-between text-center">
          <div className="flex flex-col gap-1">
            <div>
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
                {item.linkName}
              </p>
            </div>
            {!isMobile && (
              <p className="text-[13px] font-[400] text-gray-50">
                {item.createdDate} · {item.providerName}
              </p>
            )}
          </div>

          <div className="mt-2 flex items-center justify-center gap-4">
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
                  id={item.linkId}
                  type="link"
                  initialTitle={item.linkName}
                  initialLink={item.linkUrl}
                  memoData={memo || undefined}
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
            initialMemo={memo?.content || ''}
            onSave={handleMemoSave}
            title={item.linkName}
            memoData={memo || undefined}
          />
        </Suspense>
      )}
    </>
  );
}

import InactiveBookmarkIcon from '@/assets/common-ui-assets/InactiveBookmark.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/ActiveBookmark.svg?react';
import CardMenu from '@/assets/widget-ui-assets/CardMenu.svg?react';
import { LinkDetail } from '@/types/links';
import useUpdateLinkBookmark from '@/hooks/mutations/useUpdateLinkBookmark';
import { usePageStore } from '@/stores/pageStore';
import { useState, useRef, Suspense } from 'react';
import DropDownInline from '../common-ui/DropDownInline';
// import { useFocusModeStore } from '@/stores/focusModeStore';
import { useMobile } from '@/hooks/useMobile';
import LinkLogo from '../common-ui/LinkLogo';
import { DropDownInlineSkeleton } from '../skeleton/DropdownInlineSkeleton';

export default function LinkCard({
  isBookmark,
  item,
}: {
  isBookmark: boolean;
  item: LinkDetail;
}) {
  const [isDropDownInline, setIsDropDownInline] = useState<boolean>(false);
  const { pageId } = usePageStore();
  // const { isFocusMode } = useFocusModeStore();
  const isMobile = useMobile();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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

  // 이미지 로드 에러 처리 - LinkLogo로 대체
  // SwiftUI 색상 팔레트
  const swiftUIColorPalette = [
    '#FF3B30',
    '#FF9500',
    '#FFCC00',
    '#34C759',
    '#007AFF',
    '#5856D6',
    '#AF52DE',
    '#00C7BE',
    '#5AC8FA',
    '#FF2D92',
    '#32D74B',
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7',
    '#DDA0DD',
    '#98D8C8',
  ];

  const getColorByLetter = (text: string): string => {
    const char = text.charAt(0);
    const index = char.charCodeAt(0) % swiftUIColorPalette.length;
    return swiftUIColorPalette[index];
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // 이미지를 숨기고 LinkLogo가 표시되도록 함
    e.currentTarget.style.display = 'none';
    const parent = e.currentTarget.parentElement;
    if (parent && !parent.querySelector('.link-logo-fallback')) {
      const containerSize = isMobile ? 96 : 120;
      const textColor = getColorByLetter(item.linkName || '');

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
        className={`group relative flex ${isMobile ? 'h-[170px]' : 'h-[242px]'} flex-col items-center gap-4 overflow-visible p-[16px] hover:cursor-pointer ${
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

        {/* 북마크 버튼 - 우측 상단 */}
        <button
          data-card-button
          className="absolute top-2 right-2 z-10 cursor-pointer"
          onClick={handleBookmarkClick}
          aria-label={isBookmark ? '북마크 제거' : '북마크 추가'}
        >
          {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
        </button>

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
                id={item.linkId}
                type="link"
                initialTitle={item.linkName}
                initialLink={item.linkUrl}
                onLinkChange={(id, link) => {
                  console.log(id, link);
                }}
                isDropDownInline={isDropDownInline}
                setIsDropDownInline={setIsDropDownInline}
              />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
}

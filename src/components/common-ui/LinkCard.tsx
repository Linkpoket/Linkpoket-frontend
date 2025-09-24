import { Suspense, lazy, useState } from 'react';
import InactiveBookmarkIcon from '@/assets/common-ui-assets/InactiveBookmark.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/ActiveBookmark.svg?react';
import CardMenu from '@/assets/widget-ui-assets/CardMenu.svg?react';
import { LinkDetail } from '@/types/links';
import useUpdateLinkBookmark from '@/hooks/mutations/useUpdateLinkBookmark';
import { usePageStore } from '@/stores/pageStore';
import defaultImage from '@assets/common-ui-assets/defaultImage.png';
import { DropDownInlineSkeleton } from '../skeleton/DropdownInlineSkeleton';

const DropDownInline = lazy(() => import('./DropDownInline'));

export default function LinkCard({
  isBookmark,
  item,
}: {
  isBookmark: boolean;
  item: LinkDetail;
}) {
  const [isDropDownInline, setIsDropDownInline] = useState<boolean>(false);
  const { pageId } = usePageStore();

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

  const handleMenuClick = () => {
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

    return defaultImage;
  })();

  const isFaviconOnly = !item.representImageUrl && item.faviconUrl;

  return (
    <>
      <div
        className="bg-gray-0 border-gray-10 group relative flex h-[242px] min-w-[156px] flex-col gap-4 rounded-[16px] border p-[16px] hover:cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="bg-gray-10 flex h-[96px] w-full items-center justify-center overflow-hidden rounded-lg">
          <img
            loading="lazy"
            src={imageUrl}
            alt={item.linkName || '링크 이미지'}
            onError={(e) => {
              e.currentTarget.src = defaultImage;
            }}
            className={
              isFaviconOnly
                ? 'h-10 transition-transform duration-300 ease-in-out group-hover:scale-110'
                : 'h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110'
            }
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col gap-1">
            <div>
              <p className="text-[15px] font-bold">{item.linkName}</p>
            </div>
            <p className="text-[13px] font-[400] text-gray-50">
              {item.createdDate} · {item.providerName}
            </p>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <button
              data-card-button
              className="cursor-pointer"
              onClick={handleBookmarkClick}
              aria-label={isBookmark ? '북마크 제거' : '북마크 추가'}
            >
              {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
            </button>

            <div className="relative hidden md:block">
              <button
                data-card-button
                className="cursor-pointer p-1"
                onClick={handleMenuClick}
                aria-label="메뉴 열기"
              >
                <CardMenu />
              </button>

              {isDropDownInline && (
                <Suspense fallback={<DropDownInlineSkeleton />}>
                  <DropDownInline
                    id={item.linkId}
                    type="link"
                    initialTitle={item.linkName}
                    initialLink={item.linkUrl}
                    isDropDownInline={isDropDownInline}
                    setIsDropDownInline={setIsDropDownInline}
                  />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

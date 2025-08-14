import InactiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkInactive.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkActive.svg?react';
import CardMenu from '@/assets/widget-ui-assets/CardMenu.svg?react';
import { LinkDetail } from '@/types/links';
import useUpdateLinkBookmark from '@/hooks/mutations/useUpdateLinkBookmark';
import { usePageStore } from '@/stores/pageStore';
import { useState } from 'react';
import DropDownInline from './DropDownInline';
import defaultImage from '@assets/common-ui-assets/defaultImage.png';

export default function LinkCard({
  isBookmark,
  item,
}: {
  isBookmark: boolean;
  item: LinkDetail;
}) {
  const [isDropDownInline, setIsDropDownInline] = useState<boolean>(false);
  const { pageId } = usePageStore();

  const handleDoubleClick = () => {
    window.open(item.linkUrl, '_blank');
  };

  const { mutate: updateLinkBookmark } = useUpdateLinkBookmark({
    linkId: item.linkId,
    pageId: pageId as string,
  });

  const handleBookmarkClick = () => {
    updateLinkBookmark(item.linkId);
  };

  const imageUrl = (() => {
    const url = item.representImageUrl;

    // URL에서 쿼리 파라미터 제거 후 확장자 체크
    if (url) {
      const urlWithoutQuery = url.split('?')[0].toLowerCase();
      if (
        urlWithoutQuery.endsWith('.png') ||
        urlWithoutQuery.endsWith('.jpg') ||
        urlWithoutQuery.endsWith('.jpeg')
      ) {
        return item.representImageUrl;
      }
    }

    if (item.faviconUrl) {
      return item.faviconUrl;
    }

    return defaultImage;
  })();

  const isFaviconOnly = !item.representImageUrl && item.faviconUrl;

  console.log('링크 카드 아이템:', item);

  return (
    <div>
      <div
        className="border-gray-10 flex h-[242px] min-w-[156px] flex-col gap-4 rounded-[16px] border p-[16px]"
        onDoubleClick={handleDoubleClick}
      >
        <div className="bg-gray-10 flex h-[96px] w-full items-center justify-center overflow-hidden rounded-lg">
          <img
            loading="lazy"
            src={imageUrl}
            alt={item.linkName || '링크 이미지'}
            onError={(e) => {
              e.currentTarget.src = defaultImage;
            }}
            className={isFaviconOnly ? 'h-10' : 'h-full w-full object-cover'}
          />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col gap-1">
            <div>
              <p className="text-[15px] font-bold">{item.linkName}</p>
            </div>
            <p className="text-[13px] font-[400] text-gray-50">
              {item.createdDate} · 링크
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <button className="cursor-pointer" onClick={handleBookmarkClick}>
              {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
            </button>
            <button
              className="cursor-pointer p-1"
              onClick={() => setIsDropDownInline(true)}
            >
              <CardMenu />
            </button>
          </div>
        </div>
      </div>
      {isDropDownInline && (
        <DropDownInline
          id={item.linkId}
          type="link"
          initialTitle={item.linkName}
          initialLink={item.linkUrl}
          isDropDownInline={isDropDownInline}
          setIsDropDownInline={setIsDropDownInline}
        />
      )}
    </div>
  );
}

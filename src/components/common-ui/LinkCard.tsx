import InactiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkInactive.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkActive.svg?react';
import CardMenu from '@/assets/widget-ui-assets/CardMenu.svg?react';
import { LinkDetail } from '@/types/links';
import useUpdateLinkBookmark from '@/hooks/mutations/useUpdateLinkBookmark';
import { usePageStore } from '@/stores/pageStore';
import { useState } from 'react';
import DropDownInline from './DropDownInline';

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
  console.log(item);

  return (
    <div>
      <div
        className="border-gray-10 flex h-[242px] min-w-[156px] flex-col gap-4 rounded-[16px] border p-[16px]"
        onDoubleClick={handleDoubleClick}
      >
        <div className="bg-gray-40 flex h-[96px] w-full items-center justify-center overflow-hidden rounded-lg">
          <img
            loading="lazy"
            src={item.representImageUrl || item.faviconUrl}
            alt={item.linkName || '링크 이미지'}
            className={`${item.representImageUrl && `h-full w-full object-cover`} h-10`}
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

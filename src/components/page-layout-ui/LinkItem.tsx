import LinkItemIcon from '@/assets/common-ui-assets/LinkItemIcon.svg?react';
import ListBookmarkModal from './ListBookmarkOption';
import InactiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkInactive.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkActive.svg?react';
import { PageItemProps } from '@/types/pageItems';
import DropDownInline from '../common-ui/DropDownInline';
import { useModalStore } from '@/stores/modalStore';
import { usePageStore } from '@/stores/pageStore';
import useUpdateLinkBookmark from '@/hooks/mutations/useUpdateLinkBookmark';

export default function LinkItem({ item, view, isBookmark }: PageItemProps) {
  const isGrid = view === 'grid';
  const type = 'link';
  const { pageId } = usePageStore();

  const handleDoubleClick = () => {
    if ('linkUrl' in item) {
      window.open(item.linkUrl, '_blank');
    }
  };

  const { isLinkContextMenuOpen, openLinkContextMenu, closeLinkContextMenu } =
    useModalStore();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openLinkContextMenu(item.id);
  };

  const { mutate: updateLinkBookmark } = useUpdateLinkBookmark({
    linkId: item.id,
    pageId,
  });

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateLinkBookmark(item.id);
    console.log('북마크 업데이트', item.id);
  };

  return isGrid ? (
    <div
      className="bg-gray-0 hover:bg-gray-5 active:bg-gray-5 relative inline-flex w-full cursor-pointer flex-col items-center gap-2 rounded-[10px] p-[12px]"
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
    >
      <div className="flex h-[95px] w-[95px] items-center justify-center rounded-xl">
        {item.linkUrl ? (
          <img
            className="rounded-md"
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${item.linkUrl}`}
            alt="favicon"
            width={42}
            height={38}
          />
        ) : (
          <LinkItemIcon />
        )}
      </div>

      <button
        className="absolute top-4 right-4 cursor-pointer bg-transparent"
        onClick={handleBookmark}
      >
        {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
      </button>
      <span className="text-gray-90 text-center text-[14px] font-[400]">
        {item.title}
      </span>
      {isLinkContextMenuOpen === item.id && (
        <DropDownInline
          id={item.id}
          type={type}
          initialTitle={item.title}
          initialLink={item.linkUrl}
          isDropDownInline={isLinkContextMenuOpen === item.id}
          setIsDropDownInline={closeLinkContextMenu}
          className="absolute top-32 left-2"
        />
      )}
    </div>
  ) : (
    <div
      className="border-gray-30 hover:bg-gray-5 active:bg-gray-5 flex w-full items-center justify-between border-b px-[12px] py-[16px] last:border-b-0"
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex items-center gap-[20px]">
        {item.linkUrl ? (
          <img
            className="block rounded-md"
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${item.linkUrl}`}
            alt="favicon"
            width={42}
            height={38}
          />
        ) : (
          <LinkItemIcon width={42} height={38} />
        )}
        <span className="text-gray-90 text-[14px] font-[400]">
          {item.title}
        </span>
      </div>
      <div>
        <ListBookmarkModal
          isBookmark={isBookmark}
          itemId={item.id}
          initialTitle={item.title}
          initialLink={item.linkUrl}
          item={item}
          type={type}
          handleBookmark={handleBookmark}
        />
      </div>
    </div>
  );
}

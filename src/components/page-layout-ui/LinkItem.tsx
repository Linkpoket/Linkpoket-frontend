import LinkItemIcon from '@/assets/common-ui-assets/LinkItemIcon.svg?react';
import ListBookmarkModal from './ListBookmarkOption';
import InactiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkInactive.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkActive.svg?react';
import { PageItemProps } from '@/types/pageItems';
import { useState } from 'react';
import DropDownInline from '../common-ui/DropDownInline';
import { useModalStore } from '@/stores/modalStore';

export default function LinkItem({
  item,
  view,
  isBookmark,
  setIsBookmark,
}: PageItemProps) {
  const isGrid = view === 'grid';
  const type = 'link';

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
    openLinkContextMenu();
  };

  return isGrid ? (
    <div
      className="bg-gray-0 hover:bg-gray-5 active:bg-gray-5 relative inline-flex w-full cursor-pointer flex-col items-center gap-2 rounded-[10px] p-[12px]"
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
    >
      <LinkItemIcon />
      <button
        className="absolute top-4 right-4 cursor-pointer bg-transparent"
        onClick={(e) => {
          e.stopPropagation();
          setIsBookmark((prev) => !prev);
        }}
      >
        {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
      </button>
      <span className="text-gray-90 text-center text-[14px] font-[400]">
        {item.title}
      </span>
      {isLinkContextMenuOpen && (
        <DropDownInline
          id={item.id}
          type={type}
          initialTitle={item.title}
          initialLink={item.linkUrl}
          isDropDownInline={isLinkContextMenuOpen}
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
        <LinkItemIcon width={42} height={38} />
        <span className="text-gray-90 text-[14px] font-[400]">
          {item.title}
        </span>
      </div>
      <div>
        <ListBookmarkModal
          isBookmark={isBookmark}
          setIsBookmark={setIsBookmark}
          itemId={item.id}
          initialTitle={item.title}
          initialLink={item.linkUrl}
          type={type}
        />
      </div>
    </div>
  );
}

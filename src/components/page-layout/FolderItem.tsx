import FolderItemIcon from '@/assets/common-ui-assets/FolderItemIcon.svg?react';
import ListBookmarkModal from './ListBookmarkOption';
import InactiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkInactive.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkActive.svg?react';
import { PageItemProps } from '@/types/pageItems';

export default function FolderItem({
  item,
  view,
  isBookmark,
  setIsBookmark,
}: PageItemProps) {
  const isGrid = view === 'grid';

  return isGrid ? (
    <div className="bg-gray-0 hover:bg-gray-5 active:bg-gray-5 relative inline-flex flex-col items-center gap-2 rounded-[8px] p-[12px]">
      <FolderItemIcon />
      <button
        className="absolute top-10 right-5 cursor-pointer bg-transparent"
        onClick={() => setIsBookmark((prev) => !prev)}
      >
        {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
      </button>
      <span className="text-gray-90 text-center text-[15px] font-[400]">
        {item.title}
      </span>
    </div>
  ) : (
    <div className="border-gray-30 border-b-gray-30 active:bg-gray-5 hover:bg-gray-5 flex w-full items-center justify-between border-b py-[16px] pl-[8px] last:border-b-0">
      <div className="flex items-center gap-[20px]">
        <FolderItemIcon width={42} height={38} />
        <span className="text-gray-90 text-[16px] font-[400]">
          {item.title}
        </span>
      </div>
      <div>
        <ListBookmarkModal
          isBookmark={isBookmark}
          setIsBookmark={setIsBookmark}
        />
      </div>
    </div>
  );
}

// 해당 컴포넌트와 ListBookmarkOption 컴포넌트에 mutation 필요

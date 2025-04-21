import FolderItemIcon from '@/assets/common-ui-assets/FolderItemIcon.svg?react';
import ListBookmarkModal from './ListBookmarkOption';
import { PageItemProps } from '@/types/pageItems';

export default function FolderItem({ item, view }: PageItemProps) {
  const isGrid = view === 'grid';

  return isGrid ? (
    <div className="bg-gray-5 inline-flex flex-col items-center gap-2 rounded-[8px] p-[12px]">
      <FolderItemIcon />
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
        <ListBookmarkModal />
      </div>
    </div>
  );
}

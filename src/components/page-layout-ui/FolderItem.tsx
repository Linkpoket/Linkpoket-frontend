import FolderItemIcon from '@/assets/common-ui-assets/FolderItemIcon.svg?react';
import ListBookmarkModal from './ListBookmarkOption';
import InactiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkInactive.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkActive.svg?react';
import { PageItemProps } from '@/types/pageItems';
import { useNavigate } from 'react-router-dom';
import DropDownInline from '../common-ui/DropDownInline';
import { useModalStore } from '@/stores/modalStore';
import useUpdateFolderBookmark from '@/hooks/mutations/useUpdateFolderBookmark';

export default function FolderItem({ item, view, isBookmark }: PageItemProps) {
  const isGrid = view === 'grid';
  const type = 'folder';
  const navigate = useNavigate();

  const {
    isFolderContextMenuOpen,
    openFolderContextMenu,
    closeFolderContextMenu,
  } = useModalStore();

  const { mutate: updateFolderBookmark } = useUpdateFolderBookmark({
    folderId: item.id,
  });

  const handleDoubleClick = () => {
    navigate(`folder/${item.id}`);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openFolderContextMenu(item.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateFolderBookmark(item.id);
    console.log('북마크 업데이트', item.id);
  };

  return isGrid ? (
    <div
      className="folder-item bg-gray-0 hover:bg-gray-5 active:bg-gray-5 relative inline-flex w-full cursor-pointer flex-col items-center gap-2 rounded-[8px] p-[12px]"
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
    >
      <FolderItemIcon />
      <button
        className="absolute top-10 right-5 cursor-pointer bg-transparent"
        onClick={handleBookmark}
      >
        {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
      </button>
      <span className="text-gray-90 text-center text-[14px] font-[400]">
        {item.title}
      </span>
      {isFolderContextMenuOpen === item.id && (
        <DropDownInline
          id={item.id}
          type={type}
          initialTitle={item.title}
          isDropDownInline={isFolderContextMenuOpen === item.id}
          setIsDropDownInline={closeFolderContextMenu}
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
        <FolderItemIcon width={42} height={38} />
        <span className="text-gray-90 text-[14px] font-[400]">
          {item.title}
        </span>
      </div>
      <div>
        <ListBookmarkModal
          isBookmark={isBookmark}
          itemId={item.id}
          initialTitle={item.title}
          item={item}
          type={type}
        />
      </div>
    </div>
  );
}

// 해당 컴포넌트와 ListBookmarkOption 컴포넌트에 mutation 필요

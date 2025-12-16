import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import LinkCard from '../link-card/LinkCard';
import FolderCard from '../folder-card/FolderCard';
import FileCard from '../file-card/FileCard';

interface SortablePageItemProps {
  item: any;
}

export const SortablePageItem = ({ item }: SortablePageItemProps) => {
  const itemId =
    'folderId' in item
      ? item.folderId
      : 'fileId' in item
        ? item.fileId
        : item.linkId;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: itemId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    touchAction: 'none' as const,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style as React.CSSProperties}
      {...attributes}
      {...listeners}
      className="touch-none"
    >
      {'folderId' in item ? (
        <FolderCard isBookmark={item.isFavorite} item={item} />
      ) : 'fileId' in item ? (
        <FileCard item={item} />
      ) : (
        <LinkCard isBookmark={item.isFavorite} item={item} />
      )}
    </div>
  );
};

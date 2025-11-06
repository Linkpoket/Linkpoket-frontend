import { useState, useCallback } from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { FolderDetail } from '@/types/folders';
import { LinkDetail } from '@/types/links';
import { toast } from 'react-hot-toast';

interface UsePageDragAndDropParams {
  pageData: (FolderDetail | LinkDetail)[];
  searchKeyword: string;
  pageId: string;
  parentsFolderId: string;
  onMutation: (params: {
    baseRequest: { pageId: string; commandType: 'EDIT' };
    targetId: string;
    itemType: string;
    newOrderIndex: number;
    toFolderId: string;
    fromFolderId: string;
  }) => Promise<unknown>;
  onDataChange?: (data: (FolderDetail | LinkDetail)[]) => void;
}

export const usePageDragAndDrop = ({
  pageData,
  searchKeyword,
  pageId,
  parentsFolderId,
  onMutation,
  onDataChange,
}: UsePageDragAndDropParams) => {
  const [activeId, setActiveId] = useState<string | number | null>(null);

  const onDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  const onDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over) return;
      if (active.id === over.id) return;

      // 검색 중일 때는 드래그 비활성화
      if (searchKeyword) return;

      const oldIndex = pageData.findIndex(
        (item) =>
          ('folderId' in item ? item.folderId : item.linkId) === active.id
      );
      const newIndex = pageData.findIndex(
        (item) => ('folderId' in item ? item.folderId : item.linkId) === over.id
      );

      const movedItem = pageData[oldIndex];
      const targetId =
        'folderId' in movedItem ? movedItem.folderId : movedItem.linkId;
      const itemType = 'folderId' in movedItem ? 'FOLDER' : 'LINK';

      const newData = arrayMove(pageData, oldIndex, newIndex);
      onDataChange?.(newData);

      try {
        await onMutation({
          baseRequest: { pageId, commandType: 'EDIT' },
          targetId,
          itemType,
          newOrderIndex: newIndex + 1,
          toFolderId: parentsFolderId,
          fromFolderId: parentsFolderId,
        });
      } catch (error) {
        console.error('드래그 앤 드롭 업데이트 실패:', error);
        toast.error('순서 변경에 실패했습니다.');
        onDataChange?.(pageData);
      }
    },
    [pageData, searchKeyword, pageId, parentsFolderId, onMutation, onDataChange]
  );

  const getActiveItem = useCallback(() => {
    if (!activeId) return null;
    return pageData.find(
      (item) => ('folderId' in item ? item.folderId : item.linkId) === activeId
    );
  }, [activeId, pageData]);

  return {
    activeId,
    onDragStart,
    onDragEnd,
    getActiveItem,
  };
};

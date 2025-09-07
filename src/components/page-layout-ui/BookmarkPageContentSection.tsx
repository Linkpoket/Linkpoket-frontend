import { useEffect, useState } from 'react';
import { PageContentSectionProps } from '@/types/pages';
import LinkCard from '../common-ui/LinkCard';
import FolderCard from '../common-ui/FolderCard';
import { useSearchStore } from '@/stores/searchStore';
import { FolderDetail } from '@/types/folders';
import { LinkDetail } from '@/types/links';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSwappingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useUpdateDragandDrop from '@/hooks/mutations/useUpdateDragandDrop';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';

function SortableItem({ item }: { item: any; index: number }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: 'folderId' in item ? item.folderId : item.linkId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    touchAction: 'none',
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
      ) : (
        <LinkCard isBookmark={item.isFavorite} item={item} />
      )}
    </div>
  );
}

export default function BookmarkPageContentSection({
  folderData = [],
  linkData = [],
  sortType,
}: PageContentSectionProps) {
  const searchKeyword = useSearchStore((state) => state.searchKeyword);
  const searchResult = useSearchStore((state) => state.searchResult);

  const [pageData, setPageData] = useState<(FolderDetail | LinkDetail)[]>([]);
  const [activeId, setActiveId] = useState<string | number | null>(null);

  const { pageId } = usePageStore();
  const { parentsFolderId } = useParentsFolderIdStore();

  const updateDragAndDropMutation = useUpdateDragandDrop({
    baseRequest: {
      pageId: pageId,
      commandType: 'EDIT',
    },
    targetId: '',
    itemType: '',
    newOrderIndex: 1,
    toFolderId: '',
    fromFolderId: '',
  });

  const sortData = (data: (FolderDetail | LinkDetail)[], sortType: string) => {
    if (!data || data.length === 0) return [];

    const sortedData = [...data];

    switch (sortType) {
      case '최신순':
        return sortedData.sort((a, b) => {
          if (a.orderIndex !== undefined && b.orderIndex !== undefined) {
            return (b.orderIndex || 0) - (a.orderIndex || 0);
          }
          const dateA = new Date(a.createdDate || '').getTime();
          const dateB = new Date(b.createdDate || '').getTime();
          return dateB - dateA;
        });

      case '이름순':
        return sortedData.sort((a, b) => {
          const nameA = ('folderId' in a ? a.folderName : a.linkName) || '';
          const nameB = ('folderId' in b ? b.folderName : b.linkName) || '';
          return nameA.localeCompare(nameB);
        });

      case '기본순':
      default:
        return sortedData.sort((a, b) => {
          if (a.orderIndex !== undefined && b.orderIndex !== undefined) {
            return (a.orderIndex || 0) - (b.orderIndex || 0);
          }
          const dateA = new Date(a.createdDate || '').getTime();
          const dateB = new Date(b.createdDate || '').getTime();
          return dateA - dateB;
        });
    }
  };

  useEffect(() => {
    if (searchKeyword && searchResult) {
      // 검색 모드
      const searchFolders = searchResult.directorySimpleResponses || [];
      const searchLinks = searchResult.siteSimpleResponses || [];
      const combinedSearchData = [...searchFolders, ...searchLinks];
      const sortedData = sortData(combinedSearchData, sortType);
      setPageData(sortedData);
    } else {
      // 일반 모드
      const combinedData = [...folderData, ...linkData];
      const sortedData = sortData(combinedData, sortType);
      setPageData(sortedData);
    }
  }, [folderData, linkData, sortType, searchKeyword, searchResult]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 5,
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;
    if (active.id === over.id) return;

    // 검색 중일 때는 드래그 비활성화
    if (searchKeyword) return;

    const oldIndex = pageData.findIndex(
      (item) => ('folderId' in item ? item.folderId : item.linkId) === active.id
    );
    const newIndex = pageData.findIndex(
      (item) => ('folderId' in item ? item.folderId : item.linkId) === over.id
    );

    const movedItem = pageData[oldIndex];
    const targetId =
      'folderId' in movedItem ? movedItem.folderId : movedItem.linkId;
    const itemType = 'folderId' in movedItem ? 'FOLDER' : 'LINK';

    const newData = arrayMove(pageData, oldIndex, newIndex);
    setPageData(newData);

    try {
      await updateDragAndDropMutation.mutateAsync({
        baseRequest: { pageId, commandType: 'EDIT' },
        targetId,
        itemType,
        newOrderIndex: newIndex + 1,
        toFolderId: parentsFolderId ?? '',
        fromFolderId: parentsFolderId ?? '',
      });
    } catch (error) {
      console.error('드래그 앤 드롭 업데이트 실패:', error);
      setPageData(pageData);
    }
  };

  const getActiveItem = () => {
    if (!activeId) return null;
    return pageData.find(
      (item) => ('folderId' in item ? item.folderId : item.linkId) === activeId
    );
  };

  return (
    <div className="h-screen w-full overflow-y-auto">
      {searchKeyword && (
        <div className="text-gray-60 mb-4 text-sm">
          "{searchKeyword}" 검색 결과 {pageData.length}개
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={pageData.map((item) =>
            'folderId' in item ? item.folderId : item.linkId
          )}
          strategy={rectSwappingStrategy}
        >
          <div className="grid w-full grid-cols-2 justify-center gap-x-2 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {pageData.length === 0 ? (
              <div className="col-span-full py-8 text-center text-gray-50">
                {searchKeyword ? '검색 결과가 없습니다.' : '북마크가 없습니다.'}
              </div>
            ) : (
              pageData.map((item, index) => (
                <SortableItem
                  key={'folderId' in item ? item.folderId : item.linkId}
                  item={item}
                  index={index}
                />
              ))
            )}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId && getActiveItem() ? (
            <div style={{ zIndex: 1000 }}>
              {'folderId' in getActiveItem()! ? (
                <FolderCard
                  isBookmark={getActiveItem()!.isFavorite}
                  item={getActiveItem() as FolderDetail}
                />
              ) : (
                <LinkCard
                  isBookmark={getActiveItem()!.isFavorite}
                  item={getActiveItem() as LinkDetail}
                />
              )}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

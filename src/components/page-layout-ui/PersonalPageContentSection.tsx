import { useEffect, useState } from 'react';
import { PageContentSectionProps } from '@/types/pages';
import LinkCard from '../common-ui/LinkCard';
import FolderCard from '../common-ui/FolderCard';
import AddLinkModal from '../modal/link/AddLinkModal';
import { useModalStore } from '@/stores/modalStore';
import ErrorLinkModal from '../modal/link/ErrorLinkModal';
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
import { FolderDetail } from '@/types/folders';
import { LinkDetail } from '@/types/links';

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
    zIndex: isDragging ? 50 : 0,
    position: 'relative',
    touchAction: 'none',
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

//콘텐츠 카드 컴포넌트

export default function PersonalPageContentSection({
  folderData = [],
  linkData = [],
}: PageContentSectionProps) {
  const { isLinkModalOpen, closeLinkModal, isErrorModalOpen, closeErrorModal } =
    useModalStore();

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
    parentFolderId: '',
  });

  useEffect(() => {
    const safeFolderData = Array.isArray(folderData) ? folderData : [];
    const safeLinkData = Array.isArray(linkData) ? linkData : [];
    const newInitialData = [...safeFolderData, ...safeLinkData].sort(
      (a, b) => a.orderIndex - b.orderIndex
    );
    setPageData(newInitialData);
  }, [folderData, linkData]);

  const [pageData, setPageData] = useState<(FolderDetail | LinkDetail)[] | []>(
    []
  );
  const [activeId, setActiveId] = useState<string | number | null>(null);

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
        parentFolderId: parentsFolderId ?? '',
      });
    } catch (error) {
      console.error('드래그 앤 드롭 업데이트 실패:', error);
      setPageData(pageData); // 실패 시 원상복구
    }
  };

  const getActiveItem = () => {
    if (!activeId) return null;
    return pageData.find(
      (item) => ('folderId' in item ? item.folderId : item.linkId) === activeId
    );
  };

  return (
    <div className={`h-screen w-full overflow-y-auto`}>
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
          <div
            className={`grid w-full grid-cols-2 justify-center gap-x-2 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
          >
            {pageData.map((item, index) => (
              <SortableItem
                key={'folderId' in item ? item.folderId : item.linkId}
                item={item}
                index={index}
              />
            ))}
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
      {isLinkModalOpen && (
        <AddLinkModal isOpen={isLinkModalOpen} onClose={closeLinkModal} />
      )}
      {isErrorModalOpen && (
        <ErrorLinkModal isOpen={isErrorModalOpen} onClose={closeErrorModal} />
      )}
    </div>
  );
}

import { useState } from 'react';
import { PageContentSectionProps } from '@/types/pages';
import LinkCard from '../common-ui/LinkCard';
import FolderCard from '../common-ui/FolderCard';
import AddLinkModal from '../modal/link/AddLinkModal';
import { useModalStore } from '@/stores/modalStore';
import ErrorLinkModal from '../modal/link/ErrorLinkModal';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import useUpdateDragandDrop from '@/hooks/mutations/useUpdateDragandDrop';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';

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
    targetOrderIndex: 0,
    parentFolderId: '',
  });

  const safeFolderData = Array.isArray(folderData) ? folderData : [];
  const safeLinkData = Array.isArray(linkData) ? linkData : [];
  const initialData = [...safeFolderData, ...safeLinkData].sort(
    (a, b) => a.orderIndex - b.orderIndex
  );

  const [pageData, setPageData] = useState(initialData);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.index === source.index) return;

    const movedItem = pageData[source.index];
    const targetId =
      'folderId' in movedItem ? movedItem.folderId : movedItem.linkId;
    const itemType = 'folderId' in movedItem ? 'FOLDER' : 'LINK';

    const newData = Array.from(pageData);
    const [removed] = newData.splice(source.index, 1);
    newData.splice(destination.index, 0, removed);
    setPageData(newData);

    try {
      await updateDragAndDropMutation.mutateAsync({
        baseRequest: { pageId, commandType: 'EDIT' },
        targetId,
        itemType,
        targetOrderIndex: destination.index + 1,
        parentFolderId: parentsFolderId ?? '',
      });
    } catch (error) {
      console.error('드래그 앤 드롭 업데이트 실패:', error);
      setPageData(initialData); // 실패 시 원상복구
    }
  };

  return (
    <div className={`h-screen w-full overflow-y-auto`}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="grid" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`grid w-full grid-cols-2 justify-center gap-x-2 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
            >
              {pageData.map((item, index) => (
                <Draggable
                  key={'folderId' in item ? item.folderId : item.linkId}
                  draggableId={String(
                    'folderId' in item ? item.folderId : item.linkId
                  )}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {'folderId' in item ? (
                        <FolderCard isBookmark={item.isFavorite} item={item} />
                      ) : (
                        <LinkCard isBookmark={item.isFavorite} item={item} />
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {isLinkModalOpen && (
        <AddLinkModal isOpen={isLinkModalOpen} onClose={closeLinkModal} />
      )}
      {isErrorModalOpen && (
        <ErrorLinkModal isOpen={isErrorModalOpen} onClose={closeErrorModal} />
      )}
    </div>
  );
}

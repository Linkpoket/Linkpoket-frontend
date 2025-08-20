import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { PageContentSectionProps } from '@/types/pages';
import LinkCard from '../common-ui/LinkCard';
import FolderCard from '../common-ui/FolderCard';
import AddLinkModal from '../modal/link/AddLinkModal';
import { useModalStore } from '@/stores/modalStore';
import useUpdateDragandDrop from '@/hooks/mutations/useUpdateDragandDrop';
import { usePageStore } from '@/stores/pageStore';

export default function SharedPageContentSection({
  folderData,
  linkData,
}: PageContentSectionProps) {
  const { isLinkModalOpen, closeLinkModal } = useModalStore();
  const { pageId } = usePageStore();

  // useUpdateDragandDrop 훅을 컴포넌트 레벨에서 선언
  const updateDragAndDropMutation = useUpdateDragandDrop({
    baseRequest: {
      pageId: pageId,
      commandType: 'EDIT',
    },
    targetId: '',
    itemType: '',
    targetOrderIndex: 0, // 기본값 설정
    parentFolderId: '',
  });

  const initialData = [...folderData, ...linkData].sort(
    (a, b) => a.orderIndex - b.orderIndex
  );

  const [pageData, setPageData] = useState(initialData);

  const onDragEnd = async (result: any) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.index === source.index) return;

    // 드래그 앤 드롭 완료 후 API 호출
    try {
      await updateDragAndDropMutation.mutate({
        baseRequest: {
          pageId: pageId,
          commandType: 'EDIT',
        },
        targetId: '현재 폴더 아이디',
        itemType: '링크인지 폴더인지',
        targetOrderIndex: destination.index + 1, // 1부터 시작하는 인덱스
        parentFolderId: '부모 폴더 ID',
      });
    } catch (error) {
      console.error('드래그 앤 드롭 업데이트 실패:', error);
      // 에러 발생 시 원래 상태로 되돌리기
      setPageData(initialData);
    }
  };

  return (
    <div className="h-screen w-full overflow-y-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="grid" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid w-full grid-cols-2 gap-x-2 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
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
    </div>
  );
}

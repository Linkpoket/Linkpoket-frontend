import { lazy, Suspense, useEffect, useState } from 'react';
import { SortablePageItem } from '../common-ui/SortablePageItem';
import LinkCard from '../link-card/LinkCard';
import FolderCard from '../folder-card/FolderCard';
import { useModalStore } from '@/stores/modalStore';
import { useSearchStore } from '@/stores/searchStore';
import { useMobile } from '@/hooks/useMobile';
import { PageContentSectionProps } from '@/types/pages';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { SortableContext, rectSwappingStrategy } from '@dnd-kit/sortable';
import useUpdateDragandDrop from '@/hooks/mutations/useUpdateDragandDrop';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { FolderDetail } from '@/types/folders';
import { LinkDetail } from '@/types/links';
import { AddLinkModalSkeleton } from '../skeleton/AddLinkModalSkeleton';
import { sortPageData } from '@/utils/pageData';
import { usePageDragAndDrop } from '@/hooks/usePageDragAndDrop';
import { useDragAndDropSensors } from '@/utils/dragAndDrop';
import MobileFolderCard from '../folder-card/mobile/MobileFolderCard';
import MobileFolderCardAddButton from '../folder-card/mobile/MobileFolderCardAddButton';
import MobileLinkCardButton from '../link-card/mobile/MobileLinkCardButton';

const AddLinkModal = lazy(() => import('../modal/link/AddLinkModal'));
const AddFolderModal = lazy(() => import('../modal/folder/AddFolderModal'));

export default function PersonalPageContentSection({
  folderData = [],
  linkData = [],
  sortType,
}: PageContentSectionProps) {
  const {
    isLinkModalOpen,
    closeLinkModal,
    isFolderModalOpen,
    closeFolderModal,
  } = useModalStore();

  const searchKeyword = useSearchStore((state) => state.searchKeyword);
  const searchResult = useSearchStore((state) => state.searchResult);
  const isMobile = useMobile();

  const { pageId } = usePageStore();
  const { parentsFolderId } = useParentsFolderIdStore();

  const updateDragAndDropMutation = useUpdateDragandDrop({
    baseRequest: {
      pageId: pageId,
      commandType: 'EDIT',
    },
    targetId: 0,
    itemType: '',
    newOrderIndex: 1,
    toFolderId: 0,
    fromFolderId: 0,
  });

  const [pageData, setPageData] = useState<(FolderDetail | LinkDetail)[] | []>(
    []
  );

  useEffect(() => {
    if (searchKeyword && searchResult) {
      // 검색 모드
      const searchFolders = searchResult.directorySimpleResponses || [];
      const searchLinks = searchResult.siteSimpleResponses || [];
      const combinedSearchData = [...searchFolders, ...searchLinks];
      const sortedData = sortPageData(combinedSearchData, sortType);
      setPageData(sortedData);
    } else {
      // 일반 모드
      const safeFolderData = Array.isArray(folderData) ? folderData : [];
      const safeLinkData = Array.isArray(linkData) ? linkData : [];
      const combinedData = [...safeFolderData, ...safeLinkData];
      const sortedData = sortPageData(combinedData, sortType);
      setPageData(sortedData);
    }
  }, [folderData, linkData, sortType, searchKeyword, searchResult]);

  const sensors = useDragAndDropSensors();

  const { activeId, onDragStart, onDragEnd, getActiveItem } =
    usePageDragAndDrop({
      pageData,
      searchKeyword,
      pageId,
      parentsFolderId: parentsFolderId ?? '',
      onMutation: updateDragAndDropMutation.mutateAsync,
      onDataChange: setPageData,
    });

  return (
    <div className="h-screen w-full overflow-y-auto">
      {/* 검색 상태 표시 */}
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
          {isMobile ? (
            <>
              <div className="text-gray-90 mb-4 px-4 text-lg font-semibold">
                폴더 ({folderData.length})
              </div>
              <div className="relative mb-10 grid w-full grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-3">
                <MobileFolderCardAddButton />
                {folderData.map((item: FolderDetail, index: number) => (
                  <MobileFolderCard
                    key={item.folderId}
                    folder={item}
                    index={index}
                    folderDataLength={folderData.length}
                  />
                ))}
              </div>
              <div className="text-gray-90 mb-4 px-4 text-lg font-semibold">
                링크 ({linkData.length})
              </div>
              <div className="relative grid w-full grid-cols-2 justify-center gap-x-2 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                <MobileLinkCardButton />
                {linkData.map((item: LinkDetail) => (
                  <SortablePageItem key={item.linkId} item={item} />
                ))}
              </div>
            </>
          ) : (
            <div className="relative grid w-full grid-cols-2 justify-center gap-x-2 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {pageData.length === 0 ? (
                <div className="col-span-full py-8 text-center text-gray-50">
                  {searchKeyword
                    ? '검색 결과가 없습니다.'
                    : '데이터가 없습니다.'}
                </div>
              ) : (
                pageData.map((item) => (
                  <SortablePageItem
                    key={'folderId' in item ? item.folderId : item.linkId}
                    item={item}
                  />
                ))
              )}
            </div>
          )}
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
        <Suspense fallback={<AddLinkModalSkeleton />}>
          <AddLinkModal isOpen={isLinkModalOpen} onClose={closeLinkModal} />
        </Suspense>
      )}
      {isFolderModalOpen && (
        <Suspense fallback={<AddLinkModalSkeleton />}>
          <AddFolderModal
            isOpen={isFolderModalOpen}
            onClose={closeFolderModal}
          />
        </Suspense>
      )}
    </div>
  );
}

import { lazy, useEffect, useState, Suspense } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSwappingStrategy } from '@dnd-kit/sortable';
import { PageContentSectionProps } from '@/types/pages';
import { SortablePageItem } from '../common-ui/SortablePageItem';
import { useModalStore } from '@/stores/modalStore';
import { useSearchStore } from '@/stores/searchStore';
import useUpdateDragandDrop from '@/hooks/mutations/useUpdateDragandDrop';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { LinkDetail } from '@/types/links';
import { FolderDetail } from '@/types/folders';
import { AddLinkModalSkeleton } from '../skeleton/AddLinkModalSkeleton';
import { sortPageData } from '@/utils/pageData';
import { usePageDragAndDrop } from '@/hooks/usePageDragAndDrop';
import { useDragAndDropSensors } from '@/utils/dragAndDrop';
import MobileFolderCard from '../folder-card/mobile/MobileFolderCard';
import MobileFolderCardAddButton from '../folder-card/mobile/MobileFolderCardAddButton';
import MobileLinkCardButton from '../link-card/mobile/MobileLinkCardButton';

const AddLinkModal = lazy(() => import('../modal/link/AddLinkModal'));
const AddFolderModal = lazy(() => import('../modal/folder/AddFolderModal'));

export default function SharedPageFolderContentSection({
  folderData = [],
  linkData = [],
  sortType,
  isMobile,
  pageImageUrl,
}: PageContentSectionProps & { isMobile: boolean; pageImageUrl: string }) {
  const {
    isLinkModalOpen,
    closeLinkModal,
    isFolderModalOpen,
    closeFolderModal,
  } = useModalStore();

  // 검색 스토어 구독
  const searchKeyword = useSearchStore((state) => state.searchKeyword);
  const searchResult = useSearchStore((state) => state.searchResult);

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

  const [pageData, setPageData] = useState<(FolderDetail | LinkDetail)[]>([]);

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
      const combinedData = [...folderData, ...linkData];
      const sortedData = sortPageData(combinedData, sortType);
      setPageData(sortedData);
    }
  }, [folderData, linkData, sortType, searchKeyword, searchResult]);

  // 정렬된 pageData에서 폴더와 링크 분리
  const sortedFolderData = pageData.filter(
    (item): item is FolderDetail => 'folderId' in item
  );
  const sortedLinkData = pageData.filter(
    (item): item is LinkDetail => 'linkId' in item
  );

  const sensors = useDragAndDropSensors();

  const { onDragEnd } = usePageDragAndDrop({
    pageData,
    searchKeyword,
    pageId,
    parentsFolderId: parentsFolderId ?? '',
    onMutation: updateDragAndDropMutation.mutateAsync,
    onDataChange: setPageData,
  });

  return (
    <div className="w-full">
      {searchKeyword && (
        <div className="text-gray-60 mb-4 text-sm">
          "{searchKeyword}" 검색 결과 {pageData.length}개
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
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
                폴더 ({sortedFolderData.length})
              </div>
              <div
                className="scrollbar-hide relative mb-10 flex w-full gap-x-2 overflow-x-auto pb-2"
                style={{
                  WebkitOverflowScrolling: 'touch' as any,
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <div className="flex-shrink-0">
                  <MobileFolderCardAddButton />
                </div>
                {sortedFolderData.map((item: FolderDetail, index: number) => (
                  <div key={item.folderId} className="flex-shrink-0">
                    <MobileFolderCard
                      folder={item}
                      index={index}
                      folderDataLength={sortedFolderData.length}
                      pageImageUrl={pageImageUrl}
                    />
                  </div>
                ))}
              </div>
              <div className="text-gray-90 mb-4 px-4 text-lg font-semibold">
                링크 ({sortedLinkData.length})
              </div>
              <div className="relative grid w-full grid-cols-3 justify-center gap-x-2 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                <MobileLinkCardButton />
                {sortedLinkData.map((item: LinkDetail) => (
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

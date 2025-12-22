import { lazy, Suspense, useEffect, useState, useMemo } from 'react';
import { SortablePageItem } from '../common-ui/SortablePageItem';
import LinkCard from '../link-card/LinkCard';
import FolderCard from '../folder-card/FolderCard';
import FileCard from '../file-card/FileCard';
import { useModalStore } from '@/stores/modalStore';
import { useSearchStore } from '@/stores/searchStore';
import { PageContentSectionProps } from '@/types/pages';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { SortableContext, rectSwappingStrategy } from '@dnd-kit/sortable';
import useUpdateDragandDrop from '@/hooks/mutations/useUpdateDragandDrop';
import {
  usePageStore,
  useParentsFolderIdStore,
  useFileListViewStore,
} from '@/stores/pageStore';
import { FolderDetail } from '@/types/folders';
import { LinkDetail } from '@/types/links';
import { FileResponse } from '@/types/files';
import { AddLinkModalSkeleton } from '../skeleton/AddLinkModalSkeleton';
import { handlePageDataSort } from '@/utils/handlePageDataSort';
import { usePageDragAndDrop } from '@/hooks/usePageDragAndDrop';
import { useDragAndDropSensors } from '@/utils/dragAndDrop';
import MobileFolderCard from '../folder-card/mobile/MobileFolderCard';
import MobileFolderCardAddButton from '../folder-card/mobile/MobileFolderCardAddButton';
import MobileLinkCardButton from '../link-card/mobile/MobileLinkCardButton';
import { useQuery } from '@tanstack/react-query';
import {
  fetchFilesByPageId,
  fetchFilesByFolderId,
} from '@/apis/file-apis/fetchFiles';

const AddLinkModal = lazy(() => import('../modal/link/AddLinkModal'));
const AddFolderModal = lazy(() => import('../modal/folder/AddFolderModal'));
const AddFileModal = lazy(() => import('../modal/file/AddFileModal'));

export default function PersonalPageContentSection({
  folderData,
  linkData,
  sortType,
  isMobile,
  pageImageUrl = '',
}: PageContentSectionProps & { isMobile: boolean; pageImageUrl: string }) {
  const {
    isLinkModalOpen,
    closeLinkModal,
    isFolderModalOpen,
    closeFolderModal,
    isFileModalOpen,
    closeFileModal,
  } = useModalStore();

  const searchKeyword = useSearchStore((state) => state.searchKeyword);
  const searchResult = useSearchStore((state) => state.searchResult);

  const { pageId } = usePageStore();
  const { parentsFolderId } = useParentsFolderIdStore();
  const { showFilesOnly } = useFileListViewStore();

  // 파일 데이터 fetch
  const { data: fileData = [] } = useQuery<FileResponse[]>({
    queryKey: ['files', pageId, parentsFolderId],
    queryFn: () => {
      if (parentsFolderId && pageId) {
        return fetchFilesByFolderId({
          pageId,
          folderId: parentsFolderId,
          commandType: 'VIEW',
          sortType: 'BASIC',
        });
      } else if (pageId) {
        return fetchFilesByPageId(pageId, 'VIEW', 'BASIC');
      }
      return [];
    },
    enabled: !!pageId,
  });

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

  const [pageData, setPageData] = useState<
    (FolderDetail | LinkDetail | FileResponse)[]
  >([]);

  // fileData의 길이와 주요 속성을 사용하여 무한 루프 방지
  const fileDataLength = fileData?.length || 0;
  const fileDataIds = useMemo(
    () => fileData.map((f) => f.fileId).join(','),
    [fileDataLength]
  );

  useEffect(() => {
    if (searchKeyword && searchResult) {
      // 검색 모드
      const searchFolders = searchResult.directorySimpleResponses || [];
      const searchLinks = searchResult.siteSimpleResponses || [];
      const combinedSearchData = [...searchFolders, ...searchLinks];
      const sortedData = handlePageDataSort(combinedSearchData, sortType);
      setPageData(sortedData);
    } else {
      // 일반 모드
      let combinedData: (FolderDetail | LinkDetail | FileResponse)[];

      if (showFilesOnly) {
        // 파일만 표시
        combinedData = [...fileData];
      } else {
        // 링크/폴더만 표시
        combinedData = [...folderData, ...linkData];
      }

      const sortedData = handlePageDataSort(combinedData, sortType);
      setPageData(sortedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    folderData,
    linkData,
    fileDataLength,
    fileDataIds,
    sortType,
    searchKeyword,
    searchResult,
    showFilesOnly,
  ]);

  // 정렬된 pageData에서 폴더와 링크 분리
  const sortedFolderData = pageData.filter(
    (item): item is FolderDetail => 'folderId' in item
  );
  const sortedLinkData = pageData.filter(
    (item): item is LinkDetail => 'linkId' in item
  );

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
    <div className="w-full">
      {/* controllerSection으로 이동 필요
      {searchKeyword && (
        <div className="text-gray-60 mb-4 text-sm">
          "{searchKeyword}" 검색 결과 {pageData.length}개
        </div>
      )} */}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={pageData.map((item) =>
            'folderId' in item
              ? item.folderId
              : 'fileId' in item
                ? item.fileId
                : item.linkId
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
                {sortedFolderData.map((item, index) => (
                  <div key={item.folderId} className="flex-shrink-0">
                    <MobileFolderCard
                      folder={item}
                      index={index}
                      folderDataLength={sortedFolderData.length}
                      pageImageUrl={pageImageUrl || ''}
                    />
                  </div>
                ))}
              </div>
              <div className="text-gray-90 mb-4 px-4 text-lg font-semibold">
                링크 ({sortedLinkData.length})
              </div>
              <div className="relative grid w-full grid-cols-3 justify-center gap-x-2 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                <MobileLinkCardButton />
                {sortedLinkData.map((item) => (
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
                pageData.map((item) => {
                  const itemId =
                    'folderId' in item
                      ? item.folderId
                      : 'fileId' in item
                        ? item.fileId
                        : item.linkId;
                  return <SortablePageItem key={itemId} item={item} />;
                })
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
              ) : 'fileId' in getActiveItem()! ? (
                <FileCard item={getActiveItem() as FileResponse} />
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
      {isFileModalOpen && (
        <Suspense fallback={<AddLinkModalSkeleton />}>
          <AddFileModal isOpen={isFileModalOpen} onClose={closeFileModal} />
        </Suspense>
      )}
    </div>
  );
}

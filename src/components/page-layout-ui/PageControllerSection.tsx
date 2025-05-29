import FolderIcon from '@/assets/widget-ui-assets/FolderIcon.svg?react';
import SiteIcon from '@/assets/widget-ui-assets/SiteIcon.svg?react';
import { Button } from '@/components/common-ui/button';
import { SearchBar } from '@/components/common-ui/SearchBar';
import { ViewToggle } from '@/components/common-ui/ViewToggle';
import PageSortBox from './PageSortBox';
import { PageControllerSectionProps } from '@/types/pageItems';
import { useCallback, useEffect } from 'react';
import AddFolderModal from '../modal/folder/AddFolderModal';
import AddLinkModal from '../modal/link/AddLinkModal';
import { useCreateLink } from '@/hooks/mutations/useCreateLink';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useDeleteLink } from '@/hooks/mutations/useDeleteLink';
import { useLinkActionStore } from '@/stores/linkActionStore';
import { useModalStore } from '@/stores/modalStore';

export default function PageControllerSection({
  view,
  setView,
  searchKeyword,
  setSearchKeyword,
}: PageControllerSectionProps) {
  const {
    isLinkModalOpen,
    isFolderModalOpen,
    openLinkModal,
    openFolderModal,
    closeLinkModal,
    closeFolderModal,
  } = useModalStore();
  const pageId = usePageStore((state) => state.pageId);

  const setDeleteLink = useLinkActionStore((state) => state.setDeleteLink);
  const { parentsFolderId } = useParentsFolderIdStore();

  const { mutate: createLink } = useCreateLink();
  const { mutate: deleteLinkMutate } = useDeleteLink();

  const deleteHandler = useCallback(
    (id: number) => {
      deleteLinkMutate({
        baseRequest: {
          pageId,
          commandType: 'EDIT',
        },
        linkId: id,
      });
    },
    [deleteLinkMutate, pageId]
  );

  useEffect(() => {
    setDeleteLink(deleteHandler);
  }, [setDeleteLink, deleteHandler]);

  return (
    <div className="flex flex-col justify-between gap-[16px] px-[64px] xl:flex-row xl:gap-0">
      <div className="flex h-[48px] gap-[12px]">
        <Button
          variant="ghost"
          size="md"
          className="flex gap-[6px]"
          onClick={() => openFolderModal()}
        >
          <FolderIcon />
          폴더 추가
        </Button>
        <Button
          variant="ghost"
          size="md"
          className="flex gap-[6px]"
          onClick={() => openLinkModal()}
        >
          <SiteIcon />
          링크 추가
        </Button>
      </div>
      <div className="flex gap-[12px]">
        <SearchBar
          size="fixed"
          placeholder="폴더, 링크 검색"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onClear={() => setSearchKeyword('')}
        />
        <PageSortBox />
        <div className="hidden lg:block">
          <ViewToggle selectedView={view} onChange={setView} />
        </div>
      </div>
      {isFolderModalOpen && (
        <AddFolderModal isOpen={isFolderModalOpen} onClose={closeFolderModal} />
      )}
      {isLinkModalOpen && (
        <AddLinkModal
          isOpen={isLinkModalOpen}
          onClose={closeLinkModal}
          onSubmit={async (linkName, linkUrl) => {
            createLink({
              baseRequest: {
                pageId,
                commandType: 'CREATE',
              },
              linkName,
              linkUrl,
              directoryId: parentsFolderId ?? 1,
              faviconUrl: `${linkUrl}/favicon.ico`,
            });
          }}
        />
      )}
    </div>
  );
}

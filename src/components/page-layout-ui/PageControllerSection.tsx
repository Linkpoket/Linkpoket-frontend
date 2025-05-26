import FolderIcon from '@/assets/widget-ui-assets/FolderIcon.svg?react';
import SiteIcon from '@/assets/widget-ui-assets/SiteIcon.svg?react';
import { Button } from '@/components/common-ui/button';
import { SearchBar } from '@/components/common-ui/SearchBar';
import { ViewToggle } from '@/components/common-ui/ViewToggle';
import PageSortBox from './PageSortBox';
import { PageControllerSectionProps } from '@/types/pageItems';
import { useEffect, useState } from 'react';
import AddFolderModal from '../modal/folder/AddFolderModal';
import AddLinkModal from '../modal/link/AddLinkModal';
import { useCreateLink } from '@/hooks/mutations/useCreateLink';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteLink } from '@/hooks/mutations/useDeleteLink';
import { useLinkActionStore } from '@/stores/linkActionStore';

export default function PageControllerSection({
  view,
  setView,
}: PageControllerSectionProps) {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const pageId = usePageStore((state) => state.pageId);
  const queryClient = useQueryClient();
  const setDeleteLink = useLinkActionStore((state) => state.setDeleteLink);
  const { parentsFolderId } = useParentsFolderIdStore();
  console.log('pageId', pageId);

  const { mutate: createLink } = useCreateLink({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['selectedPage', pageId, 'VIEW'] as const,
      });
    },
    onError: (error) => {
      console.error('링크 생성 실패:', error);
    },
  });

  const { mutate: deleteLinkMutate } = useDeleteLink({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['selectedPage', pageId, 'VIEW'] as const,
      });
    },
  });

  useEffect(() => {
    setDeleteLink((id) => {
      deleteLinkMutate({
        baseRequest: {
          pageId,
          commandType: 'EDIT',
        },
        linkId: Number(id),
      });
    });
  }, [deleteLinkMutate, setDeleteLink, pageId]);

  return (
    <div className="flex flex-col justify-between gap-[16px] px-[64px] xl:flex-row xl:gap-0">
      <div className="flex h-[48px] gap-[12px]">
        <Button
          variant="ghost"
          size="md"
          className="flex gap-[6px]"
          onClick={() => setIsFolderOpen(true)}
        >
          <FolderIcon />
          폴더 추가
        </Button>
        <Button
          variant="ghost"
          size="md"
          className="flex gap-[6px]"
          onClick={() => setIsLinkOpen(true)}
        >
          <SiteIcon />
          링크 추가
        </Button>
      </div>
      <div className="flex gap-[12px]">
        <SearchBar size="fixed" placeholder="폴더, 링크 검색" />
        <PageSortBox />
        <div className="hidden lg:block">
          <ViewToggle selectedView={view} onChange={setView} />
        </div>
      </div>
      {isFolderOpen && (
        <AddFolderModal
          isOpen={isFolderOpen}
          onClose={() => setIsFolderOpen(false)}
        />
      )}
      {isLinkOpen && (
        <AddLinkModal
          isOpen={isLinkOpen}
          onClose={() => setIsLinkOpen(false)}
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

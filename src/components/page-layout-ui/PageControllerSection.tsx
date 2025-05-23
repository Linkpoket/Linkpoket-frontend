import FolderIcon from '@/assets/widget-ui-assets/FolderIcon.svg?react';
import SiteIcon from '@/assets/widget-ui-assets/SiteIcon.svg?react';
import { Button } from '@/components/common-ui/button';
import { SearchBar } from '@/components/common-ui/SearchBar';
import { ViewToggle } from '@/components/common-ui/ViewToggle';
import PageSortBox from './PageSortBox';
import { PageControllerSectionProps } from '@/types/pageItems';
import { useState } from 'react';
import AddFolderModal from '../modal/folder/AddFolderModal';
import AddLinkModal from '../modal/link/AddLinkModal';
import { useCreateLink } from '@/hooks/mutations/useCreateLink';
import { usePageStore } from '@/stores/pageStore';

export default function PageControllerSection({
  view,
  setView,
}: PageControllerSectionProps) {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const pageId = usePageStore((state) => state.pageId);

  const { mutate: createLink } = useCreateLink({
    onSuccess: () => {
      console.log('링크 생성 성공');
    },
    onError: (error) => {
      console.error('링크 생성 실패:', error);
    },
  });

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
          pageId={2}
          parentFolderId={1}
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
              directoryId: 1, // 실제 폴더 ID
              faviconUrl: `${linkUrl}/favicon.ico`,
            });
          }}
        />
      )}
    </div>
  );
}

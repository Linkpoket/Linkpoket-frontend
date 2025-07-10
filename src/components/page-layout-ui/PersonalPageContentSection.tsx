import { useState } from 'react';
import { ContextMenu } from '../common-ui/ContextMenu';
import { PageContentSectionProps } from '@/types/pageItems';
import { useModalStore } from '@/stores/modalStore';
import LinkCard from '../common-ui/LinkCard';
import FolderCard from '../common-ui/FolderCard';

export default function PersonalPageContentSection({
  searchResult,
  pageDetails,
}: PageContentSectionProps) {
  const { openLinkModal, openFolderModal } = useModalStore();
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  console.log('선택한 페이지 데이터:', pageDetails);

  // 실제 사용할 데이터
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const folderData = pageDetails?.directoryDetailRespons ?? [];
  const linkData = pageDetails?.siteDetailResponses ?? [];

  const mergedList = searchResult
    ? [
        ...(searchResult.directorySimpleResponses ?? []),
        ...(searchResult.siteSimpleResponses ?? []),
      ].map((item, index) => ({
        ...item,
        orderIndex:
          'orderIndex' in item && typeof item.orderIndex === 'number'
            ? item.orderIndex
            : index,
      }))
    : [...folderData, ...linkData].sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div
      onContextMenu={handleContextMenu}
      className={`mx-auto mt-[40px] w-full max-w-[1180px] flex-1 overflow-y-auto text-3xl font-bold`}
    >
      <div
        className={`grid-cols-custom grid w-full max-w-[1180px] min-w-[328px] gap-6`}
      >
        <LinkCard isBookmark={false} />
        <LinkCard isBookmark={false} />
        <LinkCard isBookmark={false} />
        <LinkCard isBookmark={false} />
        <LinkCard isBookmark={false} />
        <LinkCard isBookmark={false} />
        <FolderCard isBookmark={false} />
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
            onAddFolder={openFolderModal}
            onAddLink={openLinkModal}
          />
        )}
      </div>
    </div>
  );
}

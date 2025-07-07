import { useState } from 'react';
import { ContextMenu } from '../common-ui/ContextMenu';
import { PageContentSectionProps } from '@/types/pageItems';
import { useModalStore } from '@/stores/modalStore';

export default function SharedPageContentSection({
  view,
  contentData,
  searchResult,
}: PageContentSectionProps) {
  const { openLinkModal, openFolderModal } = useModalStore();
  const [isBookmarkRerender, setIsBookmarkRerender] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };
  console.log('contentData:', contentData);

  const folderData = contentData?.directoryDetailRespons ?? [];
  const linkData = contentData?.siteDetailResponses ?? [];
  const mergedList = searchResult
    ? [
        ...(searchResult.directorySimpleResponses ?? []),
        ...(searchResult.siteSimpleResponses ?? []),
      ].map((item, index) => ({
        ...item,
        orderIndex: index, // orderIndex는 없기 때문에 임의 부여
      }))
    : [...folderData, ...linkData].sort((a, b) => a.orderIndex - b.orderIndex);
  console.log('합친 데이터', mergedList);

  return (
    <div
      onContextMenu={handleContextMenu}
      className={`mx-auto mt-[40px] w-full max-w-[1180px] flex-1 overflow-y-auto px-[104px] text-3xl font-bold`}
    >
      <div
        className={`w-full max-w-[1180px] min-w-[328px] ${
          view === 'grid'
            ? 'grid-cols-custom grid gap-4'
            : 'flex flex-col gap-4'
        }`}
      >
        {mergedList.map((item) => {
          return null;
        })}

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

import { useState } from 'react';
import FolderItem from './FolderItem';
import LinkItem from './LinkItem';
import { ContextMenu } from '../common-ui/ContextMenu';
import { PageContentSectionProps } from '@/types/pageItems';

export default function SharedPageContentSection({
  view,
  contentData,
}: PageContentSectionProps) {
  const [isBookmark, setIsBookmark] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const folderData = contentData?.directoryDetailRespons ?? [];
  const linkData = contentData?.siteDetailResponses ?? [];
  const mergedList = [...folderData, ...linkData].sort(
    (a, b) => a.orderIndex - b.orderIndex
  );
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
          if ('folderId' in item) {
            return (
              <FolderItem
                key={item.orderIndex}
                isBookmark={item.isFavorite}
                setIsBookmark={setIsBookmark}
                item={{ id: item.folderId, title: item.folderName }}
                view={view}
              />
            );
          } else if ('linkId' in item) {
            return (
              <LinkItem
                key={item.orderIndex}
                isBookmark={item.isFavorite}
                setIsBookmark={setIsBookmark}
                item={{
                  id: item.linkId,
                  title: item.linkName,
                  linkUrl: item.linkUrl,
                }}
                view={view}
              />
            );
          }
          return null;
        })}

        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
          />
        )}
      </div>
    </div>
  );
}

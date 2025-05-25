import { useState, useEffect } from 'react';
import FolderItem from './FolderItem';
import LinkItem from './LinkItem';
import { ContextMenu } from '../common-ui/ContextMenu';
import { PageContentSectionProps } from '@/types/pageItems';
import { useParams } from 'react-router-dom';
import { useFetchSelectedPage } from '@/hooks/queries/useFetchSelectedPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';

export default function PersonalPageContentSection({
  view,
}: PageContentSectionProps) {
  const [isBookmark, setIsBookmark] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  //만약 path param이 없다면 1로 간주하고, 있다면 그대로 꺼내와서 사용.
  const { pageId } = useParams();

  let resolvedPageId = 1;
  if (pageId) {
    resolvedPageId = parseInt(pageId);
  }

  // 클릭해서 들어간 페이지 정보 전역 변수로서 저장
  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();

  const selectedPageQuery = useFetchSelectedPage({
    pageId: resolvedPageId,
    commandType: 'VIEW',
  });

  useEffect(() => {
    setPageInfo(resolvedPageId, 'VIEW');
    setParentsFolderId(selectedPageQuery.data?.data.parentsFolderId);
  }, [resolvedPageId, setPageInfo, setParentsFolderId, selectedPageQuery.data]);

  // 실제 사용할 데이터

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const folderData = selectedPageQuery.data?.data.directoryDetailRespons ?? [];
  const linkData = selectedPageQuery.data?.data.siteDetailResponses ?? [];
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
                key={item.folderName}
                isBookmark={item.isFavorite}
                setIsBookmark={setIsBookmark}
                item={{ id: item.folderId, title: item.folderName }}
                view={view}
              />
            );
          } else if ('linkId' in item) {
            return (
              <LinkItem
                key={item.linkName}
                isBookmark={item.isFavorite}
                setIsBookmark={setIsBookmark}
                item={{ id: item.linkId, title: item.linkName }}
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

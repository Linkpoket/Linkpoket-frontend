import { useState } from 'react';
import FolderItem from './FolderItem';
import LinkItem from './LinkItem';
import { ContextMenu } from '../common-ui/ContextMenu';
import { PageContentSectionProps } from '@/types/pageItems';
import { useLocation, useParams } from 'react-router-dom';
import { useFetchSelectedPage } from '@/hooks/queries/useFetchSelectedPage';
import useFetchFavorite from '@/hooks/queries/useFetchFavorite';

export default function PageContentSection({ view }: PageContentSectionProps) {
  const [isBookmark, setIsBookmark] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  //만약 path param이 없다면 1로 간주하고, 있다면 그대로 꺼내와서 사용.
  const { pageId } = useParams();
  const location = useLocation();
  const isBookmarks = location.pathname.includes('bookmarks');

  let resolvedPageId = 1;
  if (pageId) {
    resolvedPageId = parseInt(pageId);
  }

  // 분기: bookmarks면 useFetchFavorite, 아니면 useFetchSelectedPage
  const favoriteQuery = useFetchFavorite();
  const selectedPageQuery = useFetchSelectedPage({
    pageId: resolvedPageId,
    commandType: 'VIEW',
    enabled: !isBookmarks,
  });

  // 실제 사용할 데이터
  const data = isBookmarks ? favoriteQuery.favorite : selectedPageQuery.data;

  console.log(data);

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
        <FolderItem
          isBookmark={isBookmark}
          setIsBookmark={setIsBookmark}
          item={{ id: '1', title: '폴더 이름' }}
          view={view}
        />
        <LinkItem
          isBookmark={isBookmark}
          setIsBookmark={setIsBookmark}
          item={{ id: '1', title: '링크 이름' }}
          view={view}
        />

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

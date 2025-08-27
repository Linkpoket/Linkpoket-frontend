import { useEffect, useState } from 'react';
import { PageContentSectionProps } from '@/types/pages';
import LinkCard from '../common-ui/LinkCard';
import FolderCard from '../common-ui/FolderCard';
import { useSearchStore } from '@/stores/searchStore';
import { FolderDetail } from '@/types/folders';
import { LinkDetail } from '@/types/links';

export default function BookmarkPageContentSection({
  folderData = [],
  linkData = [],
  sortType,
}: PageContentSectionProps) {
  const searchKeyword = useSearchStore((state) => state.searchKeyword);
  const searchResult = useSearchStore((state) => state.searchResult);

  const [pageData, setPageData] = useState<(FolderDetail | LinkDetail)[]>([]);

  const sortData = (data: (FolderDetail | LinkDetail)[], sortType: string) => {
    if (!data || data.length === 0) return [];

    const sortedData = [...data];

    switch (sortType) {
      case '최신순':
        return sortedData.sort((a, b) => {
          if (a.orderIndex !== undefined && b.orderIndex !== undefined) {
            return (b.orderIndex || 0) - (a.orderIndex || 0);
          }
          const dateA = new Date(a.createdDate || '').getTime();
          const dateB = new Date(b.createdDate || '').getTime();
          return dateB - dateA;
        });

      case '이름순':
        return sortedData.sort((a, b) => {
          const nameA = ('folderId' in a ? a.folderName : a.linkName) || '';
          const nameB = ('folderId' in b ? b.folderName : b.linkName) || '';
          return nameA.localeCompare(nameB);
        });

      case '기본순':
      default:
        return sortedData.sort((a, b) => {
          if (a.orderIndex !== undefined && b.orderIndex !== undefined) {
            return (a.orderIndex || 0) - (b.orderIndex || 0);
          }
          const dateA = new Date(a.createdDate || '').getTime();
          const dateB = new Date(b.createdDate || '').getTime();
          return dateA - dateB;
        });
    }
  };

  useEffect(() => {
    if (searchKeyword && searchResult) {
      // 검색 모드
      const searchFolders = searchResult.directorySimpleResponses || [];
      const searchLinks = searchResult.siteSimpleResponses || [];
      const combinedSearchData = [...searchFolders, ...searchLinks];
      const sortedData = sortData(combinedSearchData, sortType);
      setPageData(sortedData);
    } else {
      // 일반 모드
      const combinedData = [...folderData, ...linkData];
      const sortedData = sortData(combinedData, sortType);
      setPageData(sortedData);
    }
  }, [folderData, linkData, sortType, searchKeyword, searchResult]);

  return (
    <div className="h-screen w-full overflow-y-auto">
      {searchKeyword && (
        <div className="text-gray-60 mb-4 text-sm">
          "{searchKeyword}" 검색 결과 {pageData.length}개
        </div>
      )}

      <div className="grid w-full grid-cols-2 justify-center gap-x-2 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {pageData.length === 0 ? (
          <div className="col-span-full py-8 text-center text-gray-50">
            {searchKeyword ? '검색 결과가 없습니다.' : '북마크가 없습니다.'}
          </div>
        ) : (
          pageData.map((item) =>
            'folderId' in item ? (
              <FolderCard
                key={item.folderId}
                isBookmark={item.isFavorite}
                item={item}
              />
            ) : (
              <LinkCard
                key={item.linkId}
                isBookmark={item.isFavorite}
                item={item}
              />
            )
          )
        )}
      </div>
    </div>
  );
}

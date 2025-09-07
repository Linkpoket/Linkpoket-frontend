import { lazy } from 'react';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';

const BookmarkPageContentSection = lazy(
  () => import('@/components/page-layout-ui/BookmarkPageContentSection')
);

import useFetchFavorite from '@/hooks/queries/useFetchFavorite';
import { useState } from 'react';
export default function BookmarkPage() {
  const favoriteQuery = useFetchFavorite();

  // 실제 사용할 데이터
  const refinedData = favoriteQuery.favorite;
  const folderData = refinedData?.directorySimpleResponses ?? [];
  const linkData = refinedData?.siteSimpleResponses ?? [];
  const folderDataLength = folderData?.length;
  const linkDataLength = linkData?.length;

  const [sortType, setSortType] = useState<string>('기본순');

  console.log('refinedData', refinedData);
  console.log('folderData', folderData);
  console.log('linkData', linkData);

  const handleSort = (selectedSortType: string) => {
    setSortType(selectedSortType);
  };

  return (
    <div className="bg-gray-5 flex h-screen min-w-[328px] flex-col px-[64px] py-[56px] xl:px-[102px]">
      <PageHeaderSection pageTitle="북마크" />
      <PageControllerSection
        folderDataLength={folderDataLength}
        linkDataLength={linkDataLength}
        onSortChange={handleSort}
      />
      <BookmarkPageContentSection
        folderData={folderData}
        linkData={linkData}
        sortType={sortType}
      />
    </div>
  );
}

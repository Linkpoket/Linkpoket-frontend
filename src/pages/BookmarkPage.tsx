import { lazy } from 'react';

import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import useFetchFavorite from '@/hooks/queries/useFetchFavorite';
import { usePageSort } from '@/hooks/usePageSort';
import { getPageDataLength } from '@/utils/pageDataManage';
import { PageLayout } from '@/components/common-ui/PageLayout';
import { useMobile } from '@/hooks/useMobile';
import { baseCards } from '@/constants/homeCards';

const BookmarkPageContentSection = lazy(
  () => import('@/components/page-layout-ui/BookmarkPageContentSection')
);

export default function BookmarkPage() {
  const isMobile = useMobile();
  const { data } = useFetchFavorite();
  const { sortType, handleSort } = usePageSort();

  const folderData = data.folderSimpleResponses;
  const linkData = data.linkSimpleResponses;
  const { folderDataLength, linkDataLength } = getPageDataLength(
    folderData,
    linkData
  );

  // 북마크 페이지는 기본 북마크 이미지 사용
  const bookmarkCard = baseCards.find((card) => card.id === 'bookmark');
  const pageImageUrl = bookmarkCard?.backgroundImage || '';

  return (
    <>
      <PageLayout
        isMobile={isMobile}
        pageImageUrl={pageImageUrl}
        pageTitle="북마크"
      >
        <PageHeaderSection pageTitle="북마크" isMobile={isMobile} />
        <PageControllerSection
          folderDataLength={folderDataLength}
          linkDataLength={linkDataLength}
          onSortChange={handleSort}
          isMobile={isMobile}
        />
        <BookmarkPageContentSection
          folderData={folderData}
          linkData={linkData}
          sortType={sortType}
          isMobile={isMobile}
          pageImageUrl={pageImageUrl}
        />
      </PageLayout>
    </>
  );
}

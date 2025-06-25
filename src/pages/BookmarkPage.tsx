import { useEffect, useState } from 'react';
import { useMobile } from '@/hooks/useMobile';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import BookmarkPageContentSection from '@/components/page-layout-ui/BookmarkPageContentSection';
import { usePageStore } from '@/stores/pageStore';
import { usePageSearch } from '@/hooks/usePageSearch';
import useFetchFavorite from '@/hooks/queries/useFetchFavorite';
export default function BookmarkPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const pageId = usePageStore((state) => state.pageId);

  const { searchKeyword, setSearchKeyword, searchResult } = usePageSearch(
    pageId,
    'TITLE'
  );

  const isMobile = useMobile();

  useEffect(() => {
    if (isMobile) {
      setView('list');
    }
  }, [isMobile]);

  const favoriteQuery = useFetchFavorite();

  // 실제 사용할 데이터
  const data = favoriteQuery.favorite;

  return (
    <div className="flex h-screen flex-col">
      {/* HEADER SECTION*/}
      <PageHeaderSection
        pageTitle="북마크 페이지"
        pageDescription="즐겨찾기를 관리하는 페이지 입니다!"
      />

      {/* Boundary line */}
      <div className="border-b-gray-30 mb-[40px] w-full border-b" />

      {/* CONTROLLER SECTION*/}
      <PageControllerSection
        view={view}
        setView={setView}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />

      {/*CONTENT SECTION*/}
      <BookmarkPageContentSection
        view={view}
        searchResult={searchResult}
        contentData={data}
      />
    </div>
  );
}

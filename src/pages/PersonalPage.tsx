import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PersonalPageContentSection from '@/components/page-layout-ui/PersonalPageContentSection';
import { useFetchPersonalPage } from '@/hooks/queries/useFetchPersonalPage';
import { useMobile } from '@/hooks/useMobile';
import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageStore } from '@/stores/pageStore';
import { useUserStore } from '@/stores/userStore';
import { useEffect, useState } from 'react';

export default function PersonalPage() {
  const { member, pageDetails, isLoading, error } = useFetchPersonalPage();
  const setUser = useUserStore((state) => state.setUser);
  const pageId = usePageStore((state) => state.pageId);

  const { searchKeyword, setSearchKeyword, searchResult } = usePageSearch(
    pageId,
    'TITLE'
  );

  const [view, setView] = useState<'grid' | 'list'>('grid');

  const isMobile = useMobile();

  useEffect(() => {
    if (isMobile) {
      setView('list');
    }
  }, [isMobile]);

  const { nickName, email, colorCode } = member || {};

  useEffect(() => {
    if (nickName && email && colorCode) {
      setUser(nickName, email, colorCode);
    }
  }, [nickName, email, colorCode, setUser]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="flex h-screen flex-col">
      {/* HEADER SECTION*/}
      <PageHeaderSection
        pageTitle={pageDetails?.pageTitle}
        pageDescription={pageDetails?.pageDescription}
        folderId={pageDetails?.rootFolderId}
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
      <PersonalPageContentSection view={view} searchResult={searchResult} />
    </div>
  );
}

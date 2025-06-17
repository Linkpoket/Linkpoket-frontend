import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMobile } from '@/hooks/useMobile';
import { useFetchSelectedPage } from '@/hooks/queries/useFetchSharedPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import SharedPageContentSection from '@/components/page-layout-ui/SharedPageContentSection';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import useFetchSharedPageDashboard from '@/hooks/queries/useFetchSharedPageDashboard';
import useFetchSharedPageMember from '@/hooks/queries/useFetchSharedPageMember';
import { usePageSearch } from '@/hooks/usePageSearch';
import { useBreadcrumbStore } from '@/stores/breadcrumb';

export default function SharedPage() {
  const { pageId } = useParams();
  const numericId = Number.parseInt(pageId ?? '', 10);
  const resolvedPageId = Number.isFinite(numericId) ? numericId : null;

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const isMobile = useMobile();

  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();

  // resolvedPageId가 null인 경우 usePageSearch 내부에서 문제가 발생할 수 있으므로,
  // 존재하지 않는 ID인 -1을 더미 값으로 사용해 안전하게 Hook을 호출함
  const { searchKeyword, setSearchKeyword, searchResult } = usePageSearch(
    resolvedPageId ?? -1,
    'TITLE'
  );
  const selectedPageQuery = useFetchSelectedPage({
    pageId: resolvedPageId ?? -1,
    commandType: 'VIEW',
  });

  const sharedPageMemberQuery = useFetchSharedPageMember({
    pageId: resolvedPageId ?? -1,
    commandType: 'VIEW',
  });

  console.log('페이지 멤버 정보', sharedPageMemberQuery.data);

  const { addCrumb } = useBreadcrumbStore();

  const selectedPage = selectedPageQuery.data?.data;

  useEffect(() => {
    if (isMobile) {
      setView('list');
    }
  }, [isMobile]);

  useEffect(() => {
    const rootFolderId = selectedPage?.rootFolderId;

    if (resolvedPageId !== null && rootFolderId) {
      setPageInfo(resolvedPageId, 'VIEW');
      setParentsFolderId(rootFolderId);
    }
  }, [
    resolvedPageId,
    selectedPage?.rootFolderId,
    setPageInfo,
    setParentsFolderId,
  ]);

  useEffect(() => {
    if (selectedPage) {
      addCrumb({
        id: selectedPage.pageId.toString(),
        title: selectedPage.pageTitle,
        type: 'shared',
      });
    }
  }, [selectedPage, addCrumb]);

  if (resolvedPageId === null) return <div>잘못된 접근입니다.</div>;

  return (
    <div className="flex h-screen flex-col">
      {/* HEADER SECTION*/}
      {selectedPage && (
        <>
          <PageHeaderSection
            pageTitle={selectedPage.pageTitle}
            pageDescription={selectedPage.pageDescription}
            folderId={selectedPage.rootFolderId}
          />
          {/* Boundary line */}
          <div className="border-b-gray-30 mb-[40px] w-full border-b" />
        </>
      )}

      {/* CONTROLLER SECTION*/}
      <PageControllerSection
        view={view}
        setView={setView}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />

      {/*CONTENT SECTION*/}
      <SharedPageContentSection
        view={view}
        contentData={selectedPage}
        searchResult={searchResult}
      />
    </div>
  );
}

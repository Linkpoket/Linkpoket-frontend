import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMobile } from '@/hooks/useMobile';
import { useFetchSelectedPage } from '@/hooks/queries/useFetchSharedPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import SharedPageContentSection from '@/components/page-layout-ui/SharedPageContentSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import useFetchSharedPageMember from '@/hooks/queries/useFetchSharedPageMember';
import { usePageSearch } from '@/hooks/usePageSearch';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';

export default function SharedPage() {
  const { pageId } = useParams();
  const safePageId = pageId ?? '';

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const isMobile = useMobile();

  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();

  const { searchKeyword, setSearchKeyword, searchResult } = usePageSearch(
    safePageId,
    'TITLE'
  );
  const selectedPageQuery = useFetchSelectedPage({ pageId: safePageId });
  const sharedPageMemberQuery = useFetchSharedPageMember({
    pageId: safePageId,
  });

  const selectedPage = selectedPageQuery.data?.data;

  useEffect(() => {
    if (isMobile) {
      setView('list');
    }
  }, [isMobile]);

  useEffect(() => {
    const rootFolderId = selectedPage?.rootFolderId;

    if (pageId && rootFolderId) {
      setPageInfo(pageId, 'VIEW');
      setParentsFolderId(rootFolderId);
    }
  }, [pageId, selectedPage?.rootFolderId, setPageInfo, setParentsFolderId]);

  if (!pageId) return <div>잘못된 접근입니다.</div>;

  return (
    <div className="flex h-screen min-w-[328px] flex-col px-[64px] py-[56px] xl:px-[102px]">
      <PageHeaderSection pageTitle="폴더1" folderId={1} />
      <PageControllerSection />
      <SharedPageContentSection
        view={view}
        contentData={selectedPage}
        searchResult={searchResult}
      />
    </div>
  );
}

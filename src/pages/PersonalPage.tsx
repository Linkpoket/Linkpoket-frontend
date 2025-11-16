import { lazy, useEffect } from 'react';

import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import { useFetchPersonalPage } from '@/hooks/queries/useFetchPersonalPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useUserStore } from '@/stores/userStore';
import { usePageLayout } from '@/hooks/usePageLayout';
import { getPageDataLength } from '@/utils/pageData';
import { PageLayout } from '@/components/common-ui/PageLayout';
import ScrollToTopButton from '@/components/common-ui/ScrollToTopButton';

const PersonalPageContentSection = lazy(
  () => import('@/components/page-layout-ui/PersonalPageContentSection')
);

export default function PersonalPage() {
  const { data } = useFetchPersonalPage('');

  const { setUser } = useUserStore();
  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const { sortType, handleSort } = usePageLayout();

  const folderData = data?.data.directoryDetailResponses ?? [];
  const linkData = data?.data.linkDetailResponses ?? [];
  const { folderDataLength, linkDataLength } = getPageDataLength(
    folderData,
    linkData
  );

  const pageId = data?.data.pageId;
  const rootFolderId = data?.data.rootFolderId;
  const pageTitle = data?.data.pageTitle;

  useEffect(() => {
    if (!pageId) return;

    setPageInfo(pageId);

    if (rootFolderId) {
      setParentsFolderId(rootFolderId);
    }

    if (data?.data.pageDetails) {
      localStorage.setItem(
        'personalPageData',
        JSON.stringify({
          data,
          lastUpdated: new Date().toISOString(),
        })
      );
    }
  }, [pageId, rootFolderId, data, setPageInfo, setParentsFolderId, setUser]);

  return (
    <>
      <PageLayout>
        <PageHeaderSection pageTitle={pageTitle} />
        <PageControllerSection
          folderDataLength={folderDataLength}
          linkDataLength={linkDataLength}
          onSortChange={handleSort}
        />
        <PersonalPageContentSection
          folderData={folderData}
          linkData={linkData}
          sortType={sortType}
        />
        <ScrollToTopButton />
      </PageLayout>
    </>
  );
}

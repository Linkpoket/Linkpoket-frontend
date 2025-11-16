import { lazy, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import { useFetchSharedPage } from '@/hooks/queries/useFetchSharedPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { usePageLayout } from '@/hooks/usePageLayout';
import { getPageDataLength } from '@/utils/pageData';
import { PageLayout } from '@/components/common-ui/PageLayout';
import ScrollToTopButton from '@/components/common-ui/ScrollToTopButton';

const SharedPageFolderContentSection = lazy(
  () => import('@/components/page-layout-ui/SharedPageFolderContentSection')
);

export default function SharedPage() {
  const { pageId: pageIdParam } = useParams();
  const pageId = pageIdParam ?? '';
  const { data } = useFetchSharedPage(pageId);

  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const { sortType, handleSort } = usePageLayout();

  const refinedData = data?.data;
  const folderData = refinedData?.folderDetailResponses ?? [];
  const linkData = refinedData?.linkDetailResponses ?? [];

  const { folderDataLength, linkDataLength } = getPageDataLength(
    folderData,
    linkData
  );

  const rootFolderId = refinedData?.rootFolderId;
  const pageTitle = refinedData?.pageTitle;

  useEffect(() => {
    if (!pageId) return;

    setPageInfo(pageId);

    if (rootFolderId) {
      setParentsFolderId(rootFolderId);
    }
  }, [pageId, rootFolderId, setPageInfo, setParentsFolderId]);

  return (
    <PageLayout>
      <PageHeaderSection pageTitle={pageTitle} pageId={pageId} />
      <PageControllerSection
        folderDataLength={folderDataLength}
        linkDataLength={linkDataLength}
        onSortChange={handleSort}
      />
      <SharedPageFolderContentSection
        folderData={folderData}
        linkData={linkData}
        sortType={sortType}
      />
      <ScrollToTopButton />
    </PageLayout>
  );
}

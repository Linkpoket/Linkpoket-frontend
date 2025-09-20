import { lazy, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SharedPageHeaderSection from '@/components/page-layout-ui/SharedPageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import { useFetchSharedPage } from '@/hooks/queries/useFetchSharedPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { usePageLayout } from '@/hooks/usePageLayout';
import { usePageData } from '@/hooks/usePageData';
import { PageLayout } from '@/components/common-ui/PageLayout';

const SharedPageContentSection = lazy(
  () => import('@/components/page-layout-ui/SharedPageContentSection')
);

export default function SharedPage() {
  const { pageId } = useParams<{ pageId: string }>();
  const { data } = useFetchSharedPage(pageId as string);

  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const { sortType, handleSort } = usePageLayout();

  const refinedData = data?.data;
  const folderData = refinedData?.directoryDetailResponses ?? [];
  const linkData = refinedData?.linkDetailResponses ?? [];
  const { folderDataLength, linkDataLength } = usePageData(
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
      <SharedPageHeaderSection
        pageTitle={pageTitle}
        pageId={pageId as string}
      />
      <PageControllerSection
        folderDataLength={folderDataLength}
        linkDataLength={linkDataLength}
        onSortChange={handleSort}
      />
      <SharedPageContentSection
        folderData={folderData}
        linkData={linkData}
        sortType={sortType}
      />
    </PageLayout>
  );
}

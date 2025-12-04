import { lazy, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchSharedPage } from '@/hooks/queries/useFetchSharedPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { usePageSort } from '@/hooks/usePageSort';
import { useMobile } from '@/hooks/useMobile';
import { getPageDataLength } from '@/utils/pageDataManage';
import { PageLayout } from '@/components/common-ui/PageLayout';
import ScrollToTopButton from '@/components/common-ui/ScrollToTopButton';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
const SharedPageFolderContentSection = lazy(
  () => import('@/components/page-layout-ui/SharedPageFolderContentSection')
);

export default function SharedPage() {
  const { pageId: pageIdParam } = useParams();
  const pageId = pageIdParam ?? '';
  const isMobile = useMobile();

  const { data } = useFetchSharedPage(pageId);

  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const { sortType, handleSort } = usePageSort();

  useEffect(() => {
    if (!pageId || !data) return;

    const rootFolderId = data.rootFolderId;

    setPageInfo(pageId);

    if (rootFolderId) {
      setParentsFolderId(rootFolderId);
    }
  }, [pageId, data, setPageInfo, setParentsFolderId]);

  const folderData = data.folderDetailResponses;
  const linkData = data.linkDetailResponses;
  const { folderDataLength, linkDataLength } = getPageDataLength(
    folderData,
    linkData
  );

  const pageTitle = data.pageTitle;
  const pageImage = data.pageImageUrl;

  return (
    <>
      <PageLayout
        isMobile={isMobile}
        pageImageUrl={pageImage}
        pageTitle={pageTitle}
      >
        <PageHeaderSection
          pageTitle={pageTitle}
          pageId={pageId}
          isMobile={isMobile}
        />
        <PageControllerSection
          folderDataLength={folderDataLength}
          linkDataLength={linkDataLength}
          onSortChange={handleSort}
          isMobile={isMobile}
        />
        <SharedPageFolderContentSection
          folderData={folderData}
          linkData={linkData}
          sortType={sortType}
          isMobile={isMobile}
          pageImageUrl={pageImage}
        />
        <ScrollToTopButton />
      </PageLayout>
    </>
  );
}

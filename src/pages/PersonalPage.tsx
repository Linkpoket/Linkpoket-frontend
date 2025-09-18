import { lazy, useEffect } from 'react';

import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import { useFetchPersonalPage } from '@/hooks/queries/useFetchPersonalPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useUserStore } from '@/stores/userStore';
import { usePageLayout } from '@/hooks/usePageLayout';
import { usePageData } from '@/hooks/usePageData';
import { PageLayout } from '@/components/common-ui/PageLayout';

const PersonalPageContentSection = lazy(
  () => import('@/components/page-layout-ui/PersonalPageContentSection')
);

export default function PersonalPage() {
  const { data } = useFetchPersonalPage();
  const refinedData = data?.data.pageDetails;

  const { setUser } = useUserStore();
  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const { sortType, handleSort } = usePageLayout();

  const folderData = refinedData?.directoryDetailResponses ?? [];
  const linkData = refinedData?.linkDetailResponses ?? [];
  const { folderDataLength, linkDataLength } = usePageData(
    folderData,
    linkData
  );

  const pageId = refinedData?.pageId;
  const rootFolderId = refinedData?.rootFolderId;
  const pageTitle = refinedData?.pageTitle;
  const memberData = data?.data.member;

  useEffect(() => {
    if (!pageId) return;

    setPageInfo(pageId);

    if (rootFolderId) {
      setParentsFolderId(rootFolderId);
    }

    if (memberData) {
      setUser(memberData.nickName, memberData.email, memberData.colorCode);
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
  }, [
    pageId,
    rootFolderId,
    memberData,
    data,
    setPageInfo,
    setParentsFolderId,
    setUser,
  ]);

  return (
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
    </PageLayout>
  );
}

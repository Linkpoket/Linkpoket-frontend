import { lazy, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import useFetchFolderDetails from '@/hooks/queries/useFetchFolderDetails';
import { usePageLayout } from '@/hooks/usePageLayout';
import { usePageData } from '@/hooks/usePageData';
import { ErrorState } from '@/components/common-ui/ErrorState';
import { LoadingState } from '@/components/common-ui/LoadingState';
import { PageLayout } from '@/components/common-ui/PageLayout';

const SharedPageContentSection = lazy(
  () => import('@/components/page-layout-ui/SharedPageContentSection')
);

export default function FolderDetailPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const { pageId } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const { sortType, handleSort } = usePageLayout();

  useEffect(() => {
    if (folderId) {
      setParentsFolderId(folderId);
    }
  }, [folderId, setParentsFolderId]);

  const requestParams = {
    pageId,
    commandType: 'VIEW' as const,
    folderId: folderId as string,
    sortType: 'BASIC' as const,
  };

  const { data, isLoading, isError } = useFetchFolderDetails(requestParams);

  const refinedData = data?.data;
  const folderData = refinedData?.folderDetailResponses ?? [];
  const linkData = refinedData?.linkDetailResponses ?? [];
  const { folderDataLength, linkDataLength } = usePageData(
    folderData,
    linkData
  );

  const folderName = refinedData?.targetFolderName;

  if (isError) {
    return <ErrorState message="폴더를 불러올 수 없습니다." />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <PageLayout>
      <PageHeaderSection pageTitle={folderName} folderId={folderId} />
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

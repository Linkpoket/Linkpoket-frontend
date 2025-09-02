import { lazy, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SharedPageHeaderSection from '@/components/page-layout-ui/SharedPageHeaderSection';
import { useFetchSharedPage } from '@/hooks/queries/useFetchSharedPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';

const SharedPageContentSection = lazy(
  () => import('@/components/page-layout-ui/SharedPageContentSection')
);

export default function SharedPage() {
  const { pageId } = useParams();

  const { data } = useFetchSharedPage(pageId as string);
  console.log('data', data);

  const refinedData = data?.data;
  const rootFolderId = refinedData?.rootFolderId;
  const pageTitle = refinedData?.pageTitle;

  const folderData = refinedData?.directoryDetailResponses ?? [];
  const linkData = refinedData?.siteDetailResponses ?? [];
  const folderDataLength = folderData?.length;
  const linkDataLength = linkData?.length;

  const [sortType, setSortType] = useState<string>('기본순');

  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();

  useEffect(() => {
    setPageInfo(pageId as string);

    return () => {
      if (rootFolderId) {
        setParentsFolderId(rootFolderId);
      }
    };
  }, [pageId, setPageInfo, setParentsFolderId, rootFolderId]);

  const handleSort = (selectedSortType: string) => {
    setSortType(selectedSortType);
  };

  return (
    <div className="bg-gray-5 flex h-screen min-w-[328px] flex-col px-[64px] py-[56px] xl:px-[102px]">
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
    </div>
  );
}

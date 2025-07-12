import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SharedPageContentSection from '@/components/page-layout-ui/SharedPageContentSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import SharedPageHeaderSection from '@/components/page-layout-ui/SharedPageHeaderSection';
import { useFetchSharedPage } from '@/hooks/queries/useFetchSharedPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';

export default function SharedPage() {
  const { pageId } = useParams();

  const { data } = useFetchSharedPage(pageId as string);
  console.log('data', data);

  const refinedData = data?.data;
  const rootFolderId = refinedData?.rootFolderId;
  const pageTitle = refinedData?.pageTitle;

  const folderData = refinedData?.directoryDetailRespons ?? [];
  const linkData = refinedData?.siteDetailResponses ?? [];
  const folderDataLength = folderData?.length;
  const linkDataLength = linkData?.length;

  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();

  useEffect(() => {
    setPageInfo(pageId as string);
    setParentsFolderId(rootFolderId);
  }, [pageId, setPageInfo, setParentsFolderId, rootFolderId]);

  return (
    <div className="flex h-screen min-w-[328px] flex-col px-[64px] py-[56px] xl:px-[102px]">
      <SharedPageHeaderSection
        pageTitle={pageTitle}
        pageId={pageId as string}
      />
      <PageControllerSection
        folderDataLength={folderDataLength}
        linkDataLength={linkDataLength}
      />
      <SharedPageContentSection folderData={folderData} linkData={linkData} />
    </div>
  );
}

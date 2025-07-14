import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import SharedPageContentSection from '@/components/page-layout-ui/SharedPageContentSection';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import useFetchFolderDetails from '@/hooks/queries/useFetchFolderDetails';

export default function FolderDetailPage() {
  const { pageId } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const { folderId } = useParams();

  const requestParams = {
    pageId,
    commandType: 'VIEW',
    folderId: folderId as string,
    sortType: 'BASIC',
  };

  const folderDetailsQuery = useFetchFolderDetails(requestParams);
  const refinedData = folderDetailsQuery.data?.data;
  const folderName = refinedData?.targetFolderName;
  const folderData = refinedData?.directoryDetailResponses ?? [];
  const linkData = refinedData?.siteDetailResponses ?? [];
  const folderDataLength = folderData?.length;
  const linkDataLength = linkData?.length;

  const targetFolderId = refinedData?.targetFolderId;

  useEffect(() => {
    setParentsFolderId(targetFolderId);
  }, [targetFolderId, setParentsFolderId]);

  return (
    <div className="flex h-screen min-w-[328px] flex-col px-[64px] py-[56px] xl:px-[102px]">
      <PageHeaderSection pageTitle={folderName} folderId={folderId} />
      <PageControllerSection
        folderDataLength={folderDataLength}
        linkDataLength={linkDataLength}
      />

      <SharedPageContentSection folderData={folderData} linkData={linkData} />
    </div>
  );
}

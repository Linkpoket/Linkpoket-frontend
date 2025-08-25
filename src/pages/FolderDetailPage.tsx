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

  const { data, isLoading, isError } = useFetchFolderDetails(requestParams);

  const refinedData = data?.data;
  const folderName = refinedData?.targetFolderName;
  const folderData = refinedData?.directoryDetailResponses ?? [];
  const linkData = refinedData?.siteDetailResponses ?? [];
  const folderDataLength = folderData?.length;
  const linkDataLength = linkData?.length;
  const targetFolderId = refinedData?.targetFolderId;

  useEffect(() => {
    return () => {
      if (targetFolderId) {
        setParentsFolderId(targetFolderId);
      }
    };
  }, [targetFolderId, setParentsFolderId]);

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-2 text-red-500">폴더를 불러올 수 없습니다.</p>
          <p className="text-sm text-gray-500">잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-5 flex h-screen min-w-[328px] flex-col px-[64px] py-[56px] xl:px-[102px]">
      <PageHeaderSection pageTitle={folderName} folderId={folderId} />
      <PageControllerSection
        folderDataLength={folderDataLength}
        linkDataLength={linkDataLength}
      />
      <SharedPageContentSection folderData={folderData} linkData={linkData} />
    </div>
  );
}

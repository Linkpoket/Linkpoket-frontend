import { lazy, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePageStore } from '@/stores/pageStore';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import useFetchFolderDetails from '@/hooks/queries/useFetchFolderDetails';

const SharedPageContentSection = lazy(
  () => import('@/components/page-layout-ui/SharedPageContentSection')
);

export default function FolderDetailPage() {
  const [sortType, setSortType] = useState<string>('기본순');

  const { pageId } = usePageStore();

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

  const handleSort = (selectedSortType: string) => {
    setSortType(selectedSortType);
  };

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

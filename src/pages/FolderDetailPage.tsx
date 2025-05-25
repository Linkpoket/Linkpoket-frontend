import { useEffect, useState } from 'react';
import { useMobile } from '@/hooks/useMobile';
import SharedPageContentSection from '@/components/page-layout-ui/SharedPageContentSection';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import useFetchFolderDetails from '@/hooks/queries/useFetchFolderDetails';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useParams } from 'react-router-dom';

export default function FolderDetailPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const { pageId } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();

  const isMobile = useMobile();
  const { folderId } = useParams();

  useEffect(() => {
    if (isMobile) {
      setView('list');
    }
  }, [isMobile]);

  const requestParams = {
    pageId,
    commandType: 'VIEW',
    folderId: Number(folderId),
    sortType: 'BASIC',
  };

  console.log('폴더 상세 요청 params:', requestParams);
  const folderDetailsQuery = useFetchFolderDetails(requestParams);

  useEffect(() => {
    setParentsFolderId(folderDetailsQuery.data?.data.targetFolderId);
  }, [folderDetailsQuery.data, setParentsFolderId]);

  console.log('폴더상세 페이지 정보', folderDetailsQuery.data?.data);

  return (
    <div className="flex h-screen flex-col">
      {/* HEADER SECTION*/}
      <PageHeaderSection
        pageTitle={folderDetailsQuery.data?.data.targetFolderName}
        pageDescription={folderDetailsQuery.data?.data.targetFolderDescription}
      />

      {/* Boundary line */}
      <div className="border-b-gray-30 mb-[40px] w-full border-b" />

      {/* CONTROLLER SECTION*/}
      <PageControllerSection view={view} setView={setView} />

      {/*CONTENT SECTION*/}
      <SharedPageContentSection
        view={view}
        contentData={folderDetailsQuery.data?.data}
      />
    </div>
  );
}

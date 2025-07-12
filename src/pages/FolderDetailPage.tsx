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
  // const { setParentsFolderId } = useParentsFolderIdStore();

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
    folderId: String(folderId),
    sortType: 'BASIC',
  };

  console.log('폴더 상세 요청 params:', requestParams);
  const folderDetailsQuery = useFetchFolderDetails(requestParams);

  console.log('폴더상세 페이지 정보', folderDetailsQuery.data?.data);

  return (
    <div className="flex h-screen min-w-[328px] flex-col px-[64px] py-[56px] xl:px-[102px]">
      <PageHeaderSection pageTitle="폴더1" folderId={1} />
      <PageControllerSection />

      <SharedPageContentSection
        view={view}
        contentData={folderDetailsQuery.data?.data}
      />
    </div>
  );
}

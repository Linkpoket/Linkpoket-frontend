import { useEffect, useState } from 'react';
import { useMobile } from '@/hooks/useMobile';
import SharedPageContentSection from '@/components/page-layout-ui/SharedPageContentSection';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import useFetchFolderDetails from '@/hooks/queries/useFetchFolderDetails';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useParams } from 'react-router-dom';
import { usePageSearch } from '@/hooks/usePageSearch';

export default function FolderDetailPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const { pageId } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const { searchKeyword, setSearchKeyword } = usePageSearch(pageId, 'TITLE');

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

  console.log('폴더상세 페이지 정보', folderDetailsQuery.data?.data);

  return (
    <div className="flex h-screen min-w-[328px] flex-col px-[64px] py-[56px] xl:px-[102px]">
      <PageHeaderSection pageTitle="폴더1" folderId={1} />
      <PageControllerSection />

      {/* 테스트 영역 */}
      <div className={`w-full overflow-y-auto`}>
        <div
          className={`grid w-full grid-cols-2 justify-center gap-x-2 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
        >
          {/* FolderCard혹은 LinkCard렌더링 */}
        </div>
      </div>
    </div>
  );
}

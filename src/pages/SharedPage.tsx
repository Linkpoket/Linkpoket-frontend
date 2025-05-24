import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMobile } from '@/hooks/useMobile';
import { useFetchSelectedPage } from '@/hooks/queries/useFetchSelectedPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import SharedPageContentSection from '@/components/page-layout-ui/SharedPageContentSection';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import useFetchSharedPageDashboard from '@/hooks/queries/useFetchSharedPageDashboard';
import useFetchSharedPageMember from '@/hooks/queries/useFetchSharedPageMember';

export default function SharedPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const isMobile = useMobile();

  useEffect(() => {
    if (isMobile) {
      setView('list');
    }
  }, [isMobile]);

  //만약 path param이 없다면 1로 간주하고, 있다면 그대로 꺼내와서 사용.
  const { pageId } = useParams();

  let resolvedPageId = 1;
  if (pageId) {
    resolvedPageId = parseInt(pageId);
  }

  // 클릭해서 들어간 페이지 정보 전역 변수로tj 저장
  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();

  const selectedPageQuery = useFetchSelectedPage({
    pageId: resolvedPageId,
    commandType: 'VIEW',
  });

  useEffect(() => {
    setPageInfo(resolvedPageId, 'VIEW');
    setParentsFolderId(selectedPageQuery.data?.data.rootFolderId);
  }, [resolvedPageId, setPageInfo, setParentsFolderId, selectedPageQuery.data]);

  console.log('선택한 페이지 데이터:', selectedPageQuery.data);
  console.log(
    '선택한 페이지 데이터 타이틀 이름:',
    selectedPageQuery.data?.data.pageTitle
  );
  console.log(
    '선택한 페이지 데이터 디렉토리 상세 정보:',
    selectedPageQuery.data?.data.directoryDetailRespons
  );

  //TODO: 해당 값을 통해서 현재 공유페이지의 정보 리스팅
  const sharedPageDashboardQuery = useFetchSharedPageDashboard({
    pageId: resolvedPageId,
    commandType: 'VIEW',
  });

  const sharedPageMemberQuery = useFetchSharedPageMember({
    pageId: resolvedPageId,
    commandType: 'VIEW',
  });

  console.log('페이지 대쉬보드 정보', sharedPageDashboardQuery.data);
  console.log('페이지 멤버 정보', sharedPageMemberQuery.data);

  return (
    <div className="flex h-screen flex-col">
      {/* HEADER SECTION*/}
      <PageHeaderSection
        pageTitle={selectedPageQuery.data?.data.pageTitle}
        pageDescription={selectedPageQuery.data?.data.pageDescription}
      />

      {/* Boundary line */}
      <div className="border-b-gray-30 mb-[40px] w-full border-b" />

      {/* CONTROLLER SECTION*/}
      <PageControllerSection view={view} setView={setView} />

      {/*CONTENT SECTION*/}
      <SharedPageContentSection
        view={view}
        contentData={selectedPageQuery.data?.data}
      />
    </div>
  );
}

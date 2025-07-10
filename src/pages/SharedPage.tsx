import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMobile } from '@/hooks/useMobile';
import { useFetchSelectedPage } from '@/hooks/queries/useFetchSharedPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import SharedPageContentSection from '@/components/page-layout-ui/SharedPageContentSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import useFetchSharedPageMember from '@/hooks/queries/useFetchSharedPageMember';
import { usePageSearch } from '@/hooks/usePageSearch';
import SharedPageHeaderSection from '@/components/page-layout-ui/SharedPageHeaderSection';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';

export default function SharedPage() {
  const { pageId } = useParams();
  const numericId = Number.parseInt(pageId ?? '', 10);
  const resolvedPageId = Number.isFinite(numericId) ? numericId : null;

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const isMobile = useMobile();

  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();

  // resolvedPageId가 null인 경우 usePageSearch 내부에서 문제가 발생할 수 있으므로,
  // 존재하지 않는 ID인 -1을 더미 값으로 사용해 안전하게 Hook을 호출함
  const { searchKeyword, setSearchKeyword, searchResult } = usePageSearch(
    resolvedPageId ?? -1,
    'TITLE'
  );
  const selectedPageQuery = useFetchSelectedPage({
    pageId: resolvedPageId ?? -1,
  });

  const sharedPageMemberQuery = useFetchSharedPageMember({
    pageId: resolvedPageId ?? -1,
  });

  console.log('페이지 멤버 정보', sharedPageMemberQuery.data);

  const selectedPage = selectedPageQuery.data?.data;

  useEffect(() => {
    if (isMobile) {
      setView('list');
    }
  }, [isMobile]);

  useEffect(() => {
    const rootFolderId = selectedPage?.rootFolderId;

    if (resolvedPageId !== null && rootFolderId) {
      setPageInfo(resolvedPageId, 'VIEW');
      setParentsFolderId(rootFolderId);
    }
  }, [
    resolvedPageId,
    selectedPage?.rootFolderId,
    setPageInfo,
    setParentsFolderId,
  ]);

  if (resolvedPageId === null) return <div>잘못된 접근입니다.</div>;

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

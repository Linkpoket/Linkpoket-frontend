import { lazy, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useMobile } from '@/hooks/useMobile';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import useFetchFolderDetails from '@/hooks/queries/useFetchFolderDetails';
import { getPageDataLength } from '@/utils/getPageDataLength';
import { PageLayout } from '@/components/common-ui/PageLayout';
import { useFetchPersonalPage } from '@/hooks/queries/useFetchPersonalPage';
import { useFetchSharedPage } from '@/hooks/queries/useFetchSharedPage';

const SharedPageFolderContentSection = lazy(
  () => import('@/components/page-layout-ui/SharedPageFolderContentSection')
);

export default function FolderDetailPage() {
  const { folderId: folderIdParam, pageId: urlPageId } = useParams();
  const folderId = folderIdParam ?? '';
  const isMobile = useMobile();
  const location = useLocation();
  const { pageId: storePageId } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const [sortType, setSortType] = useState<string>('기본순');

  // URL 경로를 기반으로 페이지 타입 판단
  const isSharedPageRoute =
    location.pathname.startsWith('/shared') && !!urlPageId;
  const actualPageId = urlPageId || storePageId;

  // 개인 페이지 이미지 가져오기
  const { data: personalPageData } = useFetchPersonalPage();

  // 공유 페이지 이미지 가져오기
  const { data: sharedPageData } = useFetchSharedPage(actualPageId || '');

  // 페이지 이미지 결정
  const pageImageUrl =
    isSharedPageRoute && sharedPageData?.pageImageUrl
      ? sharedPageData.pageImageUrl
      : personalPageData?.pageImageUrl || '';

  useEffect(() => {
    if (folderId) {
      setParentsFolderId(folderId);
    }
  }, [folderId, setParentsFolderId]);

  const requestParams = {
    pageId: actualPageId || '',
    commandType: 'VIEW' as const,
    folderId: folderId,
    sortType: 'BASIC' as const,
  };

  const { data } = useFetchFolderDetails(requestParams);

  const folderData = data.folderDetailResponses;
  const linkData = data.linkDetailResponses;
  const { folderDataLength, linkDataLength } = getPageDataLength(
    folderData,
    linkData
  );

  const folderName = data.targetFolderName;

  return (
    <PageLayout isMobile={isMobile} pageImageUrl={pageImageUrl}>
      <PageHeaderSection
        pageTitle={folderName}
        pageId={actualPageId || ''}
        folderId={folderId}
        isMobile={isMobile}
      />
      <PageControllerSection
        folderDataLength={folderDataLength}
        linkDataLength={linkDataLength}
        sortType={sortType}
        setSortType={setSortType}
        isMobile={isMobile}
      />
      <SharedPageFolderContentSection
        folderData={folderData}
        linkData={linkData}
        sortType={sortType}
        isMobile={isMobile}
        pageImageUrl={pageImageUrl}
      />
    </PageLayout>
  );
}

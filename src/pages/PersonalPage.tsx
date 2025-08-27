import { useEffect, useState } from 'react';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PersonalPageContentSection from '@/components/page-layout-ui/PersonalPageContentSection';
import { useFetchPersonalPage } from '@/hooks/queries/useFetchPersonalPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useUserStore } from '@/stores/userStore';

export default function PersonalPage() {
  const { data } = useFetchPersonalPage();
  console.log('useFetchPersonalPage의 응답', data);
  console.log('pageDetails', data);
  const refinedData = data?.data.pageDetails;

  console.log('refinedData:', refinedData);

  const pageId = refinedData?.pageId;
  const rootFolderId = refinedData?.rootFolderId;
  const pageTitle = refinedData?.pageTitle;

  const folderData = refinedData?.directoryDetailResponses ?? [];
  const linkData = refinedData?.siteDetailResponses ?? [];
  const folderDataLength = folderData?.length;
  const linkDataLength = linkData?.length;
  const memberData = data?.data.member;

  const [sortType, setSortType] = useState<string>('기본순');

  const { setUser } = useUserStore();
  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();

  useEffect(() => {
    setPageInfo(pageId);
    if (rootFolderId) {
      setParentsFolderId(rootFolderId);
    }

    if (memberData) {
      setUser(memberData.nickName, memberData.email, memberData.colorCode);
    }

    if (data?.data.pageDetails) {
      localStorage.setItem(
        'personalPageData',
        JSON.stringify({
          data,
          lastUpdated: new Date().toISOString(),
        })
      );
    }
  }, [
    pageId,
    rootFolderId,
    setPageInfo,
    setParentsFolderId,
    setUser,
    memberData?.nickName,
    memberData?.email,
    memberData?.colorCode,
    data,
    memberData,
  ]);

  const handleSort = (selectedSortType: string) => {
    setSortType(selectedSortType);
  };

  console.log('folderData:', folderData);

  return (
    <div className="bg-gray-5 flex h-screen min-w-[328px] flex-col px-[64px] py-[56px] xl:px-[102px]">
      <PageHeaderSection pageTitle={pageTitle} />
      <PageControllerSection
        folderDataLength={folderDataLength}
        linkDataLength={linkDataLength}
        onSortChange={handleSort}
      />
      <PersonalPageContentSection
        folderData={folderData}
        linkData={linkData}
        sortType={sortType}
      />
    </div>
  );
}

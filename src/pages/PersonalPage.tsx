import { useEffect } from 'react';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PersonalPageContentSection from '@/components/page-layout-ui/PersonalPageContentSection';
import { useFetchPersonalPage } from '@/hooks/queries/useFetchPersonalPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useUserStore } from '@/stores/userStore';

export default function PersonalPage() {
  const { data } = useFetchPersonalPage();
  console.log('pageDetails', data);
  const refinedData = data?.data.pageDetails;

  console.log('refinedData:', refinedData);

  const pageId = refinedData?.pageId;
  const rootFolderId = refinedData?.rootFolderId;

  const pageTitle = refinedData?.pageTitle;

  const folderData = refinedData?.directoryDetailRespons ?? [];
  const linkData = refinedData?.siteDetailResponses ?? [];
  const folderDataLength = folderData?.length;
  const linkDataLength = linkData?.length;
  const memberData = data?.data.member;
  console.log('memberData', memberData);

  const { setUser } = useUserStore();
  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();

  useEffect(() => {
    setPageInfo(pageId);
    setParentsFolderId(rootFolderId);
    setUser(memberData?.nickName, memberData?.email, memberData?.colorCode);

    if (data?.data.pageDetails) {
      localStorage.setItem(
        'personalPageData',
        JSON.stringify({
          data,
          lastUpdated: new Date().toISOString(),
        })
      );
    }

    if (memberData) {
      setUser(memberData.nickName, memberData.email, memberData.colorCode);
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

  return (
    <div className="flex h-screen min-w-[328px] flex-col px-[64px] py-[56px] xl:px-[102px]">
      <PageHeaderSection pageTitle={pageTitle} />
      <PageControllerSection
        folderDataLength={folderDataLength}
        linkDataLength={linkDataLength}
      />
      <PersonalPageContentSection folderData={folderData} linkData={linkData} />
    </div>
  );
}

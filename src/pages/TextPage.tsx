import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import LinkCard from '@/components/common-ui/LinkCard';
import { useState } from 'react';
import FolderCard from '@/components/common-ui/FolderCard';

export default function TextPage() {
  const [isBookmark, setIsBookmark] = useState(false);
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

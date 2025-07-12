import { useParams } from 'react-router-dom';
import SharedPageContentSection from '@/components/page-layout-ui/SharedPageContentSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import SharedPageHeaderSection from '@/components/page-layout-ui/SharedPageHeaderSection';
export default function SharedPage() {
  const { pageId } = useParams();

  return (
    <div className="flex h-screen min-w-[328px] flex-col px-[64px] py-[56px] xl:px-[102px]">
      <SharedPageHeaderSection />
      <PageControllerSection />

      <SharedPageContentSection />
    </div>
  );
}

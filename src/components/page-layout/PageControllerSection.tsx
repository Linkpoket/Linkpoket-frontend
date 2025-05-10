import FolderIcon from '@/assets/widget-ui-assets/FolderIcon.svg?react';
import SiteIcon from '@/assets/widget-ui-assets/SiteIcon.svg?react';
import { Button } from '@/components/common-ui/button';
import { SearchBar } from '@/components/common-ui/SearchBar';
import { ViewToggle } from '@/components/common-ui/ViewToggle';
import PageSortBox from './PageSortBox';
import { PageControllerSectionProps } from '@/types/pageItems';

export default function PageControllerSection({
  view,
  setView,
}: PageControllerSectionProps) {
  return (
    <div className="flex flex-col justify-between gap-[16px] px-[64px] xl:flex-row xl:gap-0">
      <div className="flex h-[48px] gap-[12px]">
        <Button variant="ghost" size="md" className="flex gap-[6px]">
          <FolderIcon />
          폴더 추가
        </Button>
        <Button variant="ghost" size="md" className="flex gap-[6px]">
          <SiteIcon />
          링크 추가
        </Button>
      </div>
      <div className="flex gap-[12px]">
        <SearchBar size="fixed" placeholder="폴더, 링크 검색" />
        <PageSortBox />
        <div className="hidden lg:block">
          <ViewToggle selectedView={view} onChange={setView} />
        </div>
      </div>
    </div>
  );
}

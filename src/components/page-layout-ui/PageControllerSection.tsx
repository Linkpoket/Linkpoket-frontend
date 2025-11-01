import { PageControllerSectionProps } from '@/types/pages';
import DropDownView from '../common-ui/DropDownView';
import { useMobile } from '@/hooks/useMobile';
import { Search } from '../common-ui/Search';
import { useLocation } from 'react-router-dom';
import { usePageSearch } from '@/hooks/usePageSearch';

export default function PageControllerSection({
  folderDataLength = 0,
  linkDataLength = 0,
  onSortChange,
}: PageControllerSectionProps) {
  const isMobile = useMobile();
  const pathName = useLocation().pathname;
  const { searchKeyword, handleSearchChange, handleClear } = usePageSearch();

  const showSearch = pathName !== '/signup' && pathName !== '/login';

  return (
    <div className="mb-2 flex h-[42px] items-center justify-between">
      {!isMobile && (
        <div className="text-[14px] font-[500] text-gray-50">
          {folderDataLength}개의 폴더 | {linkDataLength}개의 링크
        </div>
      )}
      {isMobile && showSearch && (
        <Search
          placeholder="폴더 또는 링크 검색"
          value={searchKeyword}
          onChange={handleSearchChange}
          onClear={handleClear}
        />
      )}
      <DropDownView onChange={onSortChange} />
    </div>
  );
}

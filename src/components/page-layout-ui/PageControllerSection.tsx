import { PageControllerSectionProps } from '@/types/pages';
import DropDownView from '../common-ui/DropDownView';
import { Search } from '../common-ui/Search';
import { useLocation } from 'react-router-dom';
import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageStore, useFileListViewStore } from '@/stores/pageStore';
import { useFolderColorStore } from '@/stores/folderColorStore';
import FloatingFileIcon from '@/assets/common-ui-assets/FloatingFileIcon.svg?react';

export default function PageControllerSection({
  folderDataLength = 0,
  linkDataLength = 0,
  sortType,
  setSortType,
  isMobile,
}: PageControllerSectionProps & { isMobile: boolean }) {
  const pathName = useLocation().pathname;
  const { searchKeyword, handleSearchChange, handleClear } = usePageSearch();
  const { pageId } = usePageStore();
  const { showFilesOnly, toggleFileListView } = useFileListViewStore();
  const { getCurrentColor } = useFolderColorStore();
  const currentFolderColor = getCurrentColor();

  const showSearch = pathName !== '/signup' && pathName !== '/login';

  return (
    <div
      className="mb-2 flex h-[42px] items-center justify-between"
      style={isMobile ? { marginBottom: '24px' } : undefined}
    >
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
      <div className="flex items-center gap-2">
        {/* 파일 선택 버튼 - 원형 버튼 */}
        {pageId && !isMobile && (
          <button
            onClick={toggleFileListView}
            className={`relative flex h-[42px] w-[42px] items-center justify-center rounded-full border transition-all hover:border-gray-400 ${
              showFilesOnly ? 'border-gray-300' : 'border-gray-300 bg-white'
            }`}
            style={
              showFilesOnly
                ? {
                    backgroundColor: currentFolderColor.previewColor,
                    borderColor: currentFolderColor.previewColor,
                  }
                : {}
            }
            aria-label="파일 필터"
          >
            <FloatingFileIcon
              className="h-[21px] w-[21px]"
              stroke={showFilesOnly ? '#FFFFFF' : '#000000'}
            />
          </button>
        )}
        <DropDownView sortType={sortType} setSortType={setSortType} />
      </div>
    </div>
  );
}

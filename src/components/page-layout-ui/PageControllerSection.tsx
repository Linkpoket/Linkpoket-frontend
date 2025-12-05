import { useState } from 'react';
import { PageControllerSectionProps } from '@/types/pages';
import DropDownView from '../common-ui/DropDownView';
import { Search } from '../common-ui/Search';
import { useLocation } from 'react-router-dom';
import { usePageSearch } from '@/hooks/usePageSearch';
import { Button } from '../common-ui/button';
import { useFolderColorStore } from '@/stores/folderColorStore';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import FileListSection from '../file-list/FileListSection';

export default function PageControllerSection({
  folderDataLength = 0,
  linkDataLength = 0,
  onSortChange,
  isMobile,
}: PageControllerSectionProps & { isMobile: boolean }) {
  const pathName = useLocation().pathname;
  const { searchKeyword, handleSearchChange, handleClear } = usePageSearch();
  const { pageId } = usePageStore();
  const { parentsFolderId } = useParentsFolderIdStore();
  const { getCurrentColor } = useFolderColorStore();
  const currentFolderColor = getCurrentColor();
  const [showFileList, setShowFileList] = useState(false);

  const showSearch = pathName !== '/signup' && pathName !== '/login';

  return (
    <>
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
          {/* 파일 목록 보기 버튼 - 정렬 버튼 바로 왼쪽 */}
          {pageId && (
            <Button
              size="sm"
              style={{
                borderColor: '#000000',
                color: '#000000',
              }}
              className="rounded-lg border-2 bg-white text-sm font-medium transition-colors"
              onClick={() => setShowFileList(!showFileList)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              {showFileList ? '▼ 파일 목록' : '▶ 파일 목록'}
            </Button>
          )}
          <DropDownView onChange={onSortChange} />
        </div>
      </div>
      {/* 파일 목록 */}
      {showFileList && pageId && (
        <div className="mb-4">
          <FileListSection
            pageId={pageId}
            folderId={parentsFolderId || undefined}
          />
        </div>
      )}
    </>
  );
}

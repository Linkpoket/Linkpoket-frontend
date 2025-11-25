import { useState, useEffect } from 'react';
import { useModalStore } from '@/stores/modalStore';
import { useLocation } from 'react-router-dom';
import { useUpdateTitle } from '@/hooks/useUpdateTitle';
import { useFolderColorStore } from '@/stores/folderColorStore';
import { Button } from '../common-ui/button';

type PageHeaderSectionProps = {
  pageTitle: string;
  pageId?: string;
  folderId?: string;
};

const MAX_TITLE_LENGTH = 12;

export default function PageHeaderSection({
  pageTitle,
  pageId,
  folderId,
  isMobile,
}: PageHeaderSectionProps & { isMobile: boolean }) {
  const [title, setTitle] = useState(pageTitle ?? '');
  const { debouncedUpdate, handleBlur } = useUpdateTitle(
    folderId,
    title,
    folderId
      ? undefined
      : {
          pageId,
          isPageTitle: true,
        }
  );
  const { openLinkModal, openFolderModal } = useModalStore();
  const { getCurrentColor } = useFolderColorStore();
  const currentFolderColor = getCurrentColor();
  const location = useLocation();
  const currentLocation = location.pathname;
  const isLinkButtonVisible = currentLocation !== '/bookmarks';

  useEffect(() => {
    setTitle(pageTitle ?? '');
  }, [pageTitle]);

  return (
    <div className="mb-[24px] flex w-full min-w-[328px] items-center justify-between">
      <div className="flex w-full">
        {isMobile ? (
          // 모바일에서는 타이틀 숨김 (MobilePageBackground에서 표시)
          <div className="hidden"></div>
        ) : (
          <input
            id="page-title"
            type="text"
            disabled={title === '개인 페이지' || title === '북마크'}
            value={title}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= MAX_TITLE_LENGTH) {
                setTitle(value);
                debouncedUpdate({ title: value });
              }
            }}
            onBlur={() => {
              handleBlur(title);
            }}
            className="outline-nontext-gray-90 inline-block w-full text-[22px] font-bold"
          />
        )}
        {isLinkButtonVisible && (
          <div
            className={`flex items-center gap-[8px] ${isMobile ? 'hidden' : ''}`}
          >
            <Button
              size="sm"
              style={{
                borderColor: currentFolderColor.previewColor,
                color: currentFolderColor.previewColor,
              }}
              className="responsive-button rounded-lg border-2 bg-white text-sm font-medium whitespace-nowrap transition-colors"
              onClick={openLinkModal}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${currentFolderColor.previewColor}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.backgroundColor = `${currentFolderColor.previewColor}25`;
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.backgroundColor = `${currentFolderColor.previewColor}15`;
              }}
            >
              + 링크추가
            </Button>
            <Button
              size="sm"
              variant="forHeader"
              style={{
                borderColor: currentFolderColor.previewColor,
                color: currentFolderColor.previewColor,
              }}
              className="responsive-button rounded-lg border-2 bg-white text-sm font-medium whitespace-nowrap transition-colors"
              onClick={openFolderModal}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${currentFolderColor.previewColor}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.backgroundColor = `${currentFolderColor.previewColor}25`;
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.backgroundColor = `${currentFolderColor.previewColor}15`;
              }}
            >
              + 폴더추가
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

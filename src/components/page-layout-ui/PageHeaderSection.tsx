import { useState } from 'react';
import { useModalStore } from '@/stores/modalStore';
import { useLocation } from 'react-router-dom';
import { useUpdateTitle } from '@/hooks/useUpdateTitle';
import { useFolderColorStore } from '@/stores/folderColorStore';
import { useMobile } from '@/hooks/useMobile';
import { Button } from '../common-ui/button';

type PageHeaderSectionProps = {
  pageTitle: string;
  folderId?: string;
};

const MAX_TITLE_LENGTH = 12;

export default function PageHeaderSection({
  pageTitle,
  folderId,
}: PageHeaderSectionProps) {
  const [title, setTitle] = useState(pageTitle ?? '');
  const { debouncedUpdate, handleBlur } = useUpdateTitle(folderId, title);
  const { openLinkModal, openFolderModal } = useModalStore();
  const { getCurrentColor } = useFolderColorStore();
  const currentFolderColor = getCurrentColor();
  const location = useLocation();
  const currentLocation = location.pathname;
  const isLinkButtonVisible = currentLocation !== '/bookmarks';
  const isMobile = useMobile();

  return (
    <div className="mb-[24px] flex w-full items-center justify-between md:min-w-[328px]">
      <div className="flex w-full">
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
              className="rounded-lg border-2 bg-white text-sm font-medium whitespace-nowrap transition-colors"
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
              className="rounded-lg border-2 bg-white text-sm font-medium whitespace-nowrap transition-colors"
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

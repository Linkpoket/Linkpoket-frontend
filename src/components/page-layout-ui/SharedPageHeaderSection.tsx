import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import useUpdateSharedPageTitle from '@/hooks/mutations/useUpdateSharedPageTitle';
import { useModalStore } from '@/stores/modalStore';
import { useLocation } from 'react-router-dom';
import { useMobile } from '@/hooks/useMobile';
import { useFolderColorStore } from '@/stores/folderColorStore';
import { Button } from '../common-ui/button';

type PageHeaderSectionProps = {
  pageTitle: string;
  pageId: string;
};

const MAX_TITLE_LENGTH = 12;

export default function SharedPageHeaderSection({
  pageTitle,
  pageId,
}: PageHeaderSectionProps) {
  const [title, setTitle] = useState(pageTitle ?? '');
  const lastUpdateTitle = useRef({ title });

  const location = useLocation();
  const currentLocation = location.pathname;
  const isLinkButtonVisible = currentLocation !== '/bookmarks';
  const isMobile = useMobile();

  const { openLinkModal, openFolderModal } = useModalStore();
  const { getCurrentColor } = useFolderColorStore();
  const currentFolderColor = getCurrentColor();

  const { mutate: updateSharedPageTitle } = useUpdateSharedPageTitle(pageId);

  const updateSharedPageTitleImmediately = () => {
    if (!pageId) return;

    const updateSharedPageTitleData = {
      baseRequest: { pageId, commandType: 'EDIT' as const },
      pageTitle: title,
    };

    updateSharedPageTitle(updateSharedPageTitleData, {
      onSuccess: () => {
        lastUpdateTitle.current = { title };
      },
      onError: (error) => {
        console.error('설명 업데이트 실패:', error);
      },
    });
  };

  const handleDebouncedUpdate = (data: { title: string }) => {
    lastUpdateTitle.current = { title: data.title };
  };

  const debouncedUpdate = useDebounce(handleDebouncedUpdate, 500);

  useEffect(() => {
    setTitle(pageTitle ?? '');
    const newTitleState = {
      title: pageTitle ?? '',
    };

    lastUpdateTitle.current = newTitleState;
  }, [pageTitle]);

  const handleBlur = () => {
    const currentTitleState = { title };
    lastUpdateTitle.current = currentTitleState;
    updateSharedPageTitleImmediately();
  };

  return (
    <div className="mb-[24px] flex w-full min-w-[328px] items-center justify-between">
      <div className="flex w-full">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= MAX_TITLE_LENGTH) {
              setTitle(value);
              debouncedUpdate({ title: value });
            }
          }}
          onBlur={() => {
            handleBlur();
          }}
          className={`outline-nonetext-gray-90' } inline-block w-full text-[22px] font-bold`}
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

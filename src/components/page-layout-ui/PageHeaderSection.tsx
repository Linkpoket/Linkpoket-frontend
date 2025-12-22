import { useState, useEffect } from 'react';
import { useUpdateTitle } from '@/hooks/useUpdateTitle';

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
      </div>
    </div>
  );
}

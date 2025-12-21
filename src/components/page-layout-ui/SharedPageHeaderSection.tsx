import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import useUpdateSharedPageTitle from '@/hooks/mutations/useUpdateSharedPageTitle';
import toast from 'react-hot-toast';

type PageHeaderSectionProps = {
  pageTitle: string;
  pageId: string;
};

const MAX_TITLE_LENGTH = 12;

export default function SharedPageHeaderSection({
  pageTitle,
  pageId,
  isMobile,
}: PageHeaderSectionProps & { isMobile: boolean }) {
  const [title, setTitle] = useState(pageTitle ?? '');
  const lastUpdateTitle = useRef({ title });

  const { mutate: updateSharedPageTitle } = useUpdateSharedPageTitle(pageId);

  const updateSharedPageTitleImmediately = () => {
    if (!pageId) return;

    const updateSharedPageTitleData = {
      baseRequest: { pageId, commandType: 'EDIT' },
      pageTitle: title,
    };

    updateSharedPageTitle(updateSharedPageTitleData, {
      onSuccess: () => {
        lastUpdateTitle.current = { title };
      },
      onError: (error) => {
        console.error('설명 업데이트 실패:', error);
        toast.error(
          error instanceof Error
            ? error.message
            : '페이지 제목 업데이트에 실패했습니다.'
        );
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
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import useUpdateSharedPageTitle from '@/hooks/mutations/useUpdateSharedPageTitle';
import { Button } from '../common-ui/button';
import { useModalStore } from '@/stores/modalStore';

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
  const [isFocused, setIsFocused] = useState<'title' | null>(null);
  const lastUpdateTitle = useRef({ title });
  const { openLinkModal } = useModalStore();
  const { mutate: updateSharedPageTitle } = useUpdateSharedPageTitle(pageId);

  const updateSharedPageTitleImmediately = () => {
    if (!pageId) return;

    const updateSharedPageTitleData = {
      baseRequest: { pageId, commandType: 'EDIT' },
      pageTitle: title,
    };

    updateSharedPageTitle(updateSharedPageTitleData, {
      onSuccess: (response) => {
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
      <div className="relative w-full">
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
          onFocus={() => {
            setIsFocused('title');
          }}
          onBlur={(e) => {
            setIsFocused(null);
            handleBlur();
          }}
          className={`inline-block text-[22px] font-bold outline-none ${
            isFocused === 'title' ? 'text-gray-100' : 'text-gray-90'
          }`}
        />
      </div>
      <div className="hidden md:block">
        <Button size="sm" className="whitespace-nowrap" onClick={openLinkModal}>
          + 링크추가
        </Button>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import useUpdateSharedPageTitle from '@/hooks/mutations/useUpdateSharedPageTitle';
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
  const [isFocused, setIsFocused] = useState<'title' | null>(null);
  const lastUpdateTitle = useRef({ title });
  const { mutate: updateSharedPageTitle } = useUpdateSharedPageTitle(pageId);

  const updateSharedPageTitleImmediately = () => {
    if (!pageId) return;

    const updateSharedPageTitleData = {
      baseRequest: { pageId, commandType: 'EDIT' },
      pageTitle: title,
    };

    console.log('타이틀업데이트', updateSharedPageTitleData);

    updateSharedPageTitle(updateSharedPageTitleData, {
      onSuccess: (response) => {
        console.log('타이틀 성공 응답:', response);
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

  // 초기 마운트 시에만 props로 상태 초기화
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
            console.log('title input focus');
            setIsFocused('title');
          }}
          onBlur={(e) => {
            console.log('title input blur', e.target.value);
            setIsFocused(null);
            handleBlur();
          }}
          className={`inline-block text-[22px] font-bold outline-none ${
            isFocused === 'title' ? 'text-gray-100' : 'text-gray-90'
          }`}
        />
      </div>
      <div>
        <Button size="sm" className="whitespace-nowrap">
          + 링크추가
        </Button>
      </div>
    </div>
  );
}

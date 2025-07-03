import { useState, useEffect, useRef } from 'react';
import { usePageStore } from '@/stores/pageStore';
import { useDebounce } from '@/hooks/useDebounce';
import useUpdateSharedPageTitle from '@/hooks/mutations/useUpdateSharedPageTitle';
import useUpdateSharedPageDescription from '@/hooks/mutations/useUpdateSharedPageDescription';

type PageHeaderSectionProps = {
  pageTitle: string;
  pageDescription: string;
};

const MAX_TITLE_LENGTH = 21;
const MAX_DESCRIPTION_LENGTH = 500;

export default function SharedPageHeaderSection({
  pageTitle,
  pageDescription,
}: PageHeaderSectionProps) {
  const [title, setTitle] = useState(pageTitle ?? '');
  const [description, setDescription] = useState(pageDescription ?? '');
  const [isFocused, setIsFocused] = useState<'title' | 'description' | null>(
    null
  );
  const lastUpdateTitle = useRef({ title });
  const lastUpdateDescription = useRef({ description });

  const { pageId } = usePageStore();
  const { mutate: updateSharedPageTitle } = useUpdateSharedPageTitle(pageId);
  const { mutate: updateSharedPageDescription } =
    useUpdateSharedPageDescription(pageId);

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
        lastUpdateDescription.current = { description };
      },
      onError: (error) => {
        console.error('설명 업데이트 실패:', error);
      },
    });
  };

  const updateSharedPageDescriptionImmediately = () => {
    if (!pageId) return;

    const updateSharedPageDescriptionData = {
      baseRequest: { pageId, commandType: 'EDIT' },
      pageDescription: description,
    };

    console.log('설명업데이트', updateSharedPageDescriptionData);

    updateSharedPageDescription(updateSharedPageDescriptionData, {
      onSuccess: (response) => {
        console.log('설명 업데이트 성공 응답:', response);
        lastUpdateTitle.current = { title };
        lastUpdateDescription.current = { description };
      },
      onError: (error) => {
        console.error('설명 업데이트 실패:', error);
      },
    });
  };

  const handleDebouncedUpdate = (data: {
    title: string;
    description: string;
  }) => {
    lastUpdateTitle.current = { title: data.title };
    lastUpdateDescription.current = { description: data.description };
  };

  const debouncedUpdate = useDebounce(handleDebouncedUpdate, 500);

  // 초기 마운트 시에만 props로 상태 초기화
  useEffect(() => {
    setTitle(pageTitle ?? '');
    setDescription(pageDescription ?? '');
    const newTitleState = {
      title: pageTitle ?? '',
    };
    const newDescriptionState = {
      description: pageDescription ?? '',
    };
    lastUpdateTitle.current = newTitleState;
    lastUpdateDescription.current = newDescriptionState;
  }, [pageTitle, pageDescription]);

  const handleBlur = () => {
    const currentTitleState = { title };
    const currentDescriptionState = { description };
    lastUpdateTitle.current = currentTitleState;
    lastUpdateDescription.current = currentDescriptionState;
    updateSharedPageTitleImmediately();
    updateSharedPageDescriptionImmediately();
  };

  return (
    <div className="mx-auto flex w-full max-w-[1180px] min-w-[328px] flex-col gap-[8px] px-[64px] py-[24px]">
      <div className="relative w-full">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= MAX_TITLE_LENGTH) {
              setTitle(value);
              debouncedUpdate({ title: value, description });
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
          className={`inline-block text-[24px] font-bold outline-none ${
            isFocused === 'title' ? 'text-gray-100' : 'text-gray-90'
          }`}
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= MAX_DESCRIPTION_LENGTH) {
              setDescription(value);
              debouncedUpdate({ title, description: value });
            }
          }}
          onFocus={() => {
            console.log('description textarea focus');
            setIsFocused('description');
          }}
          onBlur={(e) => {
            console.log('description textarea blur', e.target.value);
            setIsFocused(null);
            handleBlur();
          }}
          className={`max-h-[98px] w-full resize-none overflow-y-auto text-[16px] font-[400] outline-none ${
            isFocused === 'description' ? 'text-gray-100' : 'text-gray-70'
          }`}
        />
      </div>
    </div>
  );
}

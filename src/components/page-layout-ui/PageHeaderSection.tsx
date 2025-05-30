import { useState, useEffect, useRef } from 'react';
import { usePageStore } from '@/stores/pageStore';
import useUpdateFolder from '@/hooks/mutations/useUpdateFolder';
import { useDebounce } from '@/hooks/useDebounce';

type PageHeaderSectionProps = {
  pageTitle: string;
  pageDescription: string;
  folderId?: number;
};

type FolderUpdateData = {
  title: string;
  description: string;
};

const MAX_TITLE_LENGTH = 21;
const MAX_DESCRIPTION_LENGTH = 500;
const DEBOUNCE_DELAY = 200;

export default function PageHeaderSection({
  pageTitle,
  pageDescription,
  folderId,
}: PageHeaderSectionProps) {
  const [title, setTitle] = useState(pageTitle ?? '');
  const [description, setDescription] = useState(pageDescription ?? '');
  const [isFocused, setIsFocused] = useState<'title' | 'description' | null>(
    null
  );
  const lastUpdateRef = useRef<FolderUpdateData>({ title, description });

  const { pageId } = usePageStore();
  const { mutate: updateFolder } = useUpdateFolder(pageId);

  const updateFolderImmediately = (data: FolderUpdateData) => {
    console.log('updateFolderImmediately called with:', data);
    console.log('folderId:', folderId, 'pageId:', pageId);

    if (!folderId) return;

    const updateData = {
      baseRequest: { pageId, commandType: 'EDIT' },
      folderId,
      folderName: title,
      folderDescription: description,
    };

    console.log('서버로 전송할 데이터:', updateData);

    updateFolder(updateData, {
      onSuccess: (response) => {
        console.log('폴더 업데이트 성공 응답:', response);
        console.log('업데이트된 데이터:', { title, description });
        lastUpdateRef.current = { title, description };
      },
      onError: (error) => {
        console.error('폴더 업데이트 실패:', error);
        console.log('업데이트 실패로 현재 상태 유지:', { title, description });
      },
    });
  };

  const handleDebouncedUpdate = (data: FolderUpdateData) => {
    console.log('디바운스된 업데이트:', data);
    lastUpdateRef.current = { title, description };
  };

  const debouncedUpdate = useDebounce<FolderUpdateData>(
    handleDebouncedUpdate,
    DEBOUNCE_DELAY
  );

  // 초기 마운트 시에만 props로 상태 초기화
  useEffect(() => {
    console.log('초기 마운트 상태 초기화:', { pageTitle, pageDescription });
    setTitle(pageTitle ?? '');
    setDescription(pageDescription ?? '');
    const newState = {
      title: pageTitle ?? '',
      description: pageDescription ?? '',
    };
    lastUpdateRef.current = newState;
  }, [pageTitle, pageDescription]);

  // 언마운트 시 마지막 상태 서버에 저장
  useEffect(() => {
    return () => {
      console.log('언마운트 시 마지막 상태 저장:', lastUpdateRef.current);
      updateFolderImmediately(lastUpdateRef.current);
    };
  }, []);

  const handleBlur = () => {
    console.log('포커스 아웃:', {
      current: { title, description },
    });

    const currentState = { title, description };
    lastUpdateRef.current = currentState;
    updateFolderImmediately(currentState);
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

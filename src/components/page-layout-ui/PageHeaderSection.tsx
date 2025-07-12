import { useState, useEffect, useRef } from 'react';
import { usePageStore } from '@/stores/pageStore';
import useUpdateFolder from '@/hooks/mutations/useUpdateFolder';
import { useDebounce } from '@/hooks/useDebounce';
import { Button } from '../common-ui/button';

type PageHeaderSectionProps = {
  pageTitle: string;
  folderId?: string;
};

type FolderUpdateData = {
  title: string;
};

const MAX_TITLE_LENGTH = 12;

export default function PageHeaderSection({
  pageTitle,
  folderId,
}: PageHeaderSectionProps) {
  const [title, setTitle] = useState(pageTitle ?? '');
  const [isFocused, setIsFocused] = useState<'title' | null>(null);
  const lastUpdateRef = useRef<FolderUpdateData>({ title });

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
    };

    updateFolder(updateData, {
      onSuccess: (response) => {
        console.log('폴더 업데이트 성공 응답:', response);
        lastUpdateRef.current = { title };
      },
      onError: (error) => {
        console.error('폴더 업데이트 실패:', error);
      },
    });
  };

  const handleDebouncedUpdate = (data: FolderUpdateData) => {
    console.log('디바운스된 업데이트:', data);
    lastUpdateRef.current = { title };
  };

  const debouncedUpdate = useDebounce<FolderUpdateData>(
    handleDebouncedUpdate,
    500
  );

  // 초기 마운트 시에만 props로 상태 초기화
  useEffect(() => {
    console.log('초기 마운트 상태 초기화:', { pageTitle });
    setTitle(pageTitle ?? '');
    const newState = {
      title: pageTitle ?? '',
    };
    lastUpdateRef.current = newState;
  }, [pageTitle]);

  const handleBlur = () => {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath === '/bookmarks') {
      return;
    }

    console.log('포커스 아웃:', {
      current: { title },
    });

    const currentState = { title };
    lastUpdateRef.current = currentState;
    updateFolderImmediately(currentState);
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

import { useState, useEffect, useRef } from 'react';
import { usePageStore } from '@/stores/pageStore';
import useUpdateFolder from '@/hooks/mutations/useUpdateFolder';
import { useDebounce } from '@/hooks/useDebounce';
import { Button } from '../common-ui/button';
import { useModalStore } from '@/stores/modalStore';
import { useLocation } from 'react-router-dom';

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
  const { openLinkModal } = useModalStore();
  const location = useLocation();
  const currentLocation = location.pathname;
  const isLinkButtonVisible = currentLocation !== '/bookmarks';

  const { pageId } = usePageStore();
  const { mutate: updateFolder } = useUpdateFolder(pageId);

  const updateFolderImmediately = () => {
    if (!folderId) return;

    const updateData = {
      baseRequest: { pageId: pageId as string, commandType: 'EDIT' },
      folderId,
      folderName: title,
    };

    updateFolder(updateData, {
      onSuccess: () => {
        lastUpdateRef.current = { title };
      },
      onError: (error) => {
        console.error('폴더 업데이트 실패:', error);
      },
    });
  };

  const handleDebouncedUpdate = (data: FolderUpdateData) => {
    lastUpdateRef.current = { title };
  };

  const debouncedUpdate = useDebounce<FolderUpdateData>(
    handleDebouncedUpdate,
    500
  );

  useEffect(() => {
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

    const currentState = { title };
    lastUpdateRef.current = currentState;
    updateFolderImmediately();
  };

  return (
    <div className="mb-[24px] flex w-full min-w-[328px] items-center justify-between">
      <div className="relative w-full">
        <input
          id="page-title"
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
      <div className="hidden md:block">
        {isLinkButtonVisible && (
          <Button
            size="sm"
            className="whitespace-nowrap"
            onClick={openLinkModal}
          >
            + 링크추가
          </Button>
        )}
      </div>
    </div>
  );
}

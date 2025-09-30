import { useRef } from 'react';
import { usePageStore } from '@/stores/pageStore';
import useUpdateFolder from '@/hooks/mutations/useUpdateFolder';
import { useDebounce } from '@/hooks/useDebounce';

type TitleUpdate = {
  title: string;
};

export function useUpdateTitle(folderId?: string, initialTitle: string = '') {
  const lastUpdateRef = useRef({ title: initialTitle });
  const { pageId } = usePageStore();
  const { mutate: updateFolder } = useUpdateFolder(pageId);

  const updateFolderImmediately = (title: string) => {
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

  const handleDebouncedUpdate = (update: TitleUpdate) => {
    lastUpdateRef.current = update;
  };

  const debouncedUpdate = useDebounce<TitleUpdate>(handleDebouncedUpdate, 500);

  const handleBlur = (title: string) => {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath === '/bookmarks') {
      return;
    }

    lastUpdateRef.current = { title };
    updateFolderImmediately(title);
  };

  return {
    debouncedUpdate,
    handleBlur,
  };
}

import { useRef } from 'react';
import { usePageStore } from '@/stores/pageStore';
import useUpdateFolder from '@/hooks/mutations/useUpdateFolder';
import { useUpdateLink } from '@/hooks/mutations/useUpdateLink';
import useUpdateSharedPageTitle from '@/hooks/mutations/useUpdateSharedPageTitle';
import { useDebounce } from '@/hooks/useDebounce';
import { UpdateLinkData } from '@/types/links';
import toast from 'react-hot-toast';

type TitleUpdate = {
  title: string;
};

type UseUpdateTitleOptions = {
  type?: string;
  link?: string;
  pageId?: string;
  isPageTitle?: boolean;
};

export function useUpdateTitle(
  id?: string,
  initialTitle: string = '',
  options?: UseUpdateTitleOptions
) {
  const opts = options || {};
  const lastUpdateRef = useRef({ title: initialTitle });
  const { pageId: storePageId } = usePageStore();
  const pageId = opts.pageId || storePageId;
  const { mutate: updateFolder } = useUpdateFolder(pageId);
  const { mutate: updateLink } = useUpdateLink();
  const { mutate: updateSharedPageTitle } = useUpdateSharedPageTitle(
    pageId || ''
  );

  //폴더 제목 변경 함수수
  const updateFolderImmediately = (title: string) => {
    if (!id) return;

    const updateData = {
      baseRequest: { pageId: pageId, commandType: 'EDIT' },
      folderId: id,
      folderName: title,
    };

    updateFolder(updateData, {
      onSuccess: () => {
        lastUpdateRef.current = { title };
      },
      onError: (error) => {
        console.error('폴더 업데이트 실패:', error);
        toast.error(
          error instanceof Error
            ? error.message
            : '폴더 업데이트에 실패했습니다.'
        );
      },
    });
  };

  //페이지 제목 변경 함수수
  const updatePageTitleImmediately = (title: string) => {
    if (!pageId || !opts.isPageTitle) return;

    const updateData = {
      baseRequest: { pageId, commandType: 'EDIT' as const },
      pageTitle: title,
    };

    updateSharedPageTitle(updateData, {
      onSuccess: () => {
        lastUpdateRef.current = { title };
      },
      onError: (error) => {
        console.error('페이지 제목 업데이트 실패:', error);
        toast.error(
          error instanceof Error
            ? error.message
            : '페이지 제목 업데이트에 실패했습니다.'
        );
      },
    });
  };

  //링크 제목 변경 함수수
  const updateLinkImmediately = (title: string) => {
    if (!id) return;

    const updateData: UpdateLinkData = {
      baseRequest: {
        pageId,
        commandType: 'EDIT',
      },
      linkUrl: opts.link ?? '',
      linkId: id,
      linkName: title,
    };

    updateLink(updateData, {
      onSuccess: () => {
        lastUpdateRef.current = { title };
      },
      onError: (error) => {
        console.error('링크 업데이트 실패:', error);
        toast.error(
          error instanceof Error
            ? error.message
            : '링크 업데이트에 실패했습니다.'
        );
      },
    });
  };

  const handleDebouncedUpdate = (update: TitleUpdate) => {
    lastUpdateRef.current = update;

    if (opts.isPageTitle) {
      updatePageTitleImmediately(update.title);
    } else if (opts.type === 'link') {
      updateLinkImmediately(update.title);
    } else if (id) {
      updateFolderImmediately(update.title);
    }
  };

  const debouncedUpdate = useDebounce<TitleUpdate>(handleDebouncedUpdate, 500);

  const handleBlur = (title: string) => {
    if (opts.isPageTitle) {
      lastUpdateRef.current = { title };
      updatePageTitleImmediately(title);
      return;
    }

    if (opts.type === 'link') {
      lastUpdateRef.current = { title };
      updateLinkImmediately(title);
      return;
    }

    if (id) {
      lastUpdateRef.current = { title };
      updateFolderImmediately(title);
      return;
    }

    const currentPath = window.location.pathname;
    if (
      (opts.type === null && currentPath === '/') ||
      (opts.type === null && currentPath === '/bookmarks')
    ) {
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

import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageStore } from '@/stores/pageStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPersonalPage } from '@/apis/page-apis/fetchPersonalPage';
import { useFetchMemo } from '@/hooks/queries/useFetchMemo';
import { useCreateMemo } from '@/hooks/mutations/useCreateMemo';
import { useDeleteMemo } from '@/hooks/mutations/useDeleteMemo';
import { ItemType } from '@/types/memos';

interface UseFolderMemoParams {
  folderId: string | null;
  itemPageId?: string;
}

export function useFolderMemo({ folderId, itemPageId }: UseFolderMemoParams) {
  const { pageId } = usePageStore();
  const location = useLocation();
  const queryClient = useQueryClient();
  const isBookmarkPage = location.pathname.startsWith('/bookmarks');

  // 북마크 페이지인 경우 개인 페이지 정보 가져오기
  const { data: personalPageData } = useQuery({
    queryKey: ['personalPage'],
    queryFn: () => fetchPersonalPage(),
    select: (response) => response.data,
    enabled: isBookmarkPage,
    staleTime: 1000 * 60 * 5,
  });

  // 메모 조회에 사용할 pageId 결정
  const memoPageId = useMemo(() => {
    if (isBookmarkPage) {
      return itemPageId || personalPageData?.pageId || pageId || '';
    }
    return pageId || '';
  }, [isBookmarkPage, itemPageId, personalPageData?.pageId, pageId]);

  // Memo 조회
  const memoParams = useMemo(
    () =>
      memoPageId && folderId
        ? {
            pageId: memoPageId,
            commandType: 'VIEW' as const,
            itemType: 'FOLDER' as ItemType,
            itemId: folderId,
          }
        : null,
    [memoPageId, folderId]
  );

  const { data: memo } = useFetchMemo(memoParams);

  // Memo 생성
  const { mutate: createMemo } = useCreateMemo({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['memo', 'FOLDER', folderId, memoPageId],
      });
      queryClient.invalidateQueries({
        queryKey: ['folderDetails'],
        exact: false,
      });
    },
    onError: (error) => {
      console.error('폴더 메모 생성 실패:', error);
    },
  });

  // Memo 삭제
  const { mutate: deleteMemo } = useDeleteMemo({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['memo', 'FOLDER', folderId, memoPageId],
      });
      queryClient.invalidateQueries({
        queryKey: ['folderDetails'],
        exact: false,
      });
    },
    onError: (error) => {
      console.error('폴더 메모 삭제 실패:', error);
    },
  });

  const handleMemoSave = (memoContent: string, onSuccess?: () => void) => {
    if (!memoPageId || !folderId) {
      console.error('pageId 또는 folderId가 없습니다.');
      return;
    }

    const trimmedMemo = memoContent.trim();

    // 메모가 비어있으면 삭제
    if (trimmedMemo === '') {
      if (memo?.memoId) {
        deleteMemo({
          baseRequest: {
            pageId: memoPageId,
            commandType: 'EDIT',
          },
          memoId: memo.memoId,
        });
        onSuccess?.();
      }
      return;
    }

    // 메모가 있으면
    if (memo?.memoId) {
      // 기존 메모가 있고 내용이 다르면 삭제 후 새로 생성
      if (memo.content !== trimmedMemo) {
        deleteMemo(
          {
            baseRequest: {
              pageId: memoPageId,
              commandType: 'EDIT',
            },
            memoId: memo.memoId,
          },
          {
            onSuccess: () => {
              createMemo({
                baseRequest: {
                  pageId: memoPageId,
                  commandType: 'CREATE',
                },
                itemType: 'FOLDER',
                itemId: folderId,
                content: trimmedMemo,
              });
              onSuccess?.();
            },
          }
        );
      } else {
        // 내용이 같으면 콜백만 실행
        onSuccess?.();
      }
    } else {
      // 기존 메모가 없으면 바로 생성
      createMemo({
        baseRequest: {
          pageId: memoPageId,
          commandType: 'CREATE',
        },
        itemType: 'FOLDER',
        itemId: folderId,
        content: trimmedMemo,
      });
      onSuccess?.();
    }
  };

  return {
    memo,
    handleMemoSave,
    hasMemo: !!memo?.content,
    memoContent: memo?.content || '',
  };
}

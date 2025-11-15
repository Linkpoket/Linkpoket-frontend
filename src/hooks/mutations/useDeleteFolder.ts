import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import deleteFolder from '@/apis/folder-apis/deleteFolder';
import { DeleteFolderData } from '@/types/folders';
import { useLocation } from 'react-router-dom';

export default function useDeleteFolder(
  pageId: string,
  options?: UseMutationOptions<any, unknown, DeleteFolderData>
) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const isMainPage = location.pathname === '/';
  const isBookmarksPage = location.pathname === '/bookmarks';
  const isSharedPage = locationSplit.includes('shared');
  const isFolderPage = locationSplit.includes('folder');

  return useMutation({
    ...options,
    mutationFn: deleteFolder,

    onMutate: async (variables) => {
      const context: Record<string, any> = {};

      // 관련 쿼리 취소
      if (isSharedPage)
        await queryClient.cancelQueries({ queryKey: ['sharedPage', pageId] });
      if (isFolderPage)
        await queryClient.cancelQueries({
          queryKey: ['folderDetails', pageId],
        });
      if (isMainPage)
        await queryClient.cancelQueries({ queryKey: ['personalPage'] });
      if (isBookmarksPage)
        await queryClient.cancelQueries({ queryKey: ['favorite'] });

      // 기존 데이터 저장
      if (isSharedPage) {
        context.sharedPage = queryClient.getQueryData(['sharedPage', pageId]);
      }
      if (isFolderPage) {
        context.folderDetails = queryClient.getQueryData([
          'folderDetails',
          pageId,
        ]);
      }
      if (isMainPage) {
        context.personalPage = queryClient.getQueryData(['personalPage']);
      }
      if (isBookmarksPage) {
        context.favorite = queryClient.getQueryData(['favorite']);
      }

      //임시 UI 업데이트

      if (isSharedPage) {
        queryClient.setQueryData(['sharedPage', pageId], (old: any) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              foldeDetailResponses: old.data.folderDetailResponses.filter(
                (f: any) => f.folderId !== variables.folderId
              ),
            },
          };
        });
      }

      if (isFolderPage) {
        queryClient.setQueryData(['folderDetails', pageId], (old: any) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              folderDetailResponses: old.data.folderDetailResponses.filter(
                (f: any) => f.folderId !== variables.folderId
              ),
            },
          };
        });
      }

      if (isMainPage) {
        queryClient.setQueryData(['personalPage'], (old: any) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              pageDetails: {
                ...old.data.pageDetails,
                folderDetailResponses:
                  old.data.pageDetails.folderDetailResponses.filter(
                    (f: any) => f.folderId !== variables.folderId
                  ),
              },
            },
          };
        });
      }

      if (isBookmarksPage) {
        queryClient.setQueryData(['favorite'], (old: any) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              directorySimpleResponses:
                old.data.directorySimpleResponses.filter(
                  (f: any) => f.folderId !== variables.folderId
                ),
            },
          };
        });
      }

      return context;
    },

    onSuccess: () => {
      //사이드바 폴더 리스트 업데이트
      queryClient.invalidateQueries({
        queryKey: ['folderList', pageId],
      });

      if (isSharedPage) {
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', pageId],
        });
      }
      // 폴더 상세 페이지 쿼리 무효화 (모든 폴더 ID에 대해)
      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', pageId],
        });
      }

      // 메인 페이지에서만 personalPage 캐시 무효화
      if (isMainPage) {
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
        });
      }

      if (isBookmarksPage) {
        queryClient.invalidateQueries({
          queryKey: ['favorite'],
        });
        queryClient.invalidateQueries({
          queryKey: ['folderList', pageId],
        });
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', pageId],
        });
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', pageId],
        });
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
        });
      }
    },

    onError: (error, context: any) => {
      // rollback
      if (context?.sharedPage)
        queryClient.setQueryData(['sharedPage', pageId], context.sharedPage);
      if (context?.folderDetails)
        queryClient.setQueryData(
          ['folderDetails', pageId],
          context.folderDetails
        );
      if (context?.personalPage)
        queryClient.setQueryData(['personalPage'], context.personalPage);
      console.error('폴더 생성 에러:', error);
    },
  });
}

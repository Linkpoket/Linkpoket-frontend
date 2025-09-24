import { deleteLink } from '@/apis/link-apis/deleteLink';
import { DeleteLinkData, DeleteLinkResponse } from '@/types/links';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

export function useDeleteLink(
  options?: UseMutationOptions<DeleteLinkResponse, unknown, DeleteLinkData>
) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const isMainPage = location.pathname === '/';
  const isBookmarksPage = location.pathname === '/bookmarks';
  const isSharedPage = locationSplit.includes('shared');
  const isFolderPage = locationSplit.includes('folder');

  return useMutation({
    mutationFn: deleteLink,
    onSuccess: (response, variables, context) => {
      //사이드바 폴더 리스트 업데이트
      queryClient.invalidateQueries({
        queryKey: ['folderList', variables.baseRequest.pageId],
        refetchType: 'active',
      });

      if (isSharedPage) {
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', variables.baseRequest.pageId],
          refetchType: 'active',
        });
      }
      // 폴더 상세 페이지 쿼리 무효화 (모든 폴더 ID에 대해)
      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', variables.baseRequest.pageId],
          refetchType: 'active',
        });
      }

      // 메인 페이지에서만 personalPage 캐시 무효화
      if (isMainPage) {
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
          refetchType: 'active',
        });
      }

      if (isBookmarksPage) {
        queryClient.invalidateQueries({
          queryKey: ['favorite'],
          refetchType: 'active',
        });
        queryClient.invalidateQueries({
          queryKey: ['folderList', variables.baseRequest.pageId],
          refetchType: 'active',
        });
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', variables.baseRequest.pageId],
          refetchType: 'active',
        });
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', variables.baseRequest.pageId],
          refetchType: 'active',
        });
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
          refetchType: 'active',
        });
      }

      if (options?.onSuccess) {
        options.onSuccess(response, variables, context);
      }
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },
  });
}

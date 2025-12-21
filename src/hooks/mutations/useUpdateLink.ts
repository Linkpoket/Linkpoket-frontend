import { updateLink } from '@/apis/link-apis/updateLink';
import { UpdateLinkData, UpdateLinkResponse } from '@/types/links';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

export function useUpdateLink(
  options?: UseMutationOptions<UpdateLinkResponse, unknown, UpdateLinkData>
) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const isMainPage = location.pathname === '/';
  const isSharedPage = locationSplit.includes('shared');
  const isFolderPage = locationSplit.includes('folder');
  const isBookmarksPage = location.pathname === '/bookmarks';

  return useMutation({
    mutationFn: updateLink,

    onSuccess: (response, variables, context) => {
      // favorite 쿼리 무효화 및 리페치
      queryClient.invalidateQueries({
        queryKey: ['favorite'],
      });

      // folderDetails 쿼리 무효화 및 리페치 (exact: false로 모든 관련 쿼리 무효화)
      queryClient.invalidateQueries({
        queryKey: ['folderDetails'],
        exact: false,
      });

      // 공유 페이지 무효화 및 리페치
      if (isSharedPage && !isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', variables.baseRequest.pageId],
        });
      }

      // 개인 페이지 무효화 및 리페치 (폴더 페이지인 경우도 포함)
      if (isMainPage || isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
        });
      }

      // 북마크 페이지 무효화 및 리페치
      if (isBookmarksPage) {
        queryClient.invalidateQueries({
          queryKey: ['favorite'],
        });
        queryClient.invalidateQueries({
          queryKey: ['folderDetails'],
          exact: false,
        });
        queryClient.invalidateQueries({
          queryKey: ['sharedPage'],
          exact: false,
        });
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
        });
      }

      // 모든 관련 쿼리를 즉시 리페치
      queryClient.refetchQueries({
        queryKey: ['personalPage'],
      });
      queryClient.refetchQueries({
        queryKey: ['sharedPage'],
        exact: false,
      });
      queryClient.refetchQueries({
        queryKey: ['folderDetails'],
        exact: false,
      });
      queryClient.refetchQueries({
        queryKey: ['favorite'],
      });

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

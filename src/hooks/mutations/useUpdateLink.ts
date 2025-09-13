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
  const isBookmarksPage = location.pathname === '/bookmarks';
  const isSharedPage = locationSplit.includes('shared');
  const isFolderPage = locationSplit.includes('folder');

  return useMutation({
    mutationFn: updateLink,

    onSuccess: (response, variables, context) => {
      console.log('폴더 업데이트 성공 응답:', response);

      // 폴더 상세, 공유페이지, 개인페이지 캐시 무효화
      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', variables.baseRequest.pageId],
        });
      }

      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderList', variables.baseRequest.pageId],
          refetchType: 'active',
        });
      }

      if (isSharedPage) {
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', variables.baseRequest.pageId],
        });
      }

      if (isMainPage) {
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
        });
      }

      if (isBookmarksPage) {
        queryClient.invalidateQueries({
          queryKey: ['favorite'],
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

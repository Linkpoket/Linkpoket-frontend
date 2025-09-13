import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import updateLinkBookmark from '@/apis/link-apis/updateLinkBookmark';
import { useLocation } from 'react-router-dom';

export default function useUpdateLinkBookmark({
  linkId,
  pageId,
  options,
}: {
  linkId: string;
  pageId: string;
  options?: UseMutationOptions<any, Error, string, unknown>;
}) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const isMainPage = location.pathname === '/';
  const isBookmarksPage = location.pathname === '/bookmarks';
  const isSharedPage = locationSplit.includes('shared');
  const isFolderPage = locationSplit.includes('folder');

  return useMutation({
    ...options,
    mutationFn: updateLinkBookmark,

    onSuccess: (response, variables, context) => {
      if (isBookmarksPage) {
        queryClient.invalidateQueries({
          queryKey: ['favorite'],
          refetchType: 'active',
        });
      }
      queryClient.invalidateQueries({
        queryKey: ['bookmark', linkId],
        refetchType: 'active',
      });
      if (isSharedPage) {
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', pageId],
          refetchType: 'active',
        });
      }
      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', pageId],
          refetchType: 'active',
        });
      }
      if (isMainPage) {
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
      console.error('링크 북마크 업데이트 에러:', error);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
  });
}

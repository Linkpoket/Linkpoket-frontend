import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';
import updateFolder from '@/apis/folder-apis/updateFolder';
import { UpdateFolderData } from '@/types/folders';
import { useLocation } from 'react-router-dom';

export default function useUpdateFolder(
  pageId: string,
  options?: UseMutationOptions<any, unknown, UpdateFolderData>
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
    mutationFn: updateFolder,
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
          queryKey: ['folderList', pageId],
          refetchType: 'active',
        });
      }
      if (isSharedPage) {
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', pageId],
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

        if (options?.onSuccess) {
          options.onSuccess(response, variables, context);
        }
      }
    },
    onError: (error, variables, context) => {
      console.error('폴더 업데이트 에러:', error);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
  });
}

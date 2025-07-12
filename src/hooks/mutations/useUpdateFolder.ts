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
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: updateFolder,
    onSuccess: async (response, variables, context) => {
      console.log('폴더 업데이트 성공 응답:', response);

      //폴더 상세, 공유페이지, 개인페이지 캐시 무효화
      const promises = [
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', pageId, variables.folderId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', pageId],
        }),
      ];

      if (isMainPage) {
        promises.push(
          queryClient.invalidateQueries({
            queryKey: ['personalPage'],
          })
        );
      }

      Promise.all(promises);

      if (options?.onSuccess) {
        options.onSuccess(response, variables, context);
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

import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';
import updateFolder from '@/apis/folder-apis/updateFolder';
import { UpdateFolderData } from '@/types/folders';

export default function useUpdateFolder(
  pageId: string,
  options?: UseMutationOptions<any, unknown, UpdateFolderData>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: updateFolder,
    onSuccess: (response, variables, context) => {
      console.log('폴더 업데이트 성공 응답:', response);

      // 폴더 상세, 공유페이지, 개인페이지 캐시 무효화
      Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', variables.baseRequest.pageId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['folderList', pageId],
          refetchType: 'active',
        }),
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', pageId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['favorite'],
          refetchType: 'active',
        }),
      ]);

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

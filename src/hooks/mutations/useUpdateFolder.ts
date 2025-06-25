import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';
import updateFolder from '@/apis/folder-apis/updateFolder';
import { UpdateFolderData } from '@/types/folders';

export default function useUpdateFolder(
  pageId: number,
  options?: UseMutationOptions<any, unknown, UpdateFolderData>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: updateFolder,
    onSuccess: async (response, variables, context) => {
      console.log('폴더 업데이트 성공 응답:', response);
      // 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['folderDetails', pageId, variables.folderId],
        refetchType: 'active',
      });
      // sharedPage 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['sharedPage', pageId],
        refetchType: 'active',
      });
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

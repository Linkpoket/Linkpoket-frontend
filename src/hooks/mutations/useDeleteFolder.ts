import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import deleteFolder from '@/apis/folder-apis/deleteFolder';
import { DeleteFolderData } from '@/types/folders';

export default function useDeleteFolder(
  pageId: string,
  options?: UseMutationOptions<any, unknown, DeleteFolderData>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: deleteFolder,
    onSuccess: async (response, variables, context) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', pageId],
          refetchType: 'active',
        }),
        queryClient.invalidateQueries({
          queryKey: ['folderList', pageId],
          refetchType: 'active',
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
      console.error('폴더 삭제 에러:', error);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
  });
}

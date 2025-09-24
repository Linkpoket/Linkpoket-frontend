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
      // 폴더 상세, 공유페이지, 개인페이지 캐시 무효화

      queryClient.invalidateQueries({
        queryKey: ['folderDetails', pageId],
      });

      queryClient.invalidateQueries({
        queryKey: ['folderList', pageId],
        refetchType: 'active',
      });

      queryClient.invalidateQueries({
        queryKey: ['sharedPage', pageId],
      });

      queryClient.invalidateQueries({
        queryKey: ['personalPage'],
      });

      queryClient.invalidateQueries({
        queryKey: ['favorite'],
        refetchType: 'active',
      });

      if (options?.onSuccess) {
        options.onSuccess(response, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
  });
}

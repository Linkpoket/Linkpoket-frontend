import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { createFolder } from '@/apis/folder-apis/createFolder';
import { CreateFolderData } from '@/types/folders';

export function useCreateFolder(
  pageId: number,
  commandType: string,
  options?: UseMutationOptions<any, unknown, CreateFolderData>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: createFolder,
    onSuccess: async (response, variables, context) => {
      // 현재 페이지의 모든 관련 쿼리 무효화
      await Promise.all([
        // 일반 페이지 쿼리 무효화
        queryClient.invalidateQueries({
          queryKey: ['selectedPage', pageId, commandType],
          refetchType: 'active',
        }),
        // 폴더 상세 페이지 쿼리 무효화 (모든 폴더 ID에 대해)
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', pageId],
          refetchType: 'active',
        }),
      ]);

      if (options?.onSuccess) {
        options.onSuccess(response, variables, context);
      }
    },
    onError: (error, variables, context) => {
      console.error('폴더 생성 에러:', error);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
  });
}

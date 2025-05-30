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
      // 모든 commandType에 대해 캐시 무효화
      const commandTypes = ['VIEW', 'EDIT'];

      await Promise.all([
        // 페이지 쿼리 무효화
        queryClient.invalidateQueries({
          queryKey: ['selectedPage', pageId, 'VIEW'],
          refetchType: 'active',
        }),
        // 폴더 상세 정보 쿼리 무효화 (모든 commandType에 대해)
        ...commandTypes.flatMap((commandType) => [
          queryClient.invalidateQueries({
            queryKey: [
              'folderDetails',
              pageId,
              variables.folderId,
              commandType,
            ],
            refetchType: 'active',
          }),
          queryClient.invalidateQueries({
            queryKey: ['folderDetails', pageId],
            refetchType: 'active',
          }),
        ]),
      ]);

      console.log('캐시 무효화 완료:', {
        pageId,
        folderId: variables.folderId,
        commandTypes,
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

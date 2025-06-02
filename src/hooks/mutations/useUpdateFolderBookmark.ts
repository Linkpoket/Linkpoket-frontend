import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import updateFolderBookmark from '@/apis/folder-apis/updateFolderBookmark';

export default function useUpdateFolderBookmark({
  folderId,
  options,
}: {
  folderId: number;
  options?: UseMutationOptions<any, Error, number, unknown>;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: updateFolderBookmark,
    onSuccess: (response, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['bookmark', folderId] });
      if (options?.onSuccess) {
        options.onSuccess(response, variables, context);
      }
    },
    onError: (error, variables, context) => {
      console.error('폴더 북마크 업데이트 에러:', error);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
  });
}

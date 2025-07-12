import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import updateFolderBookmark from '@/apis/folder-apis/updateFolderBookmark';

export default function useUpdateFolderBookmark({
  folderId,
  pageId,
  options,
}: {
  folderId: string;
  pageId: string;
  options?: UseMutationOptions<any, Error, string, unknown>;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: updateFolderBookmark,
    onSuccess: (response, variables, context) => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['bookmark', folderId] }),
        queryClient.invalidateQueries({ queryKey: ['favorite'] }),
        queryClient.invalidateQueries({ queryKey: ['sharedPage', pageId] }),
        queryClient.invalidateQueries({ queryKey: ['personalPage'] }),
      ]);
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

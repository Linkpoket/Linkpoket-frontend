import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import updateLinkBookmark from '@/apis/link-apis/updateLinkBookmark';

export default function useUpdateLinkBookmark({
  linkId,
  pageId,
  options,
}: {
  linkId: string;
  pageId: string;
  options?: UseMutationOptions<any, Error, string, unknown>;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: updateLinkBookmark,
    onSuccess: (response, variables, context) => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['favorite'],
          refetchType: 'active',
        }),
        queryClient.invalidateQueries({
          queryKey: ['bookmark', linkId],
          refetchType: 'active',
        }),
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', pageId],
          refetchType: 'active',
        }),
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', pageId],
          refetchType: 'active',
        }),
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
          refetchType: 'active',
        }),
      ]);
      if (options?.onSuccess) {
        options.onSuccess(response, variables, context);
      }
    },
    onError: (error, variables, context) => {
      console.error('링크 북마크 업데이트 에러:', error);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
  });
}

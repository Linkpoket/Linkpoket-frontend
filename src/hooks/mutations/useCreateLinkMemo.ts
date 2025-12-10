import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { createLinkMemo } from '@/apis/linkMemo-apis/createLinkMemo';
import {
  LinkMemoCreateRequest,
  LinkMemoCreateResponseWrapper,
} from '@/types/linkMemos';

export function useCreateLinkMemo(
  options?: UseMutationOptions<
    LinkMemoCreateResponseWrapper,
    unknown,
    LinkMemoCreateRequest
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLinkMemo,
    onSuccess: (response, variables, context) => {
      // 링크 메모 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['linkMemo', variables.linkId],
      });

      // 관련 페이지 쿼리도 무효화
      queryClient.invalidateQueries({
        queryKey: ['personalPage'],
      });
      queryClient.invalidateQueries({
        queryKey: ['folderDetails'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['sharedPage'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['favorite'],
      });

      options?.onSuccess?.(response, variables, context);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
  });
}

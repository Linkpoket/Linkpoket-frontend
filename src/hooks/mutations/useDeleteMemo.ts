import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteMemo } from '@/apis/memo-apis/deleteMemo';
import { MemoDeleteRequest, MemoDeleteResponseWrapper } from '@/types/memos';

export function useDeleteMemo(
  options?: UseMutationOptions<
    MemoDeleteResponseWrapper,
    unknown,
    MemoDeleteRequest
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMemo,
    onSuccess: (response, variables, context) => {
      // 메모 쿼리 무효화 (memoId로 특정 메모 무효화는 어려우므로 광범위하게 무효화)
      queryClient.invalidateQueries({
        queryKey: ['memo'], // 모든 memo 쿼리 무효화
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

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { createMemo } from '@/apis/memo-apis/createMemo';
import { MemoCreateRequest, MemoCreateResponseWrapper } from '@/types/memos';

export function useCreateMemo(
  options?: UseMutationOptions<
    MemoCreateResponseWrapper,
    unknown,
    MemoCreateRequest
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMemo,
    onSuccess: (response, variables, context) => {
      // 메모 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [
          'memo',
          variables.itemType,
          variables.itemId,
          variables.baseRequest.pageId,
        ],
      });

      // 관련 페이지 쿼리도 무효화 (메모 유무가 카드 UI에 영향을 줄 수 있으므로)
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

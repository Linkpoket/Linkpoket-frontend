import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteLinkMemo } from '@/apis/linkMemo-apis/deleteLinkMemo';
import {
  LinkMemoDeleteRequest,
  LinkMemoDeleteResponseWrapper,
} from '@/types/linkMemos';

export function useDeleteLinkMemo(
  options?: UseMutationOptions<
    LinkMemoDeleteResponseWrapper,
    unknown,
    LinkMemoDeleteRequest
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLinkMemo,
    onSuccess: (response, variables, context) => {
      // 링크 메모 쿼리 무효화
      // linkMemoId로 linkId를 찾아야 하는데, 응답에는 linkId가 없으므로
      // baseRequest의 pageId로 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['linkMemo'],
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

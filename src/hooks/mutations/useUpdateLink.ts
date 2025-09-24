import { updateLink } from '@/apis/link-apis/updateLink';
import { UpdateLinkData, UpdateLinkResponse } from '@/types/links';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

export function useUpdateLink(
  options?: UseMutationOptions<UpdateLinkResponse, unknown, UpdateLinkData>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLink,

    onSuccess: (response, variables, context) => {
      // 폴더 상세, 공유페이지, 개인페이지 캐시 무효화

      queryClient.invalidateQueries({
        queryKey: ['folderDetails', variables.baseRequest.pageId],
      });

      queryClient.invalidateQueries({
        queryKey: ['folderList', variables.baseRequest.pageId],
        refetchType: 'active',
      });

      queryClient.invalidateQueries({
        queryKey: ['sharedPage', variables.baseRequest.pageId],
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
      options?.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },
  });
}

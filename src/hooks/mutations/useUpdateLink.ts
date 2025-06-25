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
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['sharedPage', variables.baseRequest.pageId],
      });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },
  });
}

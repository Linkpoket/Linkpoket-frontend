import { deleteLink } from '@/apis/link-apis/deleteLink';
import { DeleteLinkData, DeleteLinkResponse } from '@/types/links';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

export function useDeleteLink(
  options?: UseMutationOptions<DeleteLinkResponse, unknown, DeleteLinkData>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLink,
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

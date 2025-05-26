import { deleteLink } from '@/apis/link-apis/deleteLink';
import { DeleteLinkData } from '@/types/links';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

export function useDeleteLink(
  options?: UseMutationOptions<any, unknown, DeleteLinkData>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLink,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['selectedPage', variables.baseRequest.pageId, 'VIEW'],
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

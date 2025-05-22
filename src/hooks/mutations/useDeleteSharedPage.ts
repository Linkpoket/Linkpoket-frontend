import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteSharedPage } from '@/apis/page-apis/deleteSharedPage';
import { DeleteSharedPageData } from '@/types/pages';

export function useDeleteSharedPage(
  options?: UseMutationOptions<any, unknown, DeleteSharedPageData>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSharedPage,
    onSuccess: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['joinedPage'] });
      options?.onSuccess?.(data, variables, context);
    },
    onError: options?.onError,
  });
}

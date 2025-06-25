import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { WithdrawSharedPageData } from '@/apis/page-apis/withdrawSharedPage';
import { DeleteSharedPageData } from '@/types/pages';

export function useWithdrawSharedPage(
  options?: UseMutationOptions<any, unknown, DeleteSharedPageData>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: WithdrawSharedPageData,
    onSuccess: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['joinedPage'] });
      options?.onSuccess?.(data, variables, context);
    },
    onError: options?.onError,
  });
}

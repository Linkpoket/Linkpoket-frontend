import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { createSharedPage } from '@/apis/page-apis/createSharedPage';
import { CreateSharedPageData } from '@/types/pages';

export function useCreateSharedPage(
  options?: UseMutationOptions<any, unknown, CreateSharedPageData>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSharedPage,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['joinedPage'] });
      options?.onSuccess?.(data, variables, context);
    },
    onError: options?.onError,
  });
}

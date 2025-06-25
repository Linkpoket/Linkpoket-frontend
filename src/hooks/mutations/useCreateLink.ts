import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { createLink } from '@/apis/link-apis/createLink';
import { CreateLinkData, CreateLinkResponse } from '@/types/links';

export function useCreateLink(
  options?: UseMutationOptions<CreateLinkResponse, unknown, CreateLinkData>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLink,
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

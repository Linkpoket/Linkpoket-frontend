import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { createLink } from '@/apis/link-apis/createLink';
import { CreateLinkData, CreateLinkResponse } from '@/types/links';
import { useLocation } from 'react-router-dom';

export function useCreateLink(
  options?: UseMutationOptions<CreateLinkResponse, unknown, CreateLinkData>
) {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLink,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['sharedPage', variables.baseRequest.pageId],
      });

      if (isMainPage) {
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
        });
      }

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

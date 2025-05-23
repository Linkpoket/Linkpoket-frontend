import { createLink } from '@/apis/link-apis/createLink';
import { CreateLinkData } from '@/types/links';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export function useCreateLink(
  options?: UseMutationOptions<any, unknown, CreateLinkData>
) {
  return useMutation({
    mutationFn: createLink,
    ...options,
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateSharedPageVisibility from '@/apis/page-apis/updateSharedPageVisibilitry';

export default function useUpdateSharedPageVisibility(pageId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSharedPageVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sharedPage', pageId],
      });
    },
  });
}

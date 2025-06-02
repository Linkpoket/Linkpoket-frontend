import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateSharedPageDescription from '@/apis/page-apis/updateSharedPageDescription';

export default function useUpdateSharedPageDescription(pageId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSharedPageDescription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sharedPage', pageId],
      });
    },
  });
}

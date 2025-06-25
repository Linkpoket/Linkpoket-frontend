import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateSharedPageTitle from '@/apis/page-apis/updateSharedPageTitle';

export default function useUpdateSharedPageTitle(pageId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSharedPageTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sharedPage', pageId],
      });
    },
  });
}

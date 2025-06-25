import patchSharedPageInvitation from '@/apis/page-apis/patchSharedPageInvitation';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

export default function usePatchSharedPageInvitations() {
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>({
    mutationFn: patchSharedPageInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notification'],
      });
    },
  });
}

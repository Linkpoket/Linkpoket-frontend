import { useQueryClient, useMutation } from '@tanstack/react-query';
import updateSharedPageInvitation from '@/apis/page-apis/updateSharedPageInvitation';
import { PageParamsData } from '@/types/pages';

interface UseUpdateSharedPageInvitationProps extends PageParamsData {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export default function useUpdateSharedPageInvitation({
  pageId,
  onSuccess,
  onError,
}: UseUpdateSharedPageInvitationProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSharedPageInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sharedPageDashboard', pageId],
      });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}

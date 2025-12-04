import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchShareInvitationStatus } from '@/apis/alarm-apis/patchShareInvitationStatus';
import toast from 'react-hot-toast';

export function usePatchShareInvitationStatus() {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    unknown,
    {
      dispatchRequestId: string;
      requestStatus: 'ACCEPTED' | 'REJECTED';
      notificationType: 'INVITE_PAGE';
    }
  >({
    mutationFn: patchShareInvitationStatus,
    onSuccess: (_data, variables) => {
      if (variables.requestStatus === 'ACCEPTED') {
        queryClient.refetchQueries({ queryKey: ['personalPage'] });
        toast.success('공유 페이지 초대를 수락했습니다.');
      } else if (variables.requestStatus === 'REJECTED') {
        toast.error('공유 페이지 초대를 거절했습니다.');
      }

      queryClient.refetchQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : '공유 페이지 초대 상태 변경에 실패했습니다.'
      );
    },
  });
}

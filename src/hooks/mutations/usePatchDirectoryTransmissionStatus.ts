import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchDirectoryTransmissionStatus } from '@/apis/alarm-apis/patchDirectoryTransmissionStatus';
import toast from 'react-hot-toast';

export function usePatchDirectoryTransmissionStatus() {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    unknown,
    {
      dispatchRequestId: string;
      requestStatus: 'ACCEPTED' | 'REJECTED';
      notificationType: 'TRANSMIT_DIRECTORY';
    }
  >({
    mutationFn: patchDirectoryTransmissionStatus,
    onSuccess: (_data, variables) => {
      if (variables.requestStatus === 'ACCEPTED') {
        queryClient.refetchQueries({ queryKey: ['personalPage'] });
        toast.success('폴더 초대를 수락했습니다.');
      } else if (variables.requestStatus === 'REJECTED') {
        toast.error('폴더 초대를 거절했습니다.');
      }

      queryClient.refetchQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : '폴더 초대 상태 변경에 실패했습니다.'
      );
    },
  });
}

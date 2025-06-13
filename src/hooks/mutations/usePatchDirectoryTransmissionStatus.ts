import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchDirectoryTransmissionStatus } from '@/apis/alarm-apis/patchDirectoryTransmissionStatus';
import { ToastCustom } from '@/components/common-ui/ToastCustom';

export function usePatchDirectoryTransmissionStatus() {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    unknown,
    {
      requestId: number;
      requestStatus: 'ACCEPTED' | 'REJECTED';
      notificationType: 'TRANSMIT_DIRECTORY';
    }
  >({
    mutationFn: patchDirectoryTransmissionStatus,
    onSuccess: (_data, variables) => {
      if (variables.requestStatus === 'ACCEPTED') {
        ToastCustom.success('폴더 초대를 수락했습니다.');
      } else if (variables.requestStatus === 'REJECTED') {
        ToastCustom.info('폴더 초대를 거절했습니다.');
      }

      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: () => {
      ToastCustom.error('폴더 초대 상태 변경에 실패했습니다.');
    },
  });
}

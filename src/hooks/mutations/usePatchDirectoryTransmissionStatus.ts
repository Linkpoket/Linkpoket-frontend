import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchDirectoryTransmissionStatus } from '@/apis/alarm-apis/patchDirectoryTransmissionStatus';
import { ToastCustom } from '@/components/common-ui/ToastCustom';

export function usePatchDirectoryTransmissionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchDirectoryTransmissionStatus,
    onSuccess: (_data, variables) => {
      if (variables.requestStatus === 'ACCEPTED') {
        ToastCustom.success('폴더 초대를 수락했습니다.');
      } else if (variables.requestStatus === 'REJECTED') {
        ToastCustom.info('폴더 초대를 거절했습니다.');
      }

      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      console.log('디렉토리 요청 상태 변경 성공');
    },
    onError: () => {
      console.log('디렉토리 요청 상태 변경 실패');
    },
  });
}

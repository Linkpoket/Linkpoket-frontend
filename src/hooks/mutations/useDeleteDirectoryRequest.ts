import { deleteDirectoryRequest } from '@/apis/alarm-apis/deleteDirectoryRequest';
import { ToastCustom } from '@/components/common-ui/ToastCustom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteDirectoryRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDirectoryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      ToastCustom.success('알람을 삭제했습니다.');
    },
    onError: () => {
      ToastCustom.error('삭제를 실패했습니다.');
    },
  });
};

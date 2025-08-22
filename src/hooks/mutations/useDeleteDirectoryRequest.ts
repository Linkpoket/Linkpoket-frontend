import { deleteDirectoryRequest } from '@/apis/alarm-apis/deleteDirectoryRequest';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useDeleteDirectoryRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDirectoryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('알람을 삭제했습니다.');
    },
    onError: () => {
      toast.error('삭제를 실패했습니다.');
    },
  });
};

import { deleteDirectoryRequest } from '@/apis/alarm-apis/deleteDirectoryRequest';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteDirectoryRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDirectoryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      console.log('폴더 요청 삭제 성공');
    },
    onError: () => {
      console.log('폴더 요청 삭제 실패');
    },
  });
};

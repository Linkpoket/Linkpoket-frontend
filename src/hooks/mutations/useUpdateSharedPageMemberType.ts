import updateSharedPageMemberType from '@/apis/page-apis/updateSharedPageMemberType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useUpdateSharedPageMemberType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSharedPageMemberType,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['sharedPageDashboard', data.pageId],
      });
      toast.success('권한을 변경했습니다.');
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : '권한 변경에 실패했습니다.'
      );
    },
  });
};

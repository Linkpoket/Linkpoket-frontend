import updateSharedPageMemberType from '@/apis/page-apis/updateSharedPageMemberType';
import { ToastCustom } from '@/components/common-ui/ToastCustom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateSharedPageMemberType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSharedPageMemberType,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['sharedPageDashboard', data.pageId],
      });
      ToastCustom.success('권한을 변경했습니다.');
    },
    onError: (error) => {
      if (error instanceof Error) {
        ToastCustom.error(error.message);
      }
    },
  });
};

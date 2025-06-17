import { patchProfileNickname } from '@/apis/profile-apis/patchProfileNickname';
import { ToastCustom } from '@/components/common-ui/ToastCustom';
import { useUserStore } from '@/stores/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateProfileNickname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchProfileNickname,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['personalPage'] });
      useUserStore.getState().setNickname(data.nickname);
      ToastCustom.success('닉네임을 변경했습니다.');
    },
    onError: (error) => {
      if (error instanceof Error) {
        ToastCustom.error(error.message);
      }
    },
  });
};

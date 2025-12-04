import { patchProfileNickname } from '@/apis/profile-apis/patchProfileNickname';
import { useUserStore } from '@/stores/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useUpdateProfileNickname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchProfileNickname,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['personalPage'] });
      useUserStore.getState().setNickname(data.nickname);
      toast.success('닉네임을 변경했습니다.');
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : '닉네임 변경에 실패했습니다.'
      );
    },
  });
};

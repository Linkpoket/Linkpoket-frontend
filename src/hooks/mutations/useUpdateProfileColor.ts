import { patchProfileColor } from '@/apis/profile-apis/patchProfileColor';
import { ToastCustom } from '@/components/common-ui/ToastCustom';
import { useUserStore } from '@/stores/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateProfileColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchProfileColor,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['personalPage'] });
      useUserStore.getState().setColorCode(variables);
    },
    onError: () => {
      ToastCustom.error('색상 변경에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

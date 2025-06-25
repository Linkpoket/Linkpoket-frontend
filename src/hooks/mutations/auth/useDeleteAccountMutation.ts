import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteAccount } from '@/apis/auth-apis/auth.api';
import { useProfileModalStore } from '@/stores/profileModalStore';
import { clearAuthTokens } from '@/lib/clearAuthTokens';

export const useDeleteAccountMutation = (
  options?: UseMutationOptions<void, Error, void>
) => {
  const { closeProfileModal } = useProfileModalStore();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data, variables, context) => {
      clearAuthTokens();
      closeProfileModal();
      window.location.href = '/login';
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.log('회원 탈퇴 실패', error);
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
};

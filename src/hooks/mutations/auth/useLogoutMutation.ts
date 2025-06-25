import { useMutation } from '@tanstack/react-query';
import { logout } from '@/apis/auth-apis/auth.api';
import { useProfileModalStore } from '@/stores/profileModalStore';
import { clearAuthTokens } from '@/lib/clearAuthTokens';

export const useLogoutMutation = () => {
  const { closeProfileModal } = useProfileModalStore();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuthTokens();
      closeProfileModal();

      window.location.href = '/login';
    },
    onError: (error) => {
      console.error('로그아웃 실패', error);
    },
  });
};

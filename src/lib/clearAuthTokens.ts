import { useUserStore } from '@/stores/userStore';

export const clearAuthTokens = () => {
  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('sse_token');
    useUserStore.getState().clearUser();
  } catch (error) {
    console.error('토큰 제거 중 오류 발생:', error);
  }
};

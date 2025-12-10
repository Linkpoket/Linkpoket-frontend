import { useEffect } from 'react';
import useUserInfo from '@/hooks/queries/useUserInfo';
import { useUserStore } from '@/stores/userStore';

/**
 * 사용자 정보를 userStore에 동기화하는 훅 => 컬러 코드를 위함임
 */
export const useUserInfoSync = () => {
  const { data: userInfo } = useUserInfo();
  const { setUser } = useUserStore();

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem('user-store') || '{}'
    ).state;

    if (!storedUser?.colorCode) {
      // localStorage에 정보가 없으면 API에서 가져온 정보 사용
      setUser(
        userInfo?.data?.nickName || '',
        userInfo?.data?.email || '',
        userInfo?.data?.colorCode || ''
      );
    } else {
      // localStorage에 정보가 있으면 그것을 사용
      setUser(
        storedUser?.nickname || '',
        storedUser?.email || '',
        storedUser?.colorCode || ''
      );
    }
  }, [userInfo, setUser]);
};

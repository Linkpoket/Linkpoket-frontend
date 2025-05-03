import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지에서 토큰 확인
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, logout };
}

import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { axiosInstance } from '@/apis/axiosInstance';

// JWT 페이로드 타입 정의
interface TokenPayload {
  email: string;
  exp: number;
  iat: number;
  role: string;
  token_type: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 토큰 유효성 검증 함수
  const validateToken = (token: string): boolean => {
    try {
      const decoded = jwtDecode<TokenPayload>(token);

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        console.log('토큰이 만료되었습니다.');
        return false;
      }

      return true;
    } catch (error) {
      console.error('토큰 검증 중 오류 발생:', error);
      return false;
    }
  };

  // 인증 상태 확인 함수
  const checkAuth = () => {
    const token = localStorage.getItem('access_token');

    if (token && validateToken(token)) {
      // 토큰이 유효한 경우 axiosInstance의 헤더에 토큰 설정
      axiosInstance.defaults.headers.common['Authorization'] =
        `Bearer ${token}`;
      setIsAuthenticated(true);
    } else {
      if (token) localStorage.removeItem('access_token');
      // Authorization 헤더 제거
      delete axiosInstance.defaults.headers.common['Authorization'];
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('access_token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
  };

  // 토큰 재발급 함수
  const refreshToken = async () => {
    try {
      const response = await axiosInstance.get('/api/jwt/access-token', {
        withCredentials: true,
      });

      if (response.status === 200 && response.data?.data) {
        const newToken = response.data.data;
        localStorage.setItem('access_token', newToken);
        axiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${newToken}`;
        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error('토큰 재발급 중 오류:', error);
      return false;
    }
  };

  return {
    isAuthenticated,
    isLoading,
    logout,
    refreshToken,
    checkAuth,
  };
}

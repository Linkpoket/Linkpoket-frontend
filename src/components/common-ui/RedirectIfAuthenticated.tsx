import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const RedirectIfAuthenticated = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // 인증 상태 로딩 중일 때는 로딩 표시
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 이미 인증된 사용자는 메인 페이지로 리다이렉트
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // 인증되지 않은 경우 원래 라우트 렌더링 (로그인/회원가입 페이지)
  return <Outlet />;
};

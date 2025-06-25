import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // 인증 상태 로딩 중일 때는 로딩 표시
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트 (현재 경로를 state로 저장)
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 인증된 경우 원래 라우트 렌더링
  return <Outlet />;
};

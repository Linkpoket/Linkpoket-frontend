import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Spinner } from '@/components/common-ui/Spinner';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // 인증 상태 로딩 중일 때는 로딩 표시
  if (isLoading) {
    return (
      <div className="relative h-full w-full">
        <Spinner display={true} position="center" />
      </div>
    );
  }

  // 인증되지 않은 경우 랜딩 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/landing" state={{ from: location }} replace />;
  }

  // 인증된 경우 원래 라우트 렌더링
  return <Outlet />;
};

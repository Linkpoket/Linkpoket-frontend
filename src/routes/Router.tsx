import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout';
import LoginPage from '@/pages/pages/auth/login';
import SignupPage from '@/pages/pages/auth/signup';
import { LandingPage } from '@/pages/pages/landing/ui/LandingPage';
import PageLayout from '@/components/page-layout/PageLayout';
import ReissuePage from '@/pages/pages/reissue/page';
import { ProtectedRoute } from '@/components/common-ui/ProtectedRoute';
import { RedirectIfAuthenticated } from '@/components/common-ui/RedirectIfAuthenticated';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // 인증이 필요한 라우트들
      {
        element: <ProtectedRoute />,
        children: [{ path: '/', element: <PageLayout /> }],
      },

      // 인증된 사용자는 접근할 필요 없는 라우트들
      {
        element: <RedirectIfAuthenticated />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'signup', element: <SignupPage /> },
        ],
      },

      // 항상 접근 가능한 라우트들
      { path: 'landing', element: <LandingPage /> },
      { path: 'reissue', element: <ReissuePage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

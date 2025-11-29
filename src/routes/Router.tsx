import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { RedirectIfAuthenticated } from './guards/RedirectIfAuthenticated';
import Layout from '../layout/layout';
import { LandingPage } from '@/pages/landing/LandingPage';
import HomePage from '@/pages/home/HomePage';
import PersonalPage from '@/pages/PersonalPage';

const LoginPage = lazy(() => import('@/pages/auth/login'));
const SignupPage = lazy(() => import('@/pages/auth/signup'));
const BookmarkPage = lazy(() => import('@/pages/BookmarkPage'));
const SharedPage = lazy(() => import('@/pages/SharedPage'));
const FolderDetailPage = lazy(() => import('@/pages/FolderDetailPage'));
const ReissuePage = lazy(() => import('@/pages/reissue/page'));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // 항상 접근 가능한 라우트들 (먼저 정의)
      { path: 'landing', element: <LandingPage /> },
      { path: 'reissue', element: <ReissuePage /> },

      // 인증이 필요한 라우트들
      {
        element: <ProtectedRoute />,
        children: [
          // 홈 페이지
          { path: 'home', element: <HomePage /> },
          // 개인페이지
          { path: '/', element: <PersonalPage /> },
          { path: '/personal/folder/:folderId', element: <FolderDetailPage /> },

          // 공유페이지
          {
            path: '/shared/:pageId',
            element: <SharedPage />,
          },
          {
            path: '/shared/:pageId/folder/:folderId',
            element: <FolderDetailPage />,
          },

          // 북마크
          {
            path: '/bookmarks',
            element: <BookmarkPage />,
          },
          {
            path: '/bookmarks/folder/:folderId',
            element: <FolderDetailPage />,
          },
        ],
      },

      // 인증된 사용자는 접근할 필요 없는 라우트들
      {
        element: <RedirectIfAuthenticated />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'signup', element: <SignupPage /> },
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

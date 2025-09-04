import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout';
import LoginPage from '@/pages/auth/login';
import SignupPage from '@/pages/auth/signup';
import { LandingPage } from '@/pages/landing/LandingPage';
import ReissuePage from '@/pages/reissue/page';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { RedirectIfAuthenticated } from './guards/RedirectIfAuthenticated';
import PersonalPage from '@/pages/PersonalPage';
import BookmarkPage from '@/pages/BookmarkPage';
import SharedPage from '@/pages/SharedPage';
import FolderDetailPage from '@/pages/FolderDetailPage';
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // 인증이 필요한 라우트들
      {
        element: <ProtectedRoute />,
        children: [
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

      // 항상 접근 가능한 라우트들
      { path: 'landing', element: <LandingPage /> },
      { path: 'reissue', element: <ReissuePage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

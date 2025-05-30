import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout';
import LoginPage from '@/pages/auth/login';
import SignupPage from '@/pages/auth/signup';
import { LandingPage } from '@/pages/landing/ui/LandingPage';
import ReissuePage from '@/pages/reissue/page';
import { ProtectedRoute } from './guards/ProtectedRoute';
// import { RedirectIfAuthenticated } from './guards/RedirectIfAuthenticated';
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
          { path: '/', element: <PersonalPage /> },
          { path: '/personal', element: <PersonalPage /> },
          { path: '/folder/:folderId', element: <FolderDetailPage /> },
          { path: '/bookmarks', element: <BookmarkPage /> },
          {
            path: '/shared/:pageId',
            element: <SharedPage />,
          },
          {
            path: '/shared/:pageId/folder/:folderId',
            element: <FolderDetailPage />,
          },
          // 이후 디렉토리에 따른 경로
          // { path: '/bookmarks/folder/:folderId',
          //   element: <BookmarkPage />,
          // },
          // {
          //   path: '/personal/shared/folder/:folderId',
          //   element: <SharedPage />,
          // },
        ],
      },

      // 인증된 사용자는 접근할 필요 없는 라우트들
      {
        // element: <RedirectIfAuthenticated />,
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

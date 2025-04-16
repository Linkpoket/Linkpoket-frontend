import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import LoginPage from '@/pages/auth/login';
import SignupPage from '@/pages/auth/signup';
import PageLayout from '@/widgets/page-layout/PageLayout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <PageLayout /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

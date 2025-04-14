import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TEST from '@/pages/TEST';
import Layout from '../layout';
import LoginPage from '@/pages/auth/login';
import SignupPage from '@/pages/auth/signup';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <TEST /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

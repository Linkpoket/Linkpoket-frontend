import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TEST from "../../pages/(authenticated)/personal/page";
import Layout from "../layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{ path: "/", element: <TEST /> }],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

import { useRoutes } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import { EditPage } from "../pages/editPage/editPage";
import App from "../App";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from "./protectedRoute";

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "/", element: <ProtectedRoute element={<App />} /> }],
    },
    {
      path: "/addproducts",
      element: <Layout />,
      children: [
        {
          path: "/addproducts",
          element: <ProtectedRoute element={<EditPage />} />,
        },
      ],
    },
    {
      path: "/login",
      children: [{ path: "/login", element: <LoginPage /> }],
    },
  ]);

  return routes;
};

export default Routes;

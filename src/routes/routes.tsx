import { useRoutes } from "react-router-dom";

import Layout from "../components/Layout/Layout";

import App from "../App";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import StorePage from "../pages/StorePage/StorePage";
import Notfound from "../pages/NotFound/Notfound";
import LayoutWithoutNav from "../components/Layout/LayoutWithoutSidebar";

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "/", element: <ProtectedRoute element={<App />} /> }],
    },
    {
      path: "/store",
      element: <Layout />,
      children: [
        {
          path: "/store/:storeid",
          element: <ProtectedRoute element={<StorePage />} />,
        },
      ],
    },
    {
      path: "/login",
      children: [{ path: "/login", element: <LoginPage /> }],
    },

    {
      path: "*",
      element: <LayoutWithoutNav />,
      children: [
        {
          path: "*",
          element: <Notfound />,
        },
      ],
    },
  ]);

  return routes;
};

export default Routes;

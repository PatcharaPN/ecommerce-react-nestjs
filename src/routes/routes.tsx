import { useRoutes } from "react-router-dom";

import Layout from "../components/Layout/Layout";

import App from "../App";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import StorePage from "../pages/StorePage/StorePage";

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
          path: "/store",
          element: <ProtectedRoute element={<StorePage />} />,
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

import { useRoutes } from "react-router-dom";

import Layout from "../components/Layout/Layout";

import App from "../App";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import StorePage from "../pages/StorePage/StorePage";
import Notfound from "../pages/NotFound/Notfound";
import LayoutWithoutNav from "../components/Layout/LayoutWithoutSidebar";
import ResultPage from "../pages/ResultPage/ResultPage";
import ChatPage from "../pages/ChatPage/ChatPage";

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
      path: "/chat",
      element: <Layout />,
      children: [
        {
          path: "/chat/:storeId/:userId",
          element: <ProtectedRoute element={<ChatPage />} />,
        },
      ],
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
      path: "/search",
      element: <Layout />,
      children: [
        {
          path: "/search",
          element: <ProtectedRoute element={<ResultPage />} />,
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

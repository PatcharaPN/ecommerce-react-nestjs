import { useRoutes } from "react-router-dom";

import Layout from "../components/layout";
import { EditPage } from "../pages/editPage/editPage";
import App from "../App";
import LoginPage from "../pages/LoginPage/LoginPage";

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "/", element: <App /> }],
    },
    {
      path: "/addproducts",
      element: <Layout />,
      children: [{ path: "/addproducts", element: <EditPage /> }],
    },
    {
      path: "/login",
      children: [{ path: "/login", element: <LoginPage /> }],
    },
  ]);

  return routes;
};

export default Routes;

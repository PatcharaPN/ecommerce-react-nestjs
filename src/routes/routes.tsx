import { useRoutes } from "react-router-dom";

import Layout from "../components/layout";

import App from "../App";

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "/", element: <App /> }],
    },
  ]);

  return routes;
};

export default Routes;

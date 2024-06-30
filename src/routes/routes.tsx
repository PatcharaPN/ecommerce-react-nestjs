import { useRoutes } from "react-router-dom";

import Layout from "../components/layout";
import Homepage from "../pages/homepage/homepage";

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "/", element: <Homepage /> }],
    },
  ]);

  return routes;
};

export default Routes;

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header";

const Layout = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/login"]; // Add more paths if needed

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideHeader && <Header />}
      <Outlet />
    </div>
  );
};

export default Layout;

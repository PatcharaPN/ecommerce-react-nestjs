import { Outlet, useLocation } from "react-router-dom";
import "./Layout.css";
import Drawer from "../Drawer/Nav";

const LayoutWithoutNav = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/login"];

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <div className="layout-container">
      {!shouldHideHeader && <Drawer />}
      <div className="content-container-withoutnav">
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutWithoutNav;

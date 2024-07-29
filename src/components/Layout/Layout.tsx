import { Outlet, useLocation } from "react-router-dom";
import SidebarLeft from "../Sidebar-left/Sidebar-left";
import "./Layout.css";
import SidebarRight from "../Sidebar-right/Sidebar-right";
import Drawer from "../Drawer/Nav";

const Layout = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/login"];

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <div className="layout-container">
      {!shouldHideHeader && <Drawer />}
      <div className="content-container">
        <div></div>
        <main className="main-content">
          <Outlet />
        </main>
        <div></div>
      </div>
    </div>
  );
};

export default Layout;

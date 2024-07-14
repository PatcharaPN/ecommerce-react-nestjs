import { Outlet, useLocation } from "react-router-dom";
import SidebarLeft from "../Sidebar-left/Sidebar-left";
import "./Layout.css";
import SidebarRight from "../Sidebar-right/Sidebar-right";
import Header from "../Header/Header";

const Layout = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/login"];

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <div className="layout-container">
      {!shouldHideHeader && <Header />}
      <div className="content-container">
        <SidebarLeft />
        <main className="main-content">
          <Outlet />
        </main>
        <SidebarRight />
      </div>
    </div>
  );
};

export default Layout;

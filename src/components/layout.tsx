import { Outlet, useLocation } from "react-router-dom";
import Header from "./header";
import SidebarLeft from "./SidebarFilter/sidebar";
import "./layout.css";
import SidebarRight from "./SidebarFilter/sidebarRight";

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

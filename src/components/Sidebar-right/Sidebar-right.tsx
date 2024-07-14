import "./Sidebar-right.css";
import { Icon } from "@iconify/react";
const SidebarRight = () => {
  return (
    <aside className="sidebar-right">
      <div className="filter">
        <button className="filter-btn">Filter</button>
        <Icon icon="lucide:filter" />
      </div>
    </aside>
  );
};

export default SidebarRight;

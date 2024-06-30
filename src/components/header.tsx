import { Icon } from "@iconify/react";
import "./header.css";
import { useState } from "react";

const Header: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    console.log("clicked");
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="header-con">
      <div className="logo">
        <Icon icon="solar:figma-outline" />
      </div>
      <div className="search-bar">
        <div className="search-container">
          <input className="searchbar" type="text" placeholder="Search" />
          <Icon icon="ic:baseline-search" className="search-icon" />
        </div>
      </div>
      <div className="menu">
        <Icon className="icon" icon="majesticons:chat-line" />
        <Icon className="icon" icon="mdi:cart-outline" />
        <div className="user-con" onClick={toggleDrawer}>
          PC
        </div>
      </div>
      <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawer-content">
          <div className="close-drawer" onClick={toggleDrawer}>
            <Icon icon="ep:close" />
          </div>
          <div className="user-container">
            <div>Username</div>
            <div>UID</div>
            <div className="user-profile"></div>
          </div>
          <ul className="list">
            <li>Profile</li>
            <li>Favorite</li>
            <li>My Addresses</li>
            <li>Bank Accounts</li>
            <li>Help Centre</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

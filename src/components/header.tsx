import { Icon } from "@iconify/react";
import "./header.css";
import { useEffect, useState } from "react";
import { Cart } from "./cart/cart";

interface User {
  email: number;
  name: string;
  username: string;
  tel: number;
  userImage: string;
}
const Header: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const jsonData = localStorage.getItem("user");
    if (jsonData) {
      const parsedData: User = JSON.parse(jsonData);
      setUser(parsedData);
    }
  }, []);
  const toggleDrawer = () => {
    console.log("clicked");
    setDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
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
        <Cart />
        <div className="user-con" onClick={toggleDrawer}>
          <img src={user?.userImage} width={40} height={40} alt="" />
        </div>
      </div>
      <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawer-content">
          <div className="close-drawer" onClick={toggleDrawer}>
            <Icon icon="ep:close" />
          </div>
          <div className="user-container">
            <div className="username">
              <div>{user ? user.username : "Guest"}</div>
              <div>UID</div>
            </div>
            <div className="user-profile">
              <img
                className="user-img"
                src={user?.userImage}
                width={100}
                height={100}
                alt=""
              />
            </div>
          </div>
          <div className="drawer-menu">
            <ul className="list">
              <li>Profile</li>
              <li>Favorite</li>
              <li>My Addresses</li>
              <li>Bank Accounts</li>
              <li>Help Centre</li>
            </ul>
          </div>
          <div className="logout">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

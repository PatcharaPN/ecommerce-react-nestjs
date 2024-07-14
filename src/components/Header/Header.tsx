import { Icon } from "@iconify/react";
import "./Header.css";
import { useEffect, useState } from "react";
import { Cart } from "../Cart/cart";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { getProducts } from "../../app/features/productSlice";

interface User {
  email: number;
  name: string;
  username: string;
  role: string;
  tel: number;
  userImage: string;
}
const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
      <div className="search-bar"></div>

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
            <Icon
              icon="ep:close"
              className="close-icon"
              width={20}
              height={20}
            />
          </div>
          <div className="user-container">
            <div className="username">
              <div className="name">{user ? user.username : "Guest"}</div>
              <div>{user?.role}</div>
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
          <div className="drawer-background">
            <div className="drawer-menu">
              <ul className="list">
                <div className="menu-list">
                  <Icon icon="gg:profile" />
                  <li>Your Profile</li>
                </div>
                {user?.role === "merchant" ? (
                  <div className="menu-list">
                    <Icon icon="material-symbols:store-outline" />
                    <li>Your Store</li>
                  </div>
                ) : null}
                <div className="menu-list">
                  <Icon icon="material-symbols:favorite-outline" />
                  <li>Favorite</li>
                </div>
              </ul>
            </div>
          </div>
          <div className="logout">
            <button className="logout-btn" onClick={handleLogout}>
              <Icon icon="ic:round-logout" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

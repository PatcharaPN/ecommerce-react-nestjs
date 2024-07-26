import { Icon } from "@iconify/react";
import "./Drawer.css";
import { useEffect, useState } from "react";
import { Cart } from "../Cart/cart";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "../../app/store";
import { getProducts } from "../../app/features/productSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProfileModal from "../Profile-edit/userProfile";
import Searchbar from "../SearchBar/Searchbar";

const Drawer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const user = useAppSelector((state: RootState) => state.auth.currentUser);
  const [storeId, setStoreId] = useState(null);
  const url = `/store/${storeId}?userId=${user._id}`;

  useEffect(() => {
    dispatch(getProducts());
    const storeIdString = localStorage.getItem("storeId");
    if (storeIdString) {
      try {
        const storeId = JSON.parse(storeIdString);
        setStoreId(storeId);
        console.log(storeId);
      } catch (e) {
        console.error("Failed to parse storeId:", e);
      }
    }
  }, [dispatch]);

  const toggleDrawer = () => {
    console.log("clicked");
    console.log(user);

    setDrawerOpen(!isDrawerOpen);
  };

  const toggleModal = () => {
    setModalOpen(true);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("storeId");
    window.location.reload();
  };

  return (
    <div className="header-con">
      <ProfileModal isOpen={ModalOpen} onClose={() => setModalOpen(false)} />
      <Link to={"/"}>
        <div className="logo">
          <img
            src="../../../public/logo.svg"
            width={125}
            alt=""
            className="logo-img"
          />
        </div>
      </Link>
      <div className="search-bar">
        <Searchbar />
      </div>
      <div className="menu">
        <div className="chat">
          <Icon className="chat-icon" icon="majesticons:chat-line" />
        </div>

        <Cart />
        <div className="user-con" onClick={toggleDrawer}>
          <img
            src={user?.userImage}
            width={40}
            height={40}
            className="user-profile-mini"
            alt=""
          />
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
              <motion.img
                onClick={toggleModal}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "black",
                  opacity: 0.5,
                }}
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
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  <div className="menu-list" onClick={toggleDrawer}>
                    <Icon icon="majesticons:home-line" />
                    <li>Home</li>
                  </div>
                </Link>

                <div className="menu-list">
                  <Icon icon="gg:profile" />
                  <li>Your Profile</li>
                </div>
                {user?.role === "merchant" ? (
                  <Link
                    to={url}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="menu-list" onClick={toggleDrawer}>
                      <Icon icon="material-symbols:store-outline" />
                      <li>Your Store</li>
                    </div>
                  </Link>
                ) : null}
                <div className="menu-list">
                  <Icon icon="material-symbols:favorite-outline" />
                  <li>Favorite</li>
                </div>
              </ul>
            </div>
          </div>
          <div className="logout">
            <motion.button
              className="logout-btn"
              onClick={handleLogout}
              whileTap={{ scale: 0.9 }}
            >
              <Icon icon="ic:round-logout" />
              Logout
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;

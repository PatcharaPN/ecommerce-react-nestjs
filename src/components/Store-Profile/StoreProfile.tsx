import React, { useEffect, useState } from "react";
import "./StoreProfile.css";
import { motion } from "framer-motion";

interface Store {
  name: string;
  location: string;
  description: string;
  following: number;
  like: number;
  products: string[];
}

const StoreProfile: React.FC = () => {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStore = localStorage.getItem("user");
    if (getStore) {
      const parsedData = JSON.parse(getStore).store;
      setStore(parsedData);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="store-page">
      <motion.div
        className="store-container"
        whileHover={{ scale: 0.991, filter: "brightness(70%)" }}
      >
        <img
          className="store-banner"
          src="https://rowmark.com.au/cdn/shop/products/clear-grey_1200x1200.gif?v=1605614979"
          alt="Store Banner"
        />
      </motion.div>
      <div className="store-image">
        <motion.img
          whileHover={{ scale: 0.991, filter: "brightness(80%)" }}
          className="store-profile-img"
          src="https://i.pinimg.com/280x280_RS/98/22/b4/9822b49357f41d2a3cce542ff1240b7f.jpg"
          alt="Store Profile"
        />
      </div>
      <div className="store-info">
        <div className="store-divider">
          <div className="store-name">
            <h1>{store?.name}</h1>
            <div className="store-location">@{store?.location}</div>
          </div>
          <motion.button className="edit-store" whileHover={{ scale: 1.05 }}>
            Edit Store
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default StoreProfile;

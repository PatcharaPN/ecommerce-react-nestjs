import React, { useEffect, useState } from "react";
import "./StoreProfile.css";
import { motion } from "framer-motion";

interface Store {
  name: string;
  location: string;
  description: string;
  following: number;
  like: number;
  storeimg: string;
  products: string[];
}

const StoreProfile: React.FC = () => {
  const [store, setStore] = useState<Store | any>(null);
  const [loading, setLoading] = useState(true);

  const loadStorageData = () => {
    const getStore = localStorage.getItem("user");
    if (getStore) {
      const parsedData = JSON.parse(getStore).store;
      setStore(parsedData);

      setLoading(false);

      console.log(store?.name ?? "Store not available");
    }
  };

  useEffect(() => {
    loadStorageData();
    const handleStorageChange = () => {
      loadStorageData();
    };
    window.addEventListener("storage", loadStorageData);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
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
          src={store?.[0]?.storeimg ?? store?.storeimg}
          alt="Store Profile"
        />
      </div>
      <div className="store-info">
        <div className="store-divider">
          <div className="store-name">
            <h1>{store?.[0]?.name ?? store?.name}</h1>
            <div className="store-location">
              @{store?.[0]?.location ?? store?.location}
            </div>
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

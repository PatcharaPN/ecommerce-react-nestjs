import React from "react";
import "./StoreProfile.css";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";

function StoreProfile() {
  return (
    <div>
      <div className="store-page">
        <motion.div
          className="store-container"
          whileHover={{ scale: 0.991, filter: "brightness(70%)" }}
        >
          <img
            className="store-banner"
            src="https://rowmark.com.au/cdn/shop/products/clear-grey_1200x1200.gif?v=1605614979"
            alt=""
          />
        </motion.div>
        <div className="store-image">
          <motion.img
            whileHover={{ scale: 0.991, filter: "brightness(80%)" }}
            className="store-profile-img"
            src="https://i.pinimg.com/280x280_RS/98/22/b4/9822b49357f41d2a3cce542ff1240b7f.jpg"
            alt=""
          />
        </div>
        <div className="store-info">
          <div className="store-divider">
            <div className="store-content">
              <div className="store-name">
                <h1>Store Name</h1>
                <Icon width={20} height={20} icon="tabler:edit" />
              </div>
            </div>
            <motion.button className="edit-store" whileHover={{ scale: 1.05 }}>
              Edit Store
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreProfile;

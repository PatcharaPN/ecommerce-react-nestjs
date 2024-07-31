import { motion } from "framer-motion";
import "./Categorymenu.css";
function Categorymenu() {
  return (
    <div className="category-container">
      <div className="category-menu">
        <motion.div whileHover={{ scale: 1.1 }} className="shortmenu">
          {" "}
          <div className="img-wrapper">
            <img src="../Beauty.svg" width={50} alt="" />{" "}
          </div>
          <p className="menu-text">Beauty</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="shortmenu">
          {" "}
          <div className="img-wrapper">
            <img src="../Sneaker.svg" width={50} alt="" />{" "}
          </div>
          <p className="menu-text">Sneaker</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="shortmenu">
          {" "}
          <div className="img-wrapper">
            <img src="../Pet.svg" width={50} alt="" />{" "}
          </div>
          <p className="menu-text">Pet</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="shortmenu">
          {" "}
          <div className="img-wrapper">
            <img src="../Games.svg" alt="" />
          </div>
          <p className="menu-text">Games</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="shortmenu">
          <div className="img-wrapper">
            <img src="../Electronic.svg" width={50} alt="" />
          </div>

          <p className="menu-text">Electronic</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="shortmenu">
          {" "}
          <div className="img-wrapper">
            <img src="../laptop.svg" width={50} alt="" />{" "}
          </div>
          <p className="menu-text">IT</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="shortmenu">
          {" "}
          <div className="img-wrapper">
            <img src="../Baby.svg" width={50} alt="" />{" "}
          </div>
          <p className="menu-text">Baby</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="shortmenu">
          {" "}
          <div className="img-wrapper">
            <img src="../Sport.svg" width={50} alt="" />{" "}
          </div>
          <p className="menu-text">Sports</p>
        </motion.div>
      </div>
    </div>
  );
}

export default Categorymenu;

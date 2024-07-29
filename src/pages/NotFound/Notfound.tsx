import React from "react";
import "./Notfound.css";
import Drawer from "../../components/Drawer/Nav";
import { Link } from "react-router-dom";
type Props = {};

const Notfound = () => {
  return (
    <div className="notfound-container">
      <img className="notfound-img" src="../404.png" width={500} alt="" />
      <div>
        Click <Link to={"/"}>here</Link> to get back to home page
      </div>
    </div>
  );
};

export default Notfound;

import "./categorymenu.css";
import { Icon } from "@iconify/react";
function Categorymenu() {
  return (
    <div className="category-container">
      <div className="category-menu">
        <div className="shortmenu">
          <Icon
            className="menuicon"
            icon="material-symbols:health-and-beauty-outline"
          />
          <p className="menu-text">Beauty</p>
        </div>
        <div className="shortmenu">
          <Icon className="menuicon" icon="ph:sneaker" />
          <p className="menu-text">Sneaker</p>
        </div>
        <div className="shortmenu">
          <Icon
            className="menuicon"
            icon="material-symbols:pet-supplies-outline"
          />
          <p className="menu-text">Pet</p>
        </div>
        <div className="shortmenu">
          <Icon className="menuicon" icon="gg:games" />
          <p className="menu-text">Games</p>
        </div>
        <div className="shortmenu">
          <Icon className="menuicon" icon="material-symbols:tv-outline" />
          <p className="menu-text">Electronic</p>
        </div>
        <div className="shortmenu">
          <Icon className="menuicon" icon="ic:baseline-laptop" />
          <p className="menu-text">IT</p>
        </div>
        <div className="shortmenu">
          <Icon className="menuicon" icon="ph:baby" />
          <p className="menu-text">Baby</p>
        </div>
        <div className="shortmenu">
          <Icon className="menuicon" icon="fluent:sport-16-regular" />
          <p className="menu-text">Sports</p>
        </div>
      </div>
    </div>
  );
}

export default Categorymenu;

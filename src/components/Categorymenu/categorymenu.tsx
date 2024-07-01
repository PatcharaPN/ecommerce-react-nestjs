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
          <div>Beauty</div>
        </div>
        <div className="shortmenu">
          <Icon className="menuicon" icon="ph:sneaker" />
          <div>Sneaker</div>
        </div>
        <div className="shortmenu">
          <Icon
            className="menuicon"
            icon="material-symbols:pet-supplies-outline"
          />
          <div>Pet</div>
        </div>
        <div className="shortmenu">
          <Icon className="menuicon" icon="gg:games" />
          <div>Games</div>
        </div>
        <div className="shortmenu">
          <Icon className="menuicon" icon="material-symbols:tv-outline" />
          <div>Electronic</div>
        </div>
        <div className="shortmenu">
          <Icon className="menuicon" icon="ic:baseline-laptop" />
          <div>IT</div>
        </div>
        <div className="shortmenu">
          <Icon className="menuicon" icon="ph:baby" />
          <div>Baby</div>
        </div>
        <div className="shortmenu">
          <Icon className="menuicon" icon="fluent:sport-16-regular" />
          <div>Sports</div>
        </div>
      </div>
    </div>
  );
}

export default Categorymenu;

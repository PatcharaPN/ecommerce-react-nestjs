import Newestlist from "../Newest-products/Newest-products";
import "./headermenu.css";
function Headermenu() {
  return (
    <div className="headermenu">
      <div className="news">
        {" "}
        <div className="text-header">News arrivals</div>
        <div className="text-underline">View more</div>
      </div>
      <div className="news-products"></div>
      <Newestlist />
    </div>
  );
}

export default Headermenu;

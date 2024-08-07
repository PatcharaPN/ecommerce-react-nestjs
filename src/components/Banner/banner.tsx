import { BigImage } from "./Banner-big";
import "./Banner.css";
interface BannerProps {
  LargeImage: string;
  smallImagetop: string;
  smallImagebot: string;
}
const Banner: React.FC<BannerProps> = ({ smallImagetop, smallImagebot }) => {
  return (
    <div className="banner-wrapper">
      <div className="banner-content1">
        <div className="image-section">
          <div className="large-image">
            <BigImage />
          </div>
          <div className="small-image top">
            <img
              className="banner-img"
              src={smallImagetop}
              alt="Small Image 1"
            />
          </div>
          <div className="small-image bottom">
            <img
              className="banner-img"
              src={smallImagebot}
              alt="Small Image 2"
            />
          </div>
        </div>
      </div>
      <div className="banner-content1-slider"></div>
    </div>
  );
};

export default Banner;

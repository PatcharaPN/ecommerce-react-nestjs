import "./banner.css";
interface BannerProps {
  LargeImage: string;
  smallImagetop: string;
  smallImagebot: string;
}
const Banner: React.FC<BannerProps> = ({
  LargeImage,
  smallImagetop,
  smallImagebot,
}) => {
  return (
    <div className="banner-wrapper">
      <div className="banner-content1">
        <div className="image-section">
          <div className="large-image">
            <img className="banner-img" src={LargeImage} alt="Large Image" />
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
      <div className="banner-content1-slider">
        <img src={LargeImage} width={300} height={100} alt="" />
      </div>
    </div>
  );
};

export default Banner;

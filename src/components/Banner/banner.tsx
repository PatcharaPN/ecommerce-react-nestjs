import "./banner.css";
function Banner() {
  return (
    <div>
      <div className="banner-content1">
        <div className="image-section">
          <div className="large-image">
            <img
              className="fullsizeimg"
              src="https://i.pinimg.com/736x/d4/4e/5e/d44e5ec4f6f835cf7e5e018926d872d8.jpg"
              alt="Large Image"
            />
          </div>
          <div className="small-image top">
            <img
              className="fullsizeimg"
              src="https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg"
              alt="Small Image 1"
            />
          </div>
          <div className="small-image bottom">
            <img
              className="fullsizeimg"
              src="https://img.freepik.com/premium-photo/photocomposition-horizontal-shopping-banner-with-woman-big-smartphone_23-2151201773.jpg"
              alt="Small Image 2"
            />
          </div>
        </div>
      </div>
      <div className="banner-content1-slider">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/004/707/493/small_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg"
          width={300}
          height={100}
          alt=""
        />
      </div>
    </div>
  );
}

export default Banner;

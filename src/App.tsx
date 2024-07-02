import Banner from "./components/Banner/banner";
import Categorymenu from "./components/Categorymenu/categorymenu";
import NewProductList from "./components/Product card/newproductList";
import Headermenu from "./components/headermenu/headermenu";
import ProductList from "./components/Product card/productList";
const App: React.FC = () => {
  return (
    <div>
      <Banner
        LargeImage="https://img.freepik.com/premium-photo/photocomposition-horizontal-shopping-banner-with-woman-big-smartphone_23-2151201773.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1719792000&semt=ais_user"
        smallImagetop="https://c8.alamy.com/comp/2H4RC9Y/ecommerce-web-banner-with-3d-smartphone-illustration-with-shopping-bags-wallet-and-credit-card-icons-pump-out-of-screen-2H4RC9Y.jpg"
        smallImagebot="https://t4.ftcdn.net/jpg/03/20/46/13/360_F_320461388_5Snqf6f2tRIqiWlaIzNWrCUm1Ocaqhfm.jpg"
      />
      <Categorymenu />
      <Headermenu />
      <NewProductList />
      <Banner
        LargeImage="https://static.vecteezy.com/system/resources/previews/002/006/614/non_2x/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-pink-backgroud-for-banner-market-ecommerce-free-vector.jpg"
        smallImagetop="https://www.shutterstock.com/image-vector/shopping-online-on-phone-podium-260nw-1886650081.jpg"
        smallImagebot="https://static.vecteezy.com/system/resources/thumbnails/002/006/775/small_2x/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg"
      />
      <ProductList />
    </div>
  );
};

export default App;

import Banner from "./components/Banner/banner";
import Categorymenu from "./components/Categorymenu/categorymenu";
import ProductCard from "./components/Product card/productCard";
const App: React.FC = () => {
  return (
    <div>
      <Banner />
      <Categorymenu />
      <ProductCard />
    </div>
  );
};

export default App;

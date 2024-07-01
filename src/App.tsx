import Banner from "./components/Banner/banner";
import Categorymenu from "./components/Categorymenu/categorymenu";
import ProductList from "./components/Product card/productList";
import Headermenu from "./components/headermenu/headermenu";
const App: React.FC = () => {
  return (
    <div>
      <Banner />
      <Categorymenu />
      <Headermenu />
      <ProductList />
    </div>
  );
};

export default App;

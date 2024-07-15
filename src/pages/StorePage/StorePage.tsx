import StoreProductList from "../../components/Store-product/StoreProduct-list";
import StoreProfile from "../../components/Store-Profile/StoreProfile";
import StoreDescription from "./components/StoreDescription/Store-Description";

type Props = {};

function StorePage({}: Props) {
  return (
    <div>
      <StoreProfile />
      <StoreDescription />
      <StoreProductList />
    </div>
  );
}

export default StorePage;

import { useEffect, useState } from "react";
import { getProducts, Product } from "../../app/features/productSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../app/store";
import ProductCard from "../Productcard/ProductCard";
import "./Newest-products.css";

const Newestlist = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state: RootState) => state.product.products);
  const [newest, setNewest] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const sortedProducts = [...products].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setNewest(sortedProducts.slice(0, 4));
    }
  }, [products, dispatch]);

  return (
    <div className="newest-products-list">
      {newest.map((newest) => (
        <div className="news-icon-wrapper">
          <div className="news-icon">News</div>
          <ProductCard product={newest} onClick={() => {}} />
        </div>
      ))}
    </div>
  );
};

export default Newestlist;

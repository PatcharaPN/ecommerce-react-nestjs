import { useEffect, useState } from "react";
import "./ResultPage.css";
import StoreCard from "./components/StoreCard";
import { useLocation } from "react-router-dom";
import {
  getProducts,
  getStores,
  Product,
  Store,
} from "../../app/features/productSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";
import ProductCard from "../../components/Productcard/ProductCard";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const ResultPage = () => {
  const dispatch = useAppDispatch();
  const query = useQuery().get("query") || "";
  const products = useAppSelector((state) => state.product.products);
  const stores = useAppSelector((state) => state.product.stores);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [storeResults, setStoreResults] = useState<Store[]>([]);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getStores());
  }, [dispatch]);

  useEffect(() => {
    if (query && stores.length > 0) {
      const storeresult = stores.filter((store) =>
        store.name.toLowerCase().includes(query.toLowerCase())
      );
      setStoreResults(storeresult);
    }
  }, [query, stores]);

  useEffect(() => {
    if (query && products.length > 0) {
      const result = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(result);
    }
  }, [query, products]);

  return (
    <div>
      <div className="result-header">
        <h3>Search result for ...</h3>
        <p className="view-more">Other store </p>
      </div>

      <div className="divider"></div>
      <div className="store-result">
        <div className="store-list">
          {storeResults.map((store, index) => (
            <StoreCard
              key={index}
              name={store.name}
              owner={store.name}
              description={store.description}
              location={store.location}
              storeimg={store.storeimg}
            />
          ))}
        </div>

        <div className="produc-result-list">
          <div className="search-result-header">
            Product result for "{query}"
          </div>
          <div className="search-results-container">
            {searchResults.length === 0 ? (
              <div>No results found</div>
            ) : (
              <div className="search-results-grid">
                {searchResults.map((product: Product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onClick={() => {}}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;

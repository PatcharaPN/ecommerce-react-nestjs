import React, { useCallback, useEffect, useState } from "react";
import "./Product-list.css";
import { useAppDispatch, useAppSelector } from "../../app/store";

import {
  getProducts,
  getStores,
  Product,
} from "../../app/features/productSlice";
import ProductCard from "../Productcard/ProductCard";
import { ProductModal } from "../Product-modal/Product-modal";

const ProductList: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const products = useAppSelector((state) => state.product.products);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const fetchProducts = useCallback(async () => {
    try {
      await dispatch(getProducts());
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const fetchStores = useCallback(async () => {
    try {
      await dispatch(getStores());
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
    fetchStores();
  }, [fetchProducts, fetchStores]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product-list-container">
      <div className="filter-products"></div>
      <div className="product-list-wrapper">
        <div className="product-list">
          {products.length === 0 ? (
            <div>Products not found</div>
          ) : (
            products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))
          )}
          {isModalOpen && selectedProduct && (
            <ProductModal
              store={selectedProduct.store}
              product={selectedProduct}
              closeModal={handleModalClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

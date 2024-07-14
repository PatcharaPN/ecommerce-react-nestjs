import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import "./Product-list.css";
import { useAppDispatch } from "../../app/store";

import { getProducts, Product } from "../../app/features/productSlice";
import ProductCard from "../Productcard/ProductCard";
import { ProductModal } from "../Product-modal/Product-modal";

const ProductList: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await dispatch(getProducts()).unwrap();
      setProducts(response);
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    console.log(selectedProduct);

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

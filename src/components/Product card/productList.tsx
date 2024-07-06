import React, { useCallback, useEffect } from "react";
import ProductCard from "./productCard";
import { useState } from "react";
import "./productList.css";
import { useAppDispatch } from "../../app/store";
import { ProductModal } from "../product-modal/product-modal";
import { getProducts, Product } from "../../app/features/productSlice";

const ProductList: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
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

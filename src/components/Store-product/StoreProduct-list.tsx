import React, { useState } from "react";
import "./StoreProduct-list.css";
import { useAppSelector } from "../../app/store";
import { Product, selectProducts } from "../../app/features/productSlice";
import ProductCard from "../Productcard/ProductCard";
import { ProductModal } from "../Product-modal/Product-modal";
import { selectUser } from "../../app/features/authSlice";
import { selectLoading } from "../../app/features/productSlice";

const StoreProductList: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectLoading);

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => product.store._id === user?.store?._id)
    : [];

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
      <div className="store-product-list-wrapper">
        {loading ? (
          <div className="spinner"></div>
        ) : filteredProducts.length === 0 ? (
          <div>Products not found</div>
        ) : (
          filteredProducts.map((product, index) => (
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
  );
};

export default StoreProductList;
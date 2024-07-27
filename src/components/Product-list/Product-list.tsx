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
import { Icon } from "@iconify/react/dist/iconify.js";

const ProductList: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const products = useAppSelector((state) => state.product.products);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

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

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="product-list-container">
      <div className="filter-products"></div>
      <div className="product-list-wrapper">
        <div className="product-list">
          {currentProducts.length === 0 ? (
            <div>Products not found</div>
          ) : (
            currentProducts.map((product, index) => (
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
      </div>{" "}
      <div className="pagination">
        <button
          className="pagination-btn previous-btn"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <Icon icon="eva:arrow-ios-back-fill" />
        </button>
        <span className="page-number">Page {currentPage}</span>
        <button
          className="pagination-btn next-btn"
          onClick={handleNextPage}
          disabled={indexOfLastProduct >= products.length}
        >
          <Icon icon="ic:round-navigate-next" />
        </button>
      </div>
    </div>
  );
};

export default ProductList;

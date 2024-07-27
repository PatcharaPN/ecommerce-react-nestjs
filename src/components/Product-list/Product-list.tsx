import React, { useCallback, useEffect, useState } from "react";
import "./Product-list.css";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  getCategory,
  getProducts,
  getStores,
  Product,
  Category,
} from "../../app/features/productSlice";
import ProductCard from "../Productcard/ProductCard";
import { ProductModal } from "../Product-modal/Product-modal";
import { Icon } from "@iconify/react/dist/iconify.js";

const ProductList: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const products = useAppSelector((state) => state.product.products);
  const category = useAppSelector((state) => state.product.category);
  const [productsCategory, setProductsCategory] = useState<Product[]>(products);
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
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
    fetchStores();
  }, [fetchProducts, fetchStores]);
  useEffect(() => {
    setProductsCategory(products);
  }, [products]);
  useEffect(() => {
    setProductsCategory(products);
  }, [products]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = productsCategory.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleCategoryChange = (selectedCategoryId: string) => {
    if (selectedCategoryId === "") {
      setProductsCategory(products);
    } else {
      const filteredProducts = products.filter((product) => {
        return product.category && product.category._id === selectedCategoryId;
      });
      console.log("Filtered Products:", filteredProducts);
      setProductsCategory(filteredProducts);
    }
  };

  return (
    <div className="product-list-container">
      <select
        id="product-select"
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option className="selector" value="">
          --Please choose a Category--
        </option>
        {category.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <div className="filter-products"></div>
      <div className="product-list-wrapper">
        <div className="product-list">
          {currentProducts.length === 0 ? (
            <div>Products not found</div>
          ) : (
            currentProducts.map((product) => (
              <ProductCard
                key={product._id}
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
          disabled={indexOfLastProduct >= productsCategory.length}
        >
          <Icon icon="ic:round-navigate-next" />
        </button>
      </div>
    </div>
  );
};

export default ProductList;

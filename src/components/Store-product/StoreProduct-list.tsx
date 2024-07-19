import React, { useState } from "react";
import "./StoreProduct-list.css";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  Product,
  selectProducts,
  submitProduct,
} from "../../app/features/productSlice";
import ProductCard from "../Productcard/ProductCard";
import { ProductModal } from "../Product-modal/Product-modal";
import { selectUser } from "../../app/features/authSlice";
import { selectLoading } from "../../app/features/productSlice";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { FormValues } from "../../types/types";

const StoreProductList: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectLoading);
  const [file, setFile] = useState<File | null>(null);
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    file: null,
    store: "",
  });

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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
    dispatch(submitProduct(formValues));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    console.log(e.target.files);
    setFormValues({
      ...formValues,
      file: URL.createObjectURL(e.target.files[0]),
      store: user?.store?._id,
    });
    console.log(file);
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
        <div className="create-product">
          <button
            onClick={() => setOpenModal(!openModal)}
            className="create-product-button"
          >
            <Icon icon="carbon:add" />
          </button>
        </div>
        <dialog open={openModal} className="createproduct-modal">
          <div className="modal-content">
            <div className="close-btn" onClick={() => setOpenModal(false)}>
              <Icon icon="material-symbols:close" />
            </div>
            <div className="create-product-grid">
              <div className="product-image-import">
                <input type="file" src="" alt="" onChange={handleChange} />
                {formValues.file && (
                  <img
                    width={600}
                    src={formValues.file}
                    alt="Uploaded file preview"
                  />
                )}
              </div>
              <div className="create-product-form">
                <form action="" onSubmit={handleSubmit}>
                  <div>
                    Product name{" "}
                    <input
                      type="name"
                      name="name"
                      placeholder="Product name"
                      value={formValues.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    Product description
                    <input
                      type="text"
                      name="description"
                      placeholder="Product description"
                      value={formValues.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    Product description
                    <input
                      type="number"
                      name="price"
                      placeholder="Product price"
                      value={formValues.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    Product Quantity
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Product price"
                      value={formValues.quantity}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <button
                      className="create-btn"
                      onClick={() => setOpenModal(false)}
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default StoreProductList;

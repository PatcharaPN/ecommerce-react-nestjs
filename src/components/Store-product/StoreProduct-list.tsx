import React, { useEffect, useState } from "react";
import "./StoreProduct-list.css";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  deleteProduct,
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
  const [storeId, setStoreId] = useState<string>("");
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
    store: storeId,
  });
  const [localProducts, setLocalProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedStoreId = localStorage.getItem("storeId");
    if (storedStoreId) {
      try {
        const parsedStoreId = JSON.parse(storedStoreId);
        setStoreId(parsedStoreId);
      } catch (e) {
        console.error("Failed to parse storeId:", e);
      }
    }
  }, []);

  useEffect(() => {
    const getStore = localStorage.getItem("user");
    if (getStore) {
      const userStoreId = JSON.parse(getStore).store?._id;
      if (userStoreId) {
        setStoreId(userStoreId);
        console.log("user store id:", userStoreId);
      }
    }
  }, []);

  useEffect(() => {
    setLocalProducts(
      Array.isArray(products)
        ? products.filter((product) => product.store?._id === storeId)
        : []
    );
  }, [products, user, storeId]);

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      store: storeId,
    }));
  }, [storeId]);
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
    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("description", formValues.description);
    formData.append("price", formValues.price.toString());
    formData.append("quantity", formValues.quantity.toString());
    formData.append("store", formValues.store);
    if (file) {
      formData.append("image", file);
    }

    dispatch(submitProduct(formData))
      .unwrap()
      .then((newProduct: Product) => {
        if (newProduct.store) {
          setLocalProducts([...localProducts, newProduct]);
        } else {
          console.error("New product does not have a store field.");
        }
      })
      .catch((error) => {
        console.error("Failed to submit product:", error);
      });

    console.log(formValues);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => {
        setLocalProducts(localProducts.filter((product) => product._id !== id));
      });
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFormValues({
        ...formValues,
        file: URL.createObjectURL(selectedFile),
        store: storeId,
      });
    }
  };

  return (
    <div className="product-list-container">
      <div className="filter-products"></div>
      <div className="store-product-list-wrapper">
        {loading ? (
          <div className="spinner"></div>
        ) : localProducts.length === 0 ? (
          <div>Products not found</div>
        ) : (
          localProducts.map((product) => (
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              key={product._id}
            >
              <div className="product-delete-btn">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#C94242",
                    transition: { duration: 0.2 },
                  }}
                  className="delete-btn"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </motion.button>
                <ProductCard
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              </div>
            </motion.div>
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
          <div className="modal-content-product">
            <div className="close-btn" onClick={() => setOpenModal(false)}>
              <Icon icon="material-symbols:close" />
            </div>
            <div className="create-product-grid">
              <div className="product-image-import">
                <input type="file" onChange={handleUpload} />
                {formValues.file && (
                  <div className="product-preview">
                    <p>Preview</p>
                    <img
                      width={400}
                      src={formValues.file}
                      alt="Uploaded file preview"
                    />
                  </div>
                )}
              </div>
              <div className="create-product-form">
                <form onSubmit={handleSubmit}>
                  <div className="create-product-form">
                    Product name
                    <input
                      type="text"
                      name="name"
                      placeholder="Product name"
                      value={formValues.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="create-product-form">
                    Product description
                    <input
                      type="text"
                      name="description"
                      placeholder="Product description"
                      value={formValues.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="create-product-form">
                    Product price
                    <input
                      type="number"
                      name="price"
                      placeholder="Product price"
                      value={formValues.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="create-product-form">
                    Product quantity
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Product quantity"
                      value={formValues.quantity}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="submit-button">
                    <button
                      className="create-btn"
                      type="submit"
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

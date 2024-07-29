import React, { useState } from "react";
import "./Product-modal.css";
import RatingComponent from "../Rating/ratingstar";
import { Icon } from "@iconify/react";
import { Product, Store } from "../../app/features/productSlice";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../app/features/cartSlice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { RootState, useAppSelector } from "../../app/store";

interface ProductModalProps {
  product?: Product;
  store: Store;
  closeModal: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  store,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const user = useAppSelector((state: RootState) => state.auth.currentUser);
  const navigate = useNavigate();
  const handleChatClick = () => {
    navigate(`/chat/${store._id}/${user._id}`);
  };
  console.log(product);

  const handleAddToCart = (product: Product) => {
    dispatch(addItemToCart(product));
    console.log("added to cart");
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };
  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.1 }}
        className="modal-product"
        onClick={handleClick}
      >
        <div className="modal-content">
          <span
            style={{ cursor: "pointer", float: "right", fontSize: "30px" }}
            className="close-btn"
            onClick={closeModal}
          >
            &times;
          </span>
          <div className="product-content">
            <div className="product-pic">
              <div className="product-img-wrapper">
                <img className="product-pic" src={product?.imageUrl} alt="" />
              </div>
            </div>
            <div className="product-detail">
              <h1>{product?.name}</h1>
              <div className="rating-section">
                <div className="rating">
                  <RatingComponent rating={2} />
                </div>

                <div className="like-share">
                  <Icon icon="ph:heart-bold" />
                  <Icon icon="lucide:share" />
                </div>
              </div>
              <div className="product-option">
                <div className="quantity">
                  <p>Quantity</p>
                  <div className="quantity-amount">
                    <Icon className="minus" icon="ic:baseline-minus" />
                    <input type="text" className="input" />
                    <Icon className="plus" icon="ic:baseline-plus" />
                  </div>
                </div>
              </div>
              <div className="buttonsection">
                <button className="shop-btn">Buy Now</button>
                <button
                  className="shop-btn"
                  onClick={() => handleAddToCart(product!)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="description-section">
            <div className="first-desc">
              <h3 className="detail-header">Details of Product</h3>
              <p>{product?.description}</p>
            </div>
          </div>
          <div className="shop-section">
            <div className="shop-picture">
              <img src={store.storeimg} className="shop-img" alt="" />
            </div>
            <div className="shop-information">
              <div className="shop-desc">
                <p className="shop-info name ">{store.name}</p>
                <p className="shop-info desc">{store.description}</p>
                <div className="follower-section">
                  <p className="shop-info follower">Follower</p>
                  <p className="shop-info following">Following</p>
                </div>
              </div>

              <div className="follow-btn-section">
                <button className="follow-btn">Follow</button>
                <button className="chat-btn" onClick={handleChatClick}>
                  Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

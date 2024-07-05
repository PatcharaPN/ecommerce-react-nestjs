import React from "react";
import "./product-modal.css";
import RatingComponent from "../star rating/ratingstar";
import { Icon } from "@iconify/react";

interface ProductModalProps {
  closeModal: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ closeModal }) => {
  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          {/* เนื้อหาของ Modal */}
          <div className="product-content">
            <div className="product-pic">
              <div className="pic"></div>
              <div className="another-pic">
                <div
                  className="pic-small
                "
                ></div>
                <div
                  className="pic-small
                "
                ></div>
                <div
                  className="pic-small
                "
                ></div>{" "}
                <div
                  className="pic-small
              "
                ></div>
              </div>
            </div>
            <div className="product-detail">
              <h1>Macbook Pro M1</h1>
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
                <button className="shop-btn">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

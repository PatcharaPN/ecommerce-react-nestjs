import { Icon } from "@iconify/react";
import { useState } from "react";
import "./cart.css";
import Divider from "../divider";

export const Cart: React.FC = () => {
  const [isopenCart, setisopenCart] = useState<boolean>(false);

  const handleClickCart = () => {
    setisopenCart(!isopenCart);
  };

  const closeModal = () => {
    setisopenCart(false);
  };

  return (
    <div className="cart-box">
      <div className="cart-btn" onClick={handleClickCart}>
        <Icon className="icon" icon="mdi:cart-outline" />
      </div>
      {isopenCart && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <div className="modal-mobile-section">
                <p>Shopping Cart</p>
              </div>
              <div className="modal-mobile-section-content">
                <div className="cart-content-mobile"></div>
              </div>
              <div className="cart-header">
                <div>
                  <p>Shopping Cart</p>
                </div>
                <div>
                  <p>Order Summary</p>
                </div>
              </div>

              <div className="class-container">
                <div className="cart-menu">
                  <Divider />
                  <div className="class-header-list">
                    <li className="list-item">Item</li>
                    <li className="product-info">Product Price</li>
                    <li className="product-info">Quantity</li>
                    <li className="product-info">Total Price</li>
                  </div>
                  <Divider />
                </div>

                <div className="cart-summary">
                  <div className="cart-summary-container">
                    <div className="cart-summary-header">
                      <div className="amount-section">
                        <p>Subtotal</p>
                        <p>Shipping Discount</p>
                        <p>Sales Tax</p>
                        <p>Total amount</p>
                      </div>
                      <div className="payment-section">
                        <p>{"$"}0</p>
                        <p>{"$"}0</p>
                        <p>{"$"}0</p>
                        <p>{"$"}0</p>
                      </div>
                    </div>

                    <div className="summary-content">
                      <button className="checkout-btn">Checkout</button>
                      <input
                        className="promo-input"
                        type="text"
                        placeholder="promo code"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="checkout-btn-mobile">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

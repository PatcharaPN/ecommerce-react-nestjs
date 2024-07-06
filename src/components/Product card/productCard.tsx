import React from "react";
import "./productCard.css";
import RatingComponent from "../star rating/ratingstar";
import { Product } from "../../app/features/productSlice";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return product ? (
    <div className="card-container" onClick={onClick}>
      <div className="image-wrapper">
        <div className="product-pic">
          <img className="product-img" src={product.productImage} alt="" />
        </div>
      </div>
      <div className="desc-product">
        <div>{product.title}</div>
        <div>{product.price}</div>
      </div>
      <div>
        <RatingComponent rating={product.rating} />
      </div>
    </div>
  ) : null;
};

export default ProductCard;

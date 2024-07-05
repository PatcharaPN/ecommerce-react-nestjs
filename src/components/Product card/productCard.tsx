import React from "react";
import "./productCard.css";
import RatingComponent from "../star rating/ratingstar";

interface ProductCardProps {
  title: string;
  price: number;
  productimage: string;
  rating: number;
  openModal: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  productimage,
  rating,
  openModal,
}) => {
  return (
    <div className="card-container" onClick={openModal}>
      <div className="image-wrapper">
        {" "}
        <div className="product-pic">
          <img className="product-img" src={productimage} alt="" />
        </div>
      </div>

      <div className="desc-product">
        <div>{title}</div>
        <div>{price}</div>
      </div>
      <div>
        <RatingComponent rating={rating} />
      </div>
    </div>
  );
};

export default ProductCard;

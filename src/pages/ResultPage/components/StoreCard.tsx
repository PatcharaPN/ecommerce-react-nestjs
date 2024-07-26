import React from "react";
import "./StoreCard.css";
import { Icon } from "@iconify/react/dist/iconify.js";

export type StoreCardProps = {
  name: string;
  description: string;
  location: string;
  owner: string;
  storeimg: string;
};

const StoreCard = (props: StoreCardProps) => {
  return (
    <div className="store-card">
      <div>
        <img className="store-card-img" src={props.storeimg} alt="" />
      </div>
      <div className="store-card-info">
        <div className="owner-info">
          <p className="store-name">{props.name}</p>
          <p className="owner">{props.owner}</p>
          <p className="location">{props.location}</p>
        </div>

        <p>{props.description}</p>
        <div className="product-count">
          <div className="product-count-wrapper">
            <Icon icon="icon-park-outline:ad-product" />
          </div>

          <p>Products</p>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;

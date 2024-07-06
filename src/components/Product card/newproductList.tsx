import React, { useState, useEffect } from "react";
import ProductCard from "./productCard";
import "./newproductList.css";

interface Product {
  id: number;
  title: string;
  price: number;
  productimage: string;
  rating: number;
}

const NewProductList: React.FC = () => {
  return <div className="product-list"></div>;
};

export default NewProductList;

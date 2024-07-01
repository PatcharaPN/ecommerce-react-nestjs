import React, { useState, useEffect } from "react";
import ProductCard from "./productCard";
import "./productList.css";

interface Product {
  id: number;
  title: string;
  price: number;
  productimage: string;
  rating: number;
}

const ProductList: React.FC = () => {
  const mockupProducts: Product[] = [
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://m.media-amazon.com/images/I/61HUaSA6c0L._AC_UY218_.jpg",
      rating: 4,
    },
    {
      id: 2,
      title: "Macbook Pro M2",
      price: 29.99,
      productimage:
        "https://m.media-amazon.com/images/I/61bwiPRcv2L._AC_UY218_.jpg",
      rating: 5,
    },
    {
      id: 3,
      title: "Macbook Pro M3",
      price: 39.99,
      productimage:
        "https://m.media-amazon.com/images/I/61lYIKPieDL._AC_UY218_.jpg",
      rating: 3,
    },
  ];

  const [products, setProducts] = useState<Product[]>(mockupProducts);

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          price={product.price}
          productimage={product.productimage}
          rating={product.rating}
        />
      ))}
    </div>
  );
};

export default ProductList;

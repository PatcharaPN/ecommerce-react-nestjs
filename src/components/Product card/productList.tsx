import React from "react";
import ProductCard from "./productCard";
import { useState } from "react";
import "./productList.css";
import { Icon } from "@iconify/react";
import { ProductModal } from "../product-modal/product-modal";

interface Product {
  id: number;
  title: string;
  price: number;
  productimage: string;
  rating: number;
}

const ProductList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const mockupProducts: Product[] = [
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
    {
      id: 1,
      title: "Macbook Pro M1",
      price: 19.99,
      productimage:
        "https://media-cdn.bnn.in.th/105757/Apple-MacBook-Pro-13-M1-chip-8C-CPU-7C-GPU-8GB-512GB-Space-Grey-2020-1-square_medium.jpg",
      rating: 4,
    },
  ];

  const [products, setProducts] = useState<Product[]>(mockupProducts);

  return (
    <div className="productlist-container">
      <div className="filter-product"></div>
      <div className="list-product-wrapper">
        <div className="list-product">
          {products.map((product) => (
            <ProductCard
              openModal={openModal}
              key={product.id}
              title={product.title}
              price={product.price}
              productimage={product.productimage}
              rating={product.rating}
            />
          ))}
          {isModalOpen && <ProductModal closeModal={closeModal} />}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

import React, { useEffect, useState } from "react";
import "./Searchbar.css";
import { getProducts, Product } from "../../app/features/productSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";

const Searchbar = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm !== "") {
      const result = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(result);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, products]);

  const handleonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  const handleSearchSubmit = () => {
    navigate(`/search?query=${searchTerm}`);
  };

  return (
    <div>
      <div className="searchbar">
        <Icon className="icon-search" icon="line-md:search" />
        <input
          type="text"
          placeholder="Search products.."
          className="searchbar-input"
          name="search"
          value={searchTerm}
          onChange={handleonChange}
        />
        <Link to={`/search?query=${searchTerm}`}>
          <div className="search-btn" onClick={handleSearchSubmit}>
            <Icon icon="line-md:search" />
          </div>
        </Link>
      </div>
      <div className="searchbar-results">
        {searchResults.map((product) => (
          <div className="searchbar-result-item" key={product._id}>
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Searchbar;

// CategoryContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const CategoryContext = createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

// Make sure you're using named export for CategoryProvider
export const CategoryProvider = ({ children }) => {
  const [categoryName, setCategoryName] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategoryProducts = async (category) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.example.com/products?category=${category}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const changeCategory = (category) => {
    setCategoryName(category);
    fetchCategoryProducts(category);
  };

  return (
    <CategoryContext.Provider
      value={{ categoryName, products, loading, error, changeCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

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
      // Fetch products based on the category from the API
      const response = await fetch(
        `http://localhost:4000/category/${category}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      // Filter data by category to ensure it matches
      const filteredProducts = data.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      setProducts(filteredProducts);
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

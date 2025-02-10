import React, { createContext, useContext, useState } from "react";

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

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  const fetchCategoryProducts = async (category) => {
    setLoading(true);
    try {
      // Fetch products based on the category from the API
      const response = await fetch(
        `${API_BASE_URL}/perfume?category=${category}`
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
      value={{
        categoryName,
        products,
        loading,
        error,
        changeCategory,
        fetchCategoryProducts,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

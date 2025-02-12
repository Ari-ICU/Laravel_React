import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const CategoryContext = createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
  const [categoryName, setCategoryName] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = "http://127.0.0.1:8000"; // Ensure this is the correct API URL

  // Fetch category products
  const fetchCategoryProducts = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/perfume/?category=${category}`
      );
      const data = await response.json();

      if (response.ok) {
        setProducts(data);
      } else {
        setError(data.message || "Error fetching products");
        setProducts([]); // Clear products if there was an error
      }
    } catch (error) {
      setError("Error fetching products");
      setProducts([]); // Clear products if the API call fails
    } finally {
      setLoading(false);
    }
  };

  // Handle category change (either from UI or route)
  const changeCategory = (category) => {
    setCategoryName(category);
  };

  // Effect to fetch products when the category changes
  useEffect(() => {
    if (categoryName) {
      fetchCategoryProducts(categoryName);
    }
  }, [categoryName]); // Re-run when categoryName changes

  return (
    <CategoryContext.Provider
      value={{
        categoryName,
        products,
        setProducts,
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

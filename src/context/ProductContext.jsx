import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create and export ProductContext
export const ProductContext = createContext();

// Custom hook for consuming the context
export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);

  const API_BASE_URL = "http://127.0.0.1:8000"; // Ensure this is correct

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/perfume/`, {
        headers: { "Content-Type": "application/json" },
      });
      setProducts(response.data);
      console.log("Fetched products", response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const fetchSingleProduct = async (productId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/perfume/${productId}`);
      setSingleProduct(response.data); // Set the single product
    } catch (error) {
      console.error("Failed to fetch product", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when component mounts
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        singleProduct,
        fetchProducts,
        fetchSingleProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

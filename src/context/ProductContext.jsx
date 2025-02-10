import React, { createContext, useState, useContext } from "react";
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
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);

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
      setError("Failed to fetch products. Please try again later.");
    }
  };

  const fetchSingleProduct = async (perfume_code) => {
    if (!perfume_code || typeof perfume_code !== "string") {
      setError("Invalid product code");
      return;
    }

    console.log("Fetching product with code:", perfume_code);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/perfume/${perfume_code}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const product = response.data;
      setSingleProduct(product);
      fetchRelatedProducts(product.category, product.id);
    } catch (error) {
      console.error("Failed to fetch product", error);
      setError(
        error.response?.data?.detail ||
          "Failed to fetch product. Please try again later."
      );
    }
  };

  const fetchRelatedProducts = async (category, currentProductId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/perfume?category=${category}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        const related = response.data.filter(
          (product) => product.id !== currentProductId
        );
        setRelatedProducts(related);
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        console.error("Backend returned an error:", error.response.data);
        setError(
          `Server error: ${error.response.status} - ${error.response.statusText}`
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        setError(
          "No response from server. Please check your network connection."
        );
      } else {
        // Error setting up the request
        console.error("Error setting up request:", error.message);
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        singleProduct,
        relatedProducts,
        fetchProducts,
        fetchSingleProduct,
        fetchRelatedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

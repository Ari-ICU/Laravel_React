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

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const fetchSingleProduct = async (productId) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      setSingleProduct(response.data); // Fakestore API does not wrap `product`
    } catch (error) {
      console.error("Failed to fetch product", error);
    }
  };

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

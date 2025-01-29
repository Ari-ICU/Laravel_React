import React, { createContext, useState, useContext } from "react";
import axios from "axios";

// Create and export ProductContext
export const ProductContext = createContext();

// Custom hook for consuming the context
export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post("/api/cart", { productId });
      setCart(response.data.cart);
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await axios.post("/api/wishlist", { productId });
      setWishlist(response.data.wishlist);
    } catch (error) {
      console.error("Failed to add to wishlist", error);
    }
  };

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
        cart,
        wishlist,
        products,
        singleProduct,
        addToCart,
        addToWishlist,
        fetchProducts,
        fetchSingleProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

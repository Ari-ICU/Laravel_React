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

  // Fetch all products with pagination
  const fetchProducts = async (page = 1) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/perfumes?page=${page}`);
      const fetchedProducts = response.data?.data || []; // Default to empty array if data is undefined

      setProducts((prevProducts) =>
        page === 1 ? fetchedProducts : [...prevProducts, ...fetchedProducts]
      );
      console.log(`Fetched page ${page}:`, fetchedProducts);
    } catch (error) {
      console.error("Failed to fetch products", error);
      setError("Failed to fetch products. Please try again later.");
    }
  };

  
  const fetchSingleProduct = async (id) => {
    console.log("Fetching product with ID:", id);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/perfumes/${id}`);
  
      if (response.status === 200) {
        const product = response.data;
        setSingleProduct(product);
        setError(null);
  
        // Fetch related products after getting the main product details
        fetchRelatedProducts(product);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      setError("Product not found");
      console.error("Error fetching product:", err);
    }
  };
  
  
  const fetchRelatedProducts = async (singleProduct) => {
    if (!singleProduct) return;
  
    const { brand_id, personality_id, origin_id, gender_id, id } = singleProduct;
  
    try {
      // Construct query parameters dynamically based on available product attributes
      const params = new URLSearchParams();
      if (brand_id) params.append("brand_id", brand_id);
      if (personality_id) params.append("personality_id", personality_id);
      if (origin_id) params.append("origin_id", origin_id);
      if (gender_id) params.append("gender_id", gender_id);
  
      // Fetch related products
      const response = await axios.get(
        `${API_BASE_URL}/api/perfumes?${params.toString()}`
      );
  
      // Log the response to debug the issue
      console.log("Related products response:", response);
  
      // Check if response is valid and an array
      if (response.status === 200 && Array.isArray(response.data)) {
        const related = response.data.filter((product) => product.id !== id); // Exclude the current product
        if (related.length > 0) {
          setRelatedProducts(related);
        } else {
          setRelatedProducts([]); // No related products, return an empty array
        }
      } else {
        throw new Error("Invalid response format or no data returned");
      }
    } catch (error) {
      console.error("Error fetching related products:", error.message);
      setRelatedProducts([]); // Ensure related products list is empty in case of an error
    }
  };
  
  
  

  return (
    <ProductContext.Provider
      value={{
        products,
        singleProduct,
        relatedProducts,
        error,
        fetchProducts,
        fetchSingleProduct,
        fetchRelatedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

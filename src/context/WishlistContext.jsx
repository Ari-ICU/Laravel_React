import React, { createContext, useState, useEffect } from "react";

// Context for Wishlist
const WishlistContext = createContext();

export const useWishlist = () => {
  const context = React.useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://127.0.0.1:8000"; // Your API base URL

  // Fetch the wishlist on component mount or when the wishlist changes
  const fetchWishlist = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${API_BASE_URL}/api/wishlist`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      const data = await response.json();
      setWishlist(data.data || []); // Ensure the fetched data is in the correct format
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError("Failed to fetch wishlist");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Add a product to the wishlist
  const addToWishlist = async (product) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${API_BASE_URL}/api/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ perfume_id: product.id }), // Ensure the backend expects perfume_id
      });
  
      if (!response.ok) {
        throw new Error("Failed to add to wishlist");
      }
  
      const data = await response.json();
      setWishlist((prevWishlist) => [...prevWishlist, data.data]); // Add to the wishlist state
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      setError("Failed to add to wishlist");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  

  // Remove a product from the wishlist
  const removeFromWishlist = async (item) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${API_BASE_URL}/api/wishlist/remove/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove from wishlist");
      }

      setWishlist((prevWishlist) =>
        prevWishlist.filter((i) => i.id !== item.id)
      ); // Remove from the wishlist state
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      setError("Failed to remove item from wishlist");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch wishlist on mount
  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, loading, error }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistContext, WishlistProvider };

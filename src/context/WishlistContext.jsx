import React, { createContext, useState, useEffect } from "react";

// Create a Context for the Wishlist
const WishlistContext = createContext();

export const useWishlist = () => {
  const context = React.useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the initial wishlist from the API when the component mounts
    fetch("/api/wishlist")
      .then((response) => response.json())
      .then((data) => setWishlist(data))
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
        setError("Failed to fetch wishlist");
      });
  }, []);

  const addToWishlist = async (product) => {
    try {
      const response = await fetch("YOUR_API_URL_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const responseText = await response.text();
      console.log("Response:", responseText);

      if (!response.ok) {
        throw new Error("Failed to add to wishlist");
      }

      const data = JSON.parse(responseText); // Manually parse the response
      console.log("Parsed data:", data);

      setWishlist((prevWishlist) => [...prevWishlist, data]);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      setError("Failed to add item to wishlist");
    }
  };

  const removeFromWishlist = (item) => {
    fetch(`/api/wishlist/${item.id}`, {
      method: "DELETE",
    })
      .then(() => setWishlist(wishlist.filter((i) => i.id !== item.id)))
      .catch((error) => {
        console.error("Error removing from wishlist:", error);
        setError("Failed to remove item from wishlist");
      });
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, error }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistContext, WishlistProvider };

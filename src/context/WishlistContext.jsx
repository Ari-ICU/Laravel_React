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

  useEffect(() => {
    // Fetch the initial wishlist from the API when the component mounts
    fetch("/api/wishlist")
      .then((response) => response.json())
      .then((data) => setWishlist(data))
      .catch((error) => console.error("Error fetching wishlist:", error));
  }, []);

  const addToWishlist = (item) => {
    fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => setWishlist([...wishlist, data]))
      .catch((error) => console.error("Error adding to wishlist:", error));
  };

  const removeFromWishlist = (item) => {
    fetch(`/api/wishlist/${item.id}`, {
      method: "DELETE",
    })
      .then(() => setWishlist(wishlist.filter((i) => i.id !== item.id)))
      .catch((error) => console.error("Error removing from wishlist:", error));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistContext, WishlistProvider };

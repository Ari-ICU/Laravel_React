// src/pages/WishlistPage.jsx

import React from "react";
import { motion } from "framer-motion";
import { useWishlist } from "../context/WishlistContext"; // Correct context import

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="container text-black mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>

      {/* Wishlist Display */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          wishlist.map((item) => (
            <motion.div
              key={item.id}
              className="p-4 bg-white rounded shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <button
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => removeFromWishlist(item)}
              >
                Remove
              </button>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default WishlistPage;

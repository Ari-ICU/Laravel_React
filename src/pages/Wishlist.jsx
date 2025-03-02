import React, { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { motion } from "framer-motion";
import { FaHeartBroken } from "react-icons/fa";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToWishlist } = useWishlist();
  const [showPopup, setShowPopup] = useState(false);

  // Function to show the popup
  const handleAddToWishlist = (item) => {
    addToWishlist(item);
    setShowPopup(true);

    // Hide the popup after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">My Wishlist</h1>

      {/* Show Popup Message */}
      {showPopup && (
        <motion.div
          className="fixed top-0 left-0 right-0 p-4 bg-green-500 text-white text-center font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Item added to wishlist!
        </motion.div>
      )}

      {/* Wishlist Display */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {wishlist?.length === 0 ? (
          <motion.div
            className="col-span-full text-center p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaHeartBroken size={48} className="text-red-500 mx-auto mb-4" />

            <p className="text-gray-600">
              Your wishlist is empty. Add items to your wishlist to see them
              here.
            </p>
          </motion.div>
        ) : (
          wishlist?.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white p-6 w-52 *:pt-1 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Show the image */}
              <div>
                <img
                  src={`http://localhost:8000${item?.perfume?.images}`}
                  alt={item?.perfume?.title || "Product Image"}
                  className="w-24 h-auto  mx-auto rounded-lg"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                {item?.perfume?.title || "Untitled Product"}
              </h2>

              {/* Show the price */}
              <div className="mt-4 text-lg font-semibold text-gray-900">
                ${item?.perfume?.price || "Price unavailable"}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition-colors"
                  onClick={() => removeFromWishlist(item)}
                >
                  Remove
                </button>

               
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Footer Section or Other Content */}
      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm">
          Love the items? You can always add them back to your cart and proceed
          to checkout.
        </p>
      </div>
    </div>
  );
};

export default WishlistPage;

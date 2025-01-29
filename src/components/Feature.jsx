import React, { useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext"; // Import useCart hook
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

const Feature = () => {
  const { products, fetchProducts } = useProduct();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  fetchProducts();

  if (!products || products.length === 0) {
    return (
      <motion.div
        className="max-w-sm mx-auto mt-10 mb-10 bg-white p-4 rounded-xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-red-500">No products available.</p>
      </motion.div>
    );
  }

  // Handle Add to Cart functionality
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  //Handle Add to cart
  const handleAddWishlist = (product) => {
    addToWishlist(product);
  };

  console.log(handleAddToCart, handleAddToCart);
  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-center text-white uppercase mb-6">
        Product Features
      </h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {products.slice(4, 10).map((product, index) => (
          <motion.div
            key={product.id}
            className="p-6 max-w-sm bg-white justify-center rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 space-y-4"
            initial={{ opacity: 0.4, y: -30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
            transition={{ delay: index * 0.2 }}
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={`Product: ${product.title}`}
                className="w-full h-40 object-cover rounded-md"
              />
            </Link>
            <Link to={`/product/${product.id}`}>
              <h2 className="text-xl font-semibold text-gray-800 hover:underline">
                {product.title}
              </h2>
            </Link>
            <p className="text-gray-500 truncate">{product.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-green-600">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>
            </div>
            <p className="text-yellow-500">
              Rating: {product.rating?.rate} ★ ({product.rating?.count} reviews)
            </p>
            <div className="flex justify-between items-center">
              <button
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 transition"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleAddWishlist(product)} // Add product to cart when clicked
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 transition"
              >
                Wishlist
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Feature;

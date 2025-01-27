import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Feature = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products data from an API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data.slice(4, 10)); // Display products 5 to 10
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <motion.div
        className="max-w-sm mt-10 mb-10 mx-auto bg-white p-4 rounded-xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-gray-500">Loading products...</p>
      </motion.div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        className="max-w-sm mx-auto bg-white p-4 rounded-xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-red-500">No products available.</p>
      </motion.div>
    );
  }

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
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="p-6 max-w-sm bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 space-y-4"
            initial={{ opacity: 0.4, y: -30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
            transition={{ delay: index * 0.2 }}
          >
            <img
              src={product.image}
              alt={`Product: ${product.title}`}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {product.title}
            </h2>
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
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 transition">
                Wishlist
              </button>

              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 transition">
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Feature;

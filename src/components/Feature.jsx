import React, { useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ButtonWishlist from "./ButtonWishlist";
import ButtonCart from "./ButtonCart";

const Feature = () => {
  const { products, fetchProducts } = useProduct();

  useEffect(() => {
    fetchProducts();
  }, []); // ✅ Added dependency

  if (!Array.isArray(products) || products.length === 0) {
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

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-center text-black uppercase mb-6">
        Product Features
      </h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {Array.isArray(products) &&
          products.slice(0, 6).map((product, index) => (
            <motion.div
              key={product.id}
              className="p-6 max-w-sm bg-[#FAF3E0] text-white justify-center rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 space-y-4"
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
              <p className="text-yellow-500">Rating: {product.rating} ★</p>
              <div className="flex justify-between items-center">
                <ButtonCart product={product} />
                <ButtonWishlist product={product} />
              </div>
            </motion.div>
          ))}
      </motion.div>
    </motion.div>
  );
};

export default Feature;

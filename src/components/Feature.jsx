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
  }, []);

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
      <h1 className="text-2xl font-bold text-center uppercase mb-6">
        Product Features
      </h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {products.slice(0, 6).map((product, index) => {

          return (
            <motion.div
              key={product.id}
              className="p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 space-y-4"
              initial={{ opacity: 0.4, y: -20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={`http://localhost:8000${product.images}`}
                  alt={`Product: ${product.title}`}
                  className="w-full h-40 object-cover rounded-md"
                />
              </Link>
              <Link to={`/product/${product.id}`}>
                <h2 className="text-lg font-semibold text-gray-900 hover:underline">
                  {product.title}
                </h2>
              </Link>
              <p className="text-gray-600 text-sm line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-green-600">
                  ${Number(product.price).toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">
                  Category: {product.category || "Uncategorized"}
                </p>
              </div>
              <p className={product.stock <= 0 ? "text-red-500" : "text-green-500"}>
                {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
              </p>
              <p className="text-yellow-500 text-sm">
                Rating: {product.rating || "No rating"} ★
              </p>
              <div className="flex flex-wrap gap-2 justify-between items-center">
                <ButtonCart product={product} /> {/* Pass product here */}
                <ButtonWishlist product={product} />
              </div>
            </motion.div>
          );
        })}

      </motion.div>
    </motion.div>
  );
};

export default Feature;

// Category.js
import React from "react";
import { motion } from "framer-motion";
import { useCategory } from "../context/CategoryContext";

const Category = () => {
  const { categoryName, products, loading, error } = useCategory(); // Get data from context

  if (loading) {
    return (
      <motion.p
        className="max-w-sm mx-auto mt-10 mb-10 bg-white rounded-xl shadow-lg space-y-4 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Loading...
      </motion.p>
    );
  }

  if (error) {
    return (
      <motion.p
        className="max-w-sm mx-auto mt-10 mb-10 bg-white rounded-xl shadow-lg space-y-4 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Error: {error}
      </motion.p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Category: {categoryName}
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <p>No products available in this category.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-500 text-sm">Price: ${product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Category;

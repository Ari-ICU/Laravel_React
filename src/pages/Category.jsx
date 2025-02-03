// Category.js
import React from "react";
import { motion } from "framer-motion";
import { useCategory } from "../context/CategoryContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ButtonCart from "../components/ButtonCart";
import ButtonWishlist from "../components/ButtonWishlist";

const Category = () => {
  const { categoryName } = useParams();
  const { products, loading, error } = useCategory();

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
        className="max-w-sm mx-auto mt-10 mb-10 bg-white rounded-xl shadow-lg space-y-4 "
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
        className="text-4xl text-white font-extrabold text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Category: {categoryName}
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {products.length === 0 ? (
          <p>No products available in this category.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={`Product: ${product.title}`}
                  className="w-full h-40 object-cover rounded-md"
                />
              </Link>
              <Link to={`/product/${product.id}`}>
                <h2 className="text-xl font-semibold">{product.title}</h2>
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
                Rating: {product.rating?.rate} ★ ({product.rating?.count}{" "}
                reviews)
              </p>
              <div className="flex justify-between items-center">
                <ButtonWishlist product={product} />
                <ButtonCart product={product} />
              </div>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default Category;

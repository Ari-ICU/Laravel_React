import React, { useEffect } from "react";
import { useCategory } from "../context/CategoryContext";
import { motion } from "framer-motion";
import ButtonCart from "../components/ButtonCart";
import ButtonWishlist from "../components/ButtonWishlist";

const CategoryPage = () => {
  const { categoryName, products, changeCategory } = useCategory();

  useEffect(() => {
    if (categoryName) {
      changeCategory(categoryName);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Category Title */}
      <h1 className="text-2xl font-bold text-center text-black uppercase mb-6">
        {categoryName} Perfumes
      </h1>
      {products.length === 0 && (
        <div className="text-center">
          <p className="text-gray-500">No products available.</p>
        </div>
      )}

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg py-2  p-4"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
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
      </div>
    </div>
  );
};

export default CategoryPage;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useProduct } from "../context/ProductContext";
import { Link } from "react-router-dom";
import ButtonWishlist from "./ButtonWishlist";
import ButtonCart from "./ButtonCart";

const RelatedProducts = ({ category }) => {
  const { relatedProducts, fetchRelatedProducts } = useProduct();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return; // Prevent unnecessary fetches

    const controller = new AbortController(); // ✅ Fix: Prevent memory leaks
    const fetchData = async () => {
      setError(null);
      try {
        await fetchRelatedProducts(category, { signal: controller.signal });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to fetch related products.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [category, fetchRelatedProducts]);

  if (loading) {
    return <p>Loading related products...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (relatedProducts.length === 0) {
    return <p>No related products available.</p>;
  }

  return (
    <div className="p-4 max-w-screen mx-auto">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {relatedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            className="p-6 max-w-sm bg-[#FAF3E0] text-white justify-center rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 space-y-4"
            initial={{ opacity: 0.4, y: -30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
            transition={{ delay: index * 0.2 }}
          >
            <Link to={`/product/${product.code}`}>
              <img
                src={product.image}
                alt={`Product: ${product.title}`}
                className="w-full h-40 object-cover rounded-md"
              />
            </Link>
            <Link to={`/product/${product.code}`}>
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
            {product.stock <= 0 ? (
              <p className="text-red-500">Out of Stock</p>
            ) : (
              <p className="text-green-500">In Stock: {product.stock}</p>
            )}
            <p className="text-yellow-500">
              Rating: {product.rating || "No rating"} ★
            </p>
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <ButtonCart product={product} />
              <ButtonWishlist product={product} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;

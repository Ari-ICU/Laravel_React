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
        {relatedProducts.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md space-y-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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

export default RelatedProducts;

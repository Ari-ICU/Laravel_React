import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useProduct } from "../context/ProductContext";
import { Link } from "react-router-dom";
import ButtonCart from "../components/ButtonCart";
import ButtonWishlist from "../components/ButtonWishlist";
import Spinner from "../components/Spinner"; // Import Spinner component

const Product = () => {
  const { fetchProducts, products } = useProduct();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setLoading(true);
    fetchProducts(page)
      .then(() => setLoading(false))
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [page]);

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      await fetchProducts(page + 1);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Ensure products is an array to prevent errors
  const validProducts = Array.isArray(products) ? products : [];

  // Filter products by category
  const filteredProducts =
    selectedCategory === "all"
      ? validProducts
      : validProducts.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl text-black font-bold mb-4 text-center">
        Products
      </h1>

      {/* Category Filter */}
      <div className="flex justify-center sm:justify-end mb-4">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="p-2 border rounded-md w-full sm:w-auto"
        >
          <option value="all">All Categories</option>
          {Array.from(new Set(validProducts.map((p) => p.category))).map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
              initial={{ opacity: 0.4, y: -30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/product/${product.code}`}>
                <img
                  src={product.image}
                  alt={`Product: ${product.title}`}
                  className="w-full h-40 object-cover rounded-md"
                />
              </Link>
              <Link to={`/product/${product.code}`}>
                <h2 className="text-xl font-semibold text-gray-700 hover:underline mt-2">
                  {product.title}
                </h2>
              </Link>
              <p className="text-gray-500 text-sm truncate">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-lg font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>

              {product.stock <= 0 ? (
                <p className="text-red-500">Out of Stock</p>
              ) : (
                <p className="text-green-500">In Stock: {product.stock}</p>
              )}
              <p className="text-yellow-500">
                Rating: {product.rating || "No rating"} ★
              </p>

              <div className="flex flex-wrap gap-4 justify-between items-center mt-4">
                <ButtonCart product={product} />
                <ButtonWishlist product={product} />
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found in this category.
          </p>
        )}
      </div>

      {/* Load More Button */}
      {filteredProducts.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed w-full sm:w-auto"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;

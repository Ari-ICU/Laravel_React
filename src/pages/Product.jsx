import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useProduct } from "../context/ProductContext";
import { Link } from "react-router-dom";
import ButtonCart from "../components/ButtonCart";
import ButtonWishlist from "../components/ButtonWishlist";
import Spinner from "../components/Spinner"; // Import the Spinner component

const Product = () => {
  const { fetchProducts, products } = useProduct();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (products) {
      fetchProducts(products);
    }
  }, []);

  const handleLoadMore = async () => {
    setLoading(true); // Set loading to true before initiating the fetch
    try {
      await fetchProducts(page); // Fetch new products
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 p-4">
      <h1 className="text-2xl text-black font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="p-6 max-w-sm rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 space-y-4"
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
              <h2 className="text-xl font-semibold text-gray-300 hover:underline">
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
              <ButtonWishlist product={product} />
              <ButtonCart product={product} />
            </div>
          </motion.div>
        ))}
      </div>
      {!loading && products.length > 0 && (
        <div className="text-center mt-4">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:text-gray-400 cursor-pointer"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Load More"} {/* Show spinner or text */}
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;

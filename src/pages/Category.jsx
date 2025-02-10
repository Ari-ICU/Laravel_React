import React, { useState, useEffect } from "react";
import { useCategory } from "../context/CategoryContext";
import { motion } from "framer-motion";
import ButtonCart from "../components/ButtonCart";
import ButtonWishlist from "../components/ButtonWishlist";
import { Link, useLocation } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName, products, changeCategory, fetchCategoryProducts } =
    useCategory();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const location = useLocation();

  // Extract category from the URL
  const category = location.pathname.split("/").pop();

  useEffect(() => {
    if (category && category !== categoryName) {
      changeCategory(category);
    }

    // Fetch products for the selected category and current page
    fetchCategoryProducts(currentPage, productsPerPage);
  }, [categoryName, currentPage]);

  // Calculate the indices for slicing the products array
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Category Title */}
      <h1 className="text-2xl font-bold text-center text-black uppercase mb-6">
        {categoryName} Perfumes
      </h1>
      {currentProducts.length === 0 && (
        <div className="text-center">
          <p className="text-gray-500">No products available.</p>
        </div>
      )}

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {currentProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg space-y-3 p-4"
          >
            <Link to={`/product/${product.code}`}>
              <img
                src={product.image}
                alt={`Product: ${product.title}`}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
            </Link>
            <p className="text-gray-500 truncate">
              {product.short_description}
            </p>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-green-600">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>
            </div>
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

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 *:m-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-l disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous Page"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            } hover:bg-gray-400`}
            aria-label={`Go to Page ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-r disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;

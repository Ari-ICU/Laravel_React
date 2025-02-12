import React, { useState, useEffect } from "react";
import { useCategory } from "../context/CategoryContext";
import { motion } from "framer-motion";
import ButtonCart from "../components/ButtonCart";
import ButtonWishlist from "../components/ButtonWishlist";
import { Link, useLocation } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName, setProducts, products, changeCategory } = useCategory();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("default");
  const productsPerPage = 10;
  const location = useLocation();

  const category = location.pathname.split("/").pop();

  useEffect(() => {
    if (category && category !== categoryName) {
      changeCategory(category);
      setProducts([]);
      setCurrentPage(1);
    }
  }, [category, categoryName]);

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "price-asc") return a.price - b.price;
    if (sortType === "price-desc") return b.price - a.price;
    if (sortType === "name-asc") return a.title.localeCompare(b.title);
    if (sortType === "name-desc") return b.title.localeCompare(a.title);
    if (sortType === "rating-desc") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.max(1, Math.ceil(products.length / productsPerPage));

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center text-black uppercase mb-6">
        {categoryName} Perfumes
      </h1>

      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          onChange={(e) => setSortType(e.target.value)}
          value={sortType}
          className="p-2 border rounded-md"
        >
          <option value="default">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
      </div>

      {/* No products available */}
      {currentProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl">
            No products available in this category.
          </p>
          <p className="text-gray-400 mt-4">
            Please check back later or try another category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {currentProducts.map((product, index) => (
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
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              </Link>
              <p className="text-gray-500 truncate">{product.descriptions}</p>
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
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-l disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-4 py-2 ${
                  currentPage === pageNumber
                    ? "bg-blue-600 text-white font-bold"
                    : "bg-gray-300 text-gray-700"
                } hover:bg-gray-400`}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-r disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

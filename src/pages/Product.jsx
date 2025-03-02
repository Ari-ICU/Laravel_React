import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // To get the current page location
import { motion } from "framer-motion";
import { useProduct } from "../context/ProductContext";
import { useCategory } from "../context/CategoryContext";  // Import useCategory to access the category context
import { Link } from "react-router-dom";
import ButtonCart from "../components/ButtonCart";
import ButtonWishlist from "../components/ButtonWishlist";
import Spinner from "../components/Spinner"; // Import Spinner component

const Product = () => {
  const { fetchProducts, products, hasMore } = useProduct();
  const { filters } = useCategory();  // Access the filters from the context
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation(); // Get current location to determine the context
  const [pageTitle, setPageTitle] = useState(""); // To store dynamic page title

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      await fetchProducts(page);
      setLoading(false);
    };

    loadProducts();
  }, [page]);

  useEffect(() => {
    let title = "All Products"; // Default title if no filters are selected
  
    // Dynamically set page title based on selected filters
    if (filters?.gender?.name) {
      title = `Products for ${filters.gender.name}`;
    } else if (filters?.brand?.name) {
      title = `Products by ${filters.brand.name}`;
    } else if (filters?.origin?.name) {
      title = `Products from ${filters.origin.name}`;
    } else if (filters?.personality?.name) {
      title = `Products for ${filters.personality.name}`;
    }
  
    setPageTitle(title);
  }, [filters]); 
  
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1); 
    }
  };

  // Ensure products is an array to prevent errors
  const validProducts = Array.isArray(products) ? products : [];

  const filteredProducts = validProducts
    .filter((product) => {
      // Filter by search query
      return product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.short_description.toLowerCase().includes(searchQuery.toLowerCase());
    });

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Dynamic Title */}
      <h1 className="text-2xl text-black font-bold mb-4 text-center">
        {pageTitle}
      </h1>

      {/* Search Input */}
      <div className="flex justify-center sm:justify-end mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md w-full sm:w-auto"
        />
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
              <Link to={`/product/${product.id}`}>
                <img
                  src={`http://localhost:8000${product.images}`}
                  alt={`Product: ${product.title}`}
                  className="w-full h-40 object-cover rounded-md"
                />
              </Link>
              <Link to={`/product/${product.id}`}>
                <h2 className="text-xl font-semibold text-gray-700 hover:underline mt-2">
                  {product.title}
                </h2>
              </Link>
              <p className="text-gray-500 text-sm truncate">
                {product.short_description}
              </p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-lg font-bold text-green-600">
                  ${Number(product.price).toFixed(2)} {/* Ensure price is a number */}
                </p>

                <p className="text-sm text-gray-500">{product.category_id}</p>
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
            No products found.
          </p>
        )}
      </div>

      {/* Load More Button */}
      {filteredProducts.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed w-full sm:w-auto"
            disabled={loading || !hasMore} // Disable button if loading or no more products
          >
            {loading ? <Spinner /> : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;

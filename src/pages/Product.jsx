import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // To get the current page location
import { useProduct } from "../context/ProductContext";
import { useCategory } from "../context/CategoryContext"; 
import { Link } from "react-router-dom";
import ButtonCart from "../components/ButtonCart";
import ButtonWishlist from "../components/ButtonWishlist";
import Spinner from "../components/Spinner"; 
import { motion } from "framer-motion";


const Product = () => {
  const { fetchProducts, products, hasMore } = useProduct();
  const { filters } = useCategory();  // Access the filters from the context
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageTitle, setPageTitle] = useState("All Products");

  const location = useLocation(); // Get current location to determine the context

  // Function to get query params from URL
  const getQueryParams = () => {
    const queryParams = new URLSearchParams(location.search);
    const origin = queryParams.get('origin');
    const brand = queryParams.get('brand');
    const personality = queryParams.get('personality');
    const gender = queryParams.get('gender');
    return { origin, brand, personality, gender };
  };

  useEffect(() => {
    const { origin, brand, personality, gender } = getQueryParams();
    
    let title = "All Products"; // Default title if no filters are selected

    // Dynamically build the page title based on filters
    const filtersArray = [];
    if (origin) filtersArray.push(`Origin: ${origin}`);
    if (brand) filtersArray.push(`Brand: ${brand}`);
    if (personality) filtersArray.push(`Personality: ${personality}`);
    if (gender) filtersArray.push(`Gender: ${gender}`);

    if (filtersArray.length > 0) {
      title = `Products - ${filtersArray.join(", ")}`;
    }

    setPageTitle(title);  // Update the page title based on filters
  }, [location.search]);  // Update the title when the query params change

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      await fetchProducts(page);
      setLoading(false);
    };

    loadProducts();
  }, [page]);

  // Ensure products is an array to prevent errors
  const validProducts = Array.isArray(products) ? products : [];

  const filteredProducts = validProducts
    .filter((product) => {
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
                  ${Number(product.price).toFixed(2)} 
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
      {/* {filteredProducts.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed w-full sm:w-auto"
            disabled={loading || !hasMore} 
          >
            {loading ? <Spinner /> : "Load More"}
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Product;

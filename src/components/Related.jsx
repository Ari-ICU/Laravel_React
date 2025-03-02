import React,{ useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useProduct } from "../context/ProductContext";
import { Link } from "react-router-dom";
import ButtonWishlist from "./ButtonWishlist";
import PropTypes from 'prop-types';
import ButtonCart from "./ButtonCart";

const RelatedProducts = ({ product }) => {
  const { relatedProducts, fetchRelatedProducts } = useProduct();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!product) return;

    const controller = new AbortController();
    const fetchData = async () => {
      setError(null);
      setLoading(true);

      // Construct the filter object with non-null values
      const filters = {};
      if (product.gender_id) filters.gender_id = product.gender_id;
      if (product.origin_id) filters.origin_id = product.origin_id;
      if (product.personality_id) filters.personality_id = product.personality_id;
      if (product.brand_id) filters.brand_id = product.brand_id;

      try {
        // Fetch related products with the constructed filters
        await fetchRelatedProducts(filters, { signal: controller.signal });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to fetch related products.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // Cleanup on component unmount
  }, []);

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
            <Link to={`/product/${product.id}`}>
              <img
                src={`http://localhost:8000${product.images}`} // Image path from the response
                alt={`Product: ${product.title}`}
                className="w-full h-40 object-cover rounded-md"
              />
            </Link>
            <Link to={`/product/${product.id}`}>
              <h2 className="text-xl font-semibold text-gray-800 hover:underline">
                {product.title}
              </h2>
            </Link>
            <p className="text-gray-500 truncate">{product.short_description}</p>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-green-600">
                ${parseFloat(product.price).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                {product.gender ? `Gender: ${product.gender}` : ""}
                {product.origin ? `Origin: ${product.origin}` : ""}
                {product.personality ? `Personality: ${product.personality}` : ""}
                {product.brand ? `Brand: ${product.brand}` : ""}
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
RelatedProducts.propTypes = {
  product: PropTypes.shape({
    gender_id: PropTypes.number,
    origin_id: PropTypes.number,
    personality_id: PropTypes.number,
    brand_id: PropTypes.number,
    id: PropTypes.number.isRequired,
    images: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    short_description: PropTypes.string,
    price: PropTypes.number.isRequired,
    gender: PropTypes.string,
    origin: PropTypes.string,
    personality: PropTypes.string,
    brand: PropTypes.string,
    stock: PropTypes.number.isRequired,
    rating: PropTypes.number,
  }).isRequired,
};

export default RelatedProducts;

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

// Create a reusable Loader component
const Loader = () => (
  <div className="text-center mt-10 text-gray-500">Loading...</div>
);

// Create a reusable Error Message component
const ErrorMessage = ({ message }) => (
  <div className="text-center mt-10 text-red-500">{message}</div>
);

const SingleProduct = () => {
  const { fetchSingleProduct, singleProduct } = useContext(ProductContext);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // State to manage quantity
  const [selectedImage, setSelectedImage] = useState("");

  // Fetch the product data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchSingleProduct(id);
        setError(null); // Clear error on successful fetch
      } catch (err) {
        console.error("Fetch error: ", err); // Log the error for debugging
        setError("Failed to load product details.");
      }
    };

    fetchData();
  }, [fetchSingleProduct, id]);

  // Ensure selectedImage is set only once after data is fetched
  useEffect(() => {
    if (singleProduct && singleProduct.image) {
      setSelectedImage(singleProduct.image);
    }
  }, [singleProduct]);

  // Display error if any
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Display loading state while waiting for product data
  if (!singleProduct) {
    return <Loader />;
  }

  const { title, description, price, category, stock } = singleProduct;

  // Handle increase and decrease quantity
  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto p-4 shadow-md px-5 rounded-lg mt-10 mb-10 grid grid-cols-1 md:grid-cols-2 gap-8 justify-center"
    >
      {/* Left column (Product Image) */}
      <div className="flex flex-col items-center">
        {/* Display selected image */}
        {selectedImage && (
          <img
            src={selectedImage}
            alt={title || "Product Image"}
            className="w-full h-96 object-cover rounded-md mb-4"
          />
        )}

        {/* Display thumbnail images */}
        <div className="flex space-x-4 border border-gray-300 p-2 rounded-md">
          {singleProduct.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              className="w-16 h-16 object-cover rounded-md cursor-pointer"
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>

      {/* Right column (Product Details) */}
      <div className="flex flex-col justify-start">
        <h1 className="text-3xl text-white font-bold mb-4">
          {title || "No Title"}
        </h1>
        <p className="text-gray-600 mb-4">
          {description || "No description available."}
        </p>
        <p className="text-xl font-semibold mb-4">
          {price ? `$${price}` : "Price unavailable"}
        </p>

        <p className="text-sm text-gray-500">
          Category: {category || "No category"}
        </p>

        <p className="text-yellow-500">
          Rating: {singleProduct.rating?.rate} ★ ({singleProduct.rating?.count}{" "}
          reviews)
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-4 mt-6">
          <button
            onClick={decreaseQuantity}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="text-xl text-white">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition mt-6"
          aria-label="Add to cart"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default SingleProduct;

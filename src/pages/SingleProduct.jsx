import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import ButtonCart from "../components/ButtonCart";
import ButtonWishlist from "../components/ButtonWishlist";
import RelatedProducts from "../components/Related";

const SingleProduct = () => {
  const { singleProduct, fetchSingleProduct, error } = useProduct();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  // Fetch product when ID changes
  useEffect(() => {
    if (id) {
      fetchSingleProduct(id);
    }
  }, [id]);

  // Handle image path (single string)
  useEffect(() => {
    if (singleProduct?.images) {
      setSelectedImage(`http://localhost:8000${singleProduct.images}`);
    }
  }, [singleProduct]);

  // Ensure valid price format
  const formatPrice = (price) =>
    price
      ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
      : "Price unavailable";

  // Quantity handlers
  const increaseQuantity = () => {
    if (quantity < singleProduct.stock) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!singleProduct) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-4 min-h-screen">
      <motion.div
        className="max-w-6xl mx-auto p-4 shadow-md rounded-lg mt-10 mb-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Product Image */}
        <motion.div
          className="flex flex-col mb-4 md:mb-0"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={selectedImage || "/path/to/fallback-image.jpg"}
            alt={singleProduct.title || "Product Image"}
            className="w-full h-auto object-cover rounded-md"
          />
        </motion.div>

        {/* Product Details */}
        <motion.div
          className="flex flex-col space-y-4"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold">{singleProduct.title || "No Title"}</h1>
          <p className="text-gray-600">{singleProduct.short_description || "No description available."}</p>
          <p className="text-xl font-semibold">{formatPrice(singleProduct.price)}</p>
          <p className="text-sm text-gray-500">Category: {singleProduct.category || "Not specified"}</p>
          <p className="text-yellow-500">Rating: {singleProduct.rating || "No rating"} ★</p>

          <p className={singleProduct.stock > 0 ? "text-green-500" : "text-red-500"}>
            {singleProduct.stock > 0 ? `In Stock: ${singleProduct.stock}` : "Out of Stock"}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center bg-gray-200 w-full sm:w-24 space-x-4 mt-6">
            <button
              onClick={decreaseQuantity}
              className="bg-[#508380] text-white px-4 py-2 rounded-md hover:bg-gray-400"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="text-xl">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="bg-[#508380] text-white px-4 py-2 rounded-md hover:bg-gray-400"
              aria-label="Increase quantity"
              disabled={quantity >= singleProduct.stock}
            >
              +
            </button>
          </div>

          <div className="flex space-x-6 items-center justify-start mt-6">
            <ButtonCart product={singleProduct} quantity={quantity} />
            <ButtonWishlist product={singleProduct} />
          </div>
        </motion.div>
      </motion.div>

      {/* Product Description and Reviews Section */}
      <motion.div
        className="max-w-6xl mx-auto bg-white p-6 shadow-md rounded-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Product Description */}
          <div className="w-full">
            <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
            <p className="text-gray-600 block whitespace-normal break-words">{singleProduct.long_description || "No detailed description available."}</p>
          </div>


          {/* Right Column - Product Reviews */}
          <div>
            <h3 className="text-xl font-semibold">Customer Reviews</h3>

            {/* Display Reviews */}
            {singleProduct.reviews && singleProduct.reviews.length > 0 ? (
              <div className="mt-4 space-y-4">
                {singleProduct.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <p className="text-gray-800 font-medium">{review.user_name}</p>
                    <p className="text-yellow-500">{"★".repeat(review.rating)}</p>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to leave one!</p>
            )}
          </div>
        </div>

        {/* Add a Review Section - Full Width Below */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Leave a Review</h3>
          <form className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-2 rounded-md"
            />
            <select className="w-full border p-2 rounded-md">
              <option value="5">⭐️⭐️⭐️⭐️⭐️ - Excellent</option>
              <option value="4">⭐️⭐️⭐️⭐️ - Good</option>
              <option value="3">⭐️⭐️⭐️ - Average</option>
              <option value="2">⭐️⭐️ - Below Average</option>
              <option value="1">⭐️ - Poor</option>
            </select>
            <textarea
              placeholder="Write your review..."
              className="w-full border p-2 rounded-md h-24"
            ></textarea>
            <button
              type="submit"
              className="bg-[#508380] text-white px-6 py-2 rounded-md hover:bg-gray-700"
            >
              Submit Review
            </button>
          </form>
        </div>
      </motion.div>

      {/* Related Products */}
      <motion.div
        className="mt-12 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {singleProduct && <RelatedProducts product={singleProduct} />}
      </motion.div>
    </div>
  );
};

export default SingleProduct;

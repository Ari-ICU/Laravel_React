import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import ButtonCart from "../components/ButtonCart";
import ButtonWishlist from "../components/ButtonWishlist";
import RelatedProducts from "../components/Related";

const SingleProduct = () => {
  const { singleProduct, fetchSingleProduct } = useProduct();
  const { perfumeCode } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (perfumeCode) {
      fetchSingleProduct(perfumeCode);
    }
  }, [perfumeCode]);

  useEffect(() => {
    if (singleProduct?.image) {
      setSelectedImage(singleProduct.image);
    }
  }, [singleProduct]);

  const formatPrice = (price) => {
    return price
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price)
      : "Price unavailable";
  };

  const increaseQuantity = () => {
    if (quantity < singleProduct.stock) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (!singleProduct) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-screen-xl p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-6xl mx-auto p-4 shadow-md rounded-lg mt-10 mb-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 justify-center"
      >
        {/* Product Image Section */}
        <div className="flex flex-col">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt={singleProduct.title || "Product Image"}
              className="w-full h-auto object-cover rounded-md mb-4"
            />
          ) : (
            <img
              src="/path/to/fallback-image.jpg"
              alt="Fallback Image"
              className="w-full h-auto object-cover rounded-md mb-4"
            />
          )}

          {/* Thumbnails */}
          <div className="flex space-x-4 border border-gray-300 p-2 rounded-md overflow-x-auto">
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

        {/* Product Details Section */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl text-black font-bold mb-4">
            {singleProduct.title || "No Title"}
          </h1>
          <p className="text-gray-600 mb-4">
            {singleProduct.description || "No description available."}
          </p>
          <p className="text-xl font-semibold mb-4">
            {formatPrice(singleProduct.price)}
          </p>
          <p className="text-sm text-gray-500">
            Category: {singleProduct.category || "No category"}
          </p>
          <p className="text-yellow-500">
            Rating: {singleProduct.rating || "No rating"} ★
          </p>

          {singleProduct.stock <= 0 ? (
            <p className="text-red-500">Out of Stock</p>
          ) : (
            <p className="text-green-500">In Stock: {singleProduct.stock}</p>
          )}

          <div className="flex items-center bg-gray-200 w-24 space-x-4 mt-6">
            <button
              onClick={decreaseQuantity}
              className="bg-[#508380] text-white px-4 py-2 rounded-md hover:bg-gray-400"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="text-xl text-black">{quantity}</span>
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
        </div>
      </motion.div>

      <div className="flex flex-wrap justify-center space-x-10 h-auto shadow p-4">
        {/* Description Section */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
          <p className="text-gray-600">
            {singleProduct.fullDescription ||
              "No detailed description available."}
          </p>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {singleProduct.reviews?.length > 0 ? (
              singleProduct.reviews.map((review, index) => (
                <motion.div
                  key={index}
                  className="border-b pb-4 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <p className="text-lg font-medium">{review.userName}</p>
                  <p className="text-yellow-500">{"★".repeat(review.rating)}</p>
                  <p className="text-gray-700">{review.comment}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <RelatedProducts
          key={singleProduct?.category}
          category={singleProduct.category}
        />
      </div>
    </div>
  );
};

export default SingleProduct;

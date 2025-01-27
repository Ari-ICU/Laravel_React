import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch reviews from an API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://api.example.com/reviews" // Replace with your API endpoint
        );
        const data = await response.json();
        setReviews(data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  if (loading) {
    return (
      <motion.div
        className="max-w-sm mx-auto mt-10 mb-10 bg-white rounded-xl shadow-lg space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-gray-500">Loading reviews...</p>
      </motion.div>
    );
  }

  if (reviews.length === 0) {
    return (
      <motion.div
        className=" max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-red-500">No reviews available.</p>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto max-w-screen px-4 py-8">
      <h1 className="text-2xl font-bold text-center text-white uppercase underline mb-6">
        Customer Reviews
      </h1>
      <div className="relative max-w-7xl mx-auto h-auto">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            className="bg-white rounded-xl shadow-lg px-20 py-10"
            initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 100, filter: "blur(10px)" }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {reviews[currentIndex].name}
            </h3>
            <p className="text-gray-500">{reviews[currentIndex].body}</p>
            <span className="block text-sm text-gray-400">
              Email: {reviews[currentIndex].email}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 px-4 rounded-full hover:bg-gray-700"
        >
          &#8592;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 px-4 rounded-full hover:bg-gray-700"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;

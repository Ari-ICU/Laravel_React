import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useCarousel } from "../context/CarouselContext";

const Carousel = () => {
  const { carousels, loading, error } = useCarousel();
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalTime = 3000;

  // Ensure carousels is an array to avoid runtime errors
  const validCarousels = Array.isArray(carousels) ? carousels : [];

  const handleNext = () => {
    if (validCarousels.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validCarousels.length);
    }
  };

  const handlePrev = () => {
    if (validCarousels.length > 0) {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + validCarousels.length) % validCarousels.length
      );
    }
  };

  // Auto-play effect (Only runs if there are items)
  useEffect(() => {
    if (validCarousels.length > 0) {
      const interval = setInterval(handleNext, intervalTime);
      return () => clearInterval(interval);
    }
  }, [currentIndex, validCarousels.length]);

  // Debugging: Check API response
  useEffect(() => {
    console.log("Carousels Data:", validCarousels);
  }, [validCarousels]);

  if (loading) {
    return (
      <motion.div
        className="max-w-sm mx-auto mt-10 mb-10 bg-white rounded-xl shadow-lg space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-gray-500">Loading carousels...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="max-w-sm mx-auto mt-10 mb-10 bg-white rounded-xl shadow-lg space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-red-500">{error}</p>
      </motion.div>
    );
  }

  if (validCarousels.length === 0) {
    return (
      <motion.div
        className="max-w-sm mx-auto mt-10 mb-10 bg-white rounded-xl shadow-lg space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-gray-500">
          No carousel items available.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative max-w-screen h-auto px-2 mx-auto bg-red-300"
    >
      {validCarousels[currentIndex] && (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full h-64"
        >
          <img
            src={
              validCarousels[currentIndex]?.image_url || "fallback-image.jpg"
            }
            alt={validCarousels[currentIndex]?.name || "Carousel Image"}
            className="w-full h-full object-cover rounded-lg"
          />
        </motion.div>
      )}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        <FaArrowLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        <FaArrowRight size={20} />
      </button>
    </motion.div>
  );
};

export default Carousel;

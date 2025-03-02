import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useCarousel } from "../context/CarouselContext";

const Carousel = () => {
  const { carousels, loading, error, fetchCarousels } = useCarousel();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    fetchCarousels();
  }, []);
  
  console.log("carousel:", carousels);  // Check data structure here

  // Handle Next & Previous
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carousels.data.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + carousels.data.length) % carousels.data.length
    );
  };

  // Loading state
  if (loading) {
    return (
      <motion.div
        className="max-w-sm mx-auto mt-10 mb-10 bg-white rounded-xl shadow-lg space-y-4 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-gray-500">Loading carousels...</p>
      </motion.div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div
        className="max-w-sm mx-auto mt-10 mb-10 bg-white rounded-xl shadow-lg space-y-4 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-red-500">{error}</p>
      </motion.div>
    );
  }

  // No carousels available
  if (carousels.data.length === 0) {
    return (
      <motion.div
        className="max-w-sm mx-auto mt-10 mb-10 bg-white rounded-xl shadow-lg space-y-4 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-gray-500">No carousel items available.</p>
      </motion.div>
    );
  }

  console.log("Image URL:", carousels.data[currentIndex]?.image);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative max-w-screen h-[550px] px-2 p-1 mx-auto"
    >
      {/* Carousel Item */}
      {carousels.data[currentIndex] && (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full h-[550px]"
        >
      <img
        src={`http://localhost:8000${carousels.data[currentIndex]?.image}`}  
        alt={carousels.data[currentIndex]?.title || "Carousel Image"}
        className="w-full h-full object-cover bg-[#915000]" 
        loading="lazy" 
      />


        </motion.div>
      )}

      {/* Navigation Buttons */}
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

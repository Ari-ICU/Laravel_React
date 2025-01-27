import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://api.example.com/carousels");
        const data = await response.json();
        setImages(data.carousels || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
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
        <p className="text-center text-gray-500">Loading carousels...</p>
      </motion.div>
    );
  }

  if (images.length === 0) {
    return (
      <motion.div
        className=" max-w-sm mx-auto mt-10 mb-10 bg-white rounded-xl shadow-lg space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-red-500">No carousel available.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative max-w-screen h-auto px-2 mx-auto z-10 bg-red-300"
    >
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="w-full h-64"
      >
        <img
          src={images[currentIndex].url}
          alt="carousel"
          className="w-full h-full object-cover rounded-lg"
        />
      </motion.div>
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

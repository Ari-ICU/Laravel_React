import React from "react"; // Add this line
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/reviews")
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  if (reviews.length === 0) {
    return (
      <motion.div
        className="max-w-sm mx-auto mt-10 mb-10 bg-white rounded-xl shadow-lg space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-red-500">No reviews available.</p>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl text-white text-center font-bold mb-4"
      >
        Reviews
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold">{review.title}</h2>
            <p className="text-gray-600">{review.body}</p>
            <p className="text-gray-500 text-sm">- {review.author}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;

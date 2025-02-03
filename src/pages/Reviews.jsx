import React, { useState } from "react";
import { motion } from "framer-motion";
import { useReviews } from "../context/ReviewsContext";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  const { reviews, addReviews } = useReviews();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    review: "",
    rating: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReviews(formData);
    setFormData({ name: "", title: "", review: "", rating: 0 });
  };

  return (
    <div className="container mx-auto p-4  ">
      <h1 className="text-2xl text-center text-black font-bold mb-4">
        Reviews
      </h1>
      <div className=" grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex justify-center  ">
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold">{review.title}</h2>
              <p className="text-gray-600">{review.body}</p>
              <p className="text-gray-500 text-sm">- {review.author}</p>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="mx-auto max-w-full flex justify-center mt-4 mb-10 bg-white rounded-xl shadow-lg space-y-4 p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-center px-2 text-red-500">
              No reviews available.
            </p>
          </motion.div>
        )}
      </div>
      <div className="max-w-xl mx-auto p-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-black text-center mb-4"
        >
          Share Your Experience
        </motion.h1>
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-white p-6 max-w-xl mx-auto rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Review Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Comments</label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  className={`cursor-pointer ${
                    star <= formData.rating
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Submit Review
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default Reviews;

import React, { useState } from "react";
import { useReviews } from "../context/ReviewsContext";
import { FaStar } from "react-icons/fa";

const ReviewSection = ({ productId }) => {
  const { reviews, loading, error } = useReviews();
  const filteredReviews = reviews.filter((review) => review.productId === productId);
  const [currentIndex, setCurrentIndex] = useState(0);

  const baseURL = "http://localhost:8000";
  const placeholderImage = "https://via.placeholder.com/100?text=No+Image";

  console.log("Reviews Data:", filteredReviews);
  console.log("productID ",productId)
  console.log(
    "Image URL:",
    filteredReviews[currentIndex]?.image
      ? `${baseURL}/${filteredReviews[currentIndex].image.replace(/^\/?/, "")}`
      : placeholderImage
  );


  if (loading) return <p className="text-center text-gray-500">Loading reviews...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load reviews.</p>;
  if (filteredReviews.length === 0) return <p className="text-center text-gray-500">No reviews available.</p>;

  return (
    <div className="container mx-auto max-w-screen px-4 py-8 overflow-x-hidden">
      <h1 className="text-2xl font-bold text-center uppercase mb-6">Customer Reviews</h1>

      <div className="relative max-w-2xl mx-auto h-auto overflow-x-hidden">
        <div className="max-w-md w-full mx-auto rounded-xl shadow-lg px-6 py-6 flex flex-col items-center text-center">
          {/* Image */}
          <div className="w-24 h-24 mb-4">
            <img
              src={filteredReviews[currentIndex]?.image
                ? `${baseURL}/${filteredReviews[currentIndex].image.replace(/^\/?/, "")}`
                : placeholderImage}
              alt="Review"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          {/* Reviewer's Name */}
          <h3 className="text-lg font-semibold text-gray-800">{filteredReviews[currentIndex].name}</h3>

          {/* Star Rating */}
          <div className="flex justify-center mt-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-xl ${i < filteredReviews[currentIndex].rating ? "text-yellow-500" : "text-gray-300"}`}
              />
            ))}
          </div>

          {/* Review Feedback */}
          <p className="text-gray-600 mt-2">{filteredReviews[currentIndex].feedback}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;

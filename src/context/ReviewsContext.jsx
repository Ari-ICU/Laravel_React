import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const ReviewsContext = createContext();

export const useReviews = () => {
  return React.useContext(ReviewsContext);
};

const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Correct the endpoint for fetching reviews
        const response = await axios.get("http://127.0.0.1:8000/api/reviews");
        setReviews(response.data.data); 
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const addReviews = async (reviewData) => {
    try {
      // Correct the endpoint for posting a review
      const response = await axios.post("http://127.0.0.1:8000/api/review", reviewData);
      setReviews([...reviews, response.data]); // Add new review to the state
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReviews, loading, error }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export { ReviewsContext, ReviewsProvider };

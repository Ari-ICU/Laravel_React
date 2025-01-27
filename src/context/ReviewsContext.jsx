import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const ReviewsContext = createContext();

const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/api/reviews");
        setReviews(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <ReviewsContext.Provider value={{ reviews, loading, error }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export { ReviewsContext, ReviewsProvider };

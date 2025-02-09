import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CarouselContext = createContext();

// Custom hook to use the context
export const useCarousel = () => useContext(CarouselContext);

// Carousel Provider
export const CarouselProvider = ({ children }) => {
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/slider`);
        const data = await response.json();
        setCarousels(data || []);
        setLoading(false);
        console.log("sliders loaded:", data);
      } catch (err) {
        console.error("Error fetching sliders:", err);
        setError("Failed to load sliders.");
        setLoading(false);
      }
    };

    fetchCarousels();
  }, []);

  return (
    <CarouselContext.Provider value={{ carousels, loading, error }}>
      {children}
    </CarouselContext.Provider>
  );
};

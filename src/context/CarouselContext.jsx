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

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const response = await fetch("/api/carousels");
        const data = await response.json();
        setCarousels(data.carousels || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching carousels:", err);
        setError("Failed to load carousels.");
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

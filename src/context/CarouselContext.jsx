import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CarouselContext = createContext();
export const useCarousel = () => useContext(CarouselContext);

export const CarouselProvider = ({ children }) => {
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  
    const fetchCarousels = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/slideshows`);
        const data = await response.json();
        console.log("Fetched carousels:", data); // Check the data here
        setCarousels(data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sliders:", err);
        setError("Failed to load sliders.");
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchCarousels();
    }, []);
  
    return (
      <CarouselContext.Provider value={{ carousels, loading, error, fetchCarousels }}>
        {children}
      </CarouselContext.Provider>
    );
  };
  
import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context
const PartnerContext = createContext();

// Create a provider component
export const PartnerProvider = ({ children }) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  // Fetch partners from the API
  const fetchPartners = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/partner`);
      if (!response.ok) {
        throw new Error("Failed to fetch partners");
      }
      const data = await response.json();
      setPartners(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // Value to be provided to consumers
  const value = {
    partners,
    loading,
    error,
    fetchPartners, // Optional: Allow consumers to refetch data
  };

  return (
    <PartnerContext.Provider value={value}>{children}</PartnerContext.Provider>
  );
};

// Custom hook to use the context
export const usePartners = () => {
  const context = useContext(PartnerContext);
  if (!context) {
    throw new Error("usePartners must be used within a PartnerProvider");
  }
  return context;
};

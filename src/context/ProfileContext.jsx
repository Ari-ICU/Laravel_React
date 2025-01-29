import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create the ProfileContext
const ProfileContext = createContext();

// ProfileProvider component to wrap around the App and provide the context
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the profile data from the API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/profile"); // Replace with your API endpoint
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array to run only once after initial render

  return (
    <ProfileContext.Provider value={{ profile, loading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use ProfileContext in any component
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

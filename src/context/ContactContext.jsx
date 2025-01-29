import React, { createContext, useState, useContext } from "react";
import axios from "axios";

// Create the Context
const ContactContext = createContext();

// Create a Provider component
export const ContactProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Replace this with your real API endpoint
      const response = await axios.post("/api/contact", {
        name,
        email,
        message,
      });

      if (response.status === 200) {
        setSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        message,
        setMessage,
        loading,
        error,
        success,
        handleSubmit,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

// Custom hook to use the ContactContext
export const useContact = () => {
  return useContext(ContactContext);
};

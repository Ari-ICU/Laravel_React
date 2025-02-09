import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  const signIn = async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error("Sign-in failed");

      const userData = await response.json();
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true, user: userData };
    } catch (error) {
      console.error("Error during sign-in:", error);
      return { success: false, error: error.message };
    }
  };

  const signUp = async (credentials) => {
    try {
      console.log("Sending sign-up request:", credentials);

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const responseData = await response.json();
      console.log("Sign-up response:", responseData);

      if (!response.ok) {
        throw new Error(
          responseData.detail
            ? JSON.stringify(responseData.detail)
            : "Sign-up failed"
        );
      }

      setUser(responseData);
      setIsAuthenticated(true);
      return { success: true, user: responseData };
    } catch (error) {
      console.error("Error during sign-up:", error);
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signout`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Sign-out failed");

      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      console.error("Error during sign-out:", error);
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

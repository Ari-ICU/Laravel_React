import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  // Sign in method
  const signIn = async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const text = await response.text();
      console.log("Full login response:", text);

      if (!response.ok) throw new Error("Sign-in failed");

      const userData = JSON.parse(text);
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
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const responseData = await response.json(); 
      console.log("SignUp response:", responseData);

      const { user, token } = responseData;
      setUser(user);
      setIsAuthenticated(true);

      localStorage.setItem("authToken", token);

      return { success: true, user, token };
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

      // Clear user and authentication state
      setUser(null);
      setIsAuthenticated(false);

      // Optionally, remove the token from localStorage
      localStorage.removeItem("authToken");

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

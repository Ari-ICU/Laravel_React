import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const SignOutProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const signIn = async (credentials) => {
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const userData = await response.json(); // Assuming the response contains user data
        setUser(userData); // Save user data in the state
        setIsAuthenticated(true);
      } else {
        console.error("Sign-in failed");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const signUp = async (credentials) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const userData = await response.json(); // Assuming the response contains user data
        setUser(userData); // Save user data in the state
        setIsAuthenticated(true);
      } else {
        console.error("Sign-up failed");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  const signOut = async () => {
    try {
      const response = await fetch("/api/signout", {
        method: "POST",
      });

      if (response.ok) {
        setUser(null); // Clear user data on sign-out
        setIsAuthenticated(false);
      } else {
        console.error("Sign-out failed");
      }
    } catch (error) {
      console.error("Error during sign-out:", error);
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

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const AuthPage = () => {
  const { isAuthenticated, signIn, signOut } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(credentials);
    } catch (err) {
      setError("Error during sign-in");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      setError("Error during sign-out");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full py-10 px-2">
      <motion.div
        className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isAuthenticated ? (
          <motion.div
            className="text-center"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-gray-700">Welcome back!</h2>
            <button
              onClick={handleSignOut}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              Sign Out
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="text-center"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-gray-700">Please Sign In</h2>
            <form onSubmit={handleSignIn} className="mt-4 space-y-4">
              <div>
                <label className="block text-left text-sm font-semibold text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-left text-sm font-semibold text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                type="submit"
                className="w-full py-2 mt-4 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                Sign In
              </button>
              <p className="mt-4 text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-500">
                  Sign Up
                </a>
              </p>
            </form>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthPage;

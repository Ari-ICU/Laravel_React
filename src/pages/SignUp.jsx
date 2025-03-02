import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import SocialLogin from "../components/SocialLogin";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const { signUp } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const result = await signUp({
        name: credentials.username,
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.confirmPassword,
      });

      if (result.success) {
        // Optionally redirect user after successful signup
        navigate("/auth"); // Redirect to login page (or home page)
      } else {
        setError(result.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Error during sign-up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-10 px-2">
      <motion.div
        className="max-w-xl w-full bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-bold text-gray-700">Sign Up</h2>
          <form onSubmit={handleSignUp} className="mt-6 space-y-4 mx-auto w-full max-w-sm">
            <div>
              <label className="block text-left text-sm font-semibold text-gray-600">Username</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-left text-sm font-semibold text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-left text-sm font-semibold text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                minLength="6"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label className="block text-left text-sm font-semibold text-gray-600">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                minLength="6"
                placeholder="Confirm your password"
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-28 py-2 mt-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <p className="mt-4 text-sm text-gray-600">
              Already have an account? <a href="/auth" className="text-blue-500">Sign In</a>
            </p>
          </form>
          <div className="mt-6">
            <p className="text-sm text-gray-600">Or sign up with</p>
            <div className="flex space-x-6 mt-2 justify-center">
              <SocialLogin />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;

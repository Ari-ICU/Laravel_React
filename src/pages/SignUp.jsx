import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import SocialLogin from "../components/SocialLogin";

const SignUpPage = () => {
  const { signIn } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages
    setLoading(true); // Start loading

    // Check if passwords match
    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Simulate a sign-up process
      await signIn(credentials); // You might want to replace this with a sign-up function
    } catch (err) {
      setError("Error during sign-up");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
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
          <form
            onSubmit={handleSignUp}
            className="mt-6 space-y-4 space-x-5 mx-auto w-full max-w-sm"
          >
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
                autoFocus
                placeholder="Enter your email"
                aria-label="Email Address"
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
                minLength="6"
                placeholder="Enter your password"
                aria-label="Password"
              />
            </div>
            <div>
              <label className="block text-left text-sm font-semibold text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                value={credentials.confirmPassword}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                minLength="6"
                placeholder="Confirm your password"
                aria-label="Confirm Password"
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
              Already have an account?{" "}
              <a href="/auth" className="text-blue-500">
                Sign In
              </a>
            </p>
          </form>

          <div className="mt-6">
            <p className="text-sm text-gray-600">Or sign up with</p>
            <div className="flex space-x-6 mt-2 justify-center">
              <SocialLogin /> {/* Use the SocialLogin component */}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;

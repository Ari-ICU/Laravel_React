import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import logo from "../assets/perfume.png";
import { Link, useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { isAuthenticated, signIn, signOut } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize the navigate function

  // Scroll-based Parallax effect
  const [scrollY, setScrollY] = useState(0);
  const imageSpring = useSpring({
    transform: `translateY(${scrollY * 0.2}px)`,
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateInputs = () => {
    let newErrors = { email: "", password: "" };
    let valid = true;

    if (!credentials.email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }

    if (!credentials.password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (credentials.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });
    setError("");

    if (!validateInputs()) return;

    try {
      await signIn(credentials);
      navigate("/"); // Redirect to the homepage after successful sign-in
    } catch (err) {
      console.error("Sign-in error:", err);

      let newErrors = { email: "", password: "" };
      let errorMessage = err.message || "An error occurred during sign-in.";

      if (err.code === "auth/user-not-found") {
        newErrors.email = "No account found with this email.";
      } else if (err.code === "auth/wrong-password") {
        newErrors.password = "Incorrect password. Please try again.";
      } else if (err.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please sign in.";
      }

      setErrors(newErrors);
      setError(errorMessage);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Sign-out error:", err);
      setError("Error during sign-out. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-10 px-2">
      <motion.div
        className="max-w-6xl w-full p-6 rounded-lg shadow-lg flex flex-col lg:flex-row bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Column: Image */}
        <animated.div className="w-full lg:w-1/2 flex justify-center items-center" style={imageSpring}>
          <motion.img
            src={logo}
            alt="Logo"
            className="w-full h-full object-cover rounded-lg"
          />
        </animated.div>

        {/* Right Column: Auth Form */}
        <motion.div
          className="w-full lg:w-1/2 p-6"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isAuthenticated ? (
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-700">Welcome back!</h2>
              <button
                onClick={handleSignOut}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-700">Please Sign In</h2>
              <form onSubmit={handleSignIn} className="mt-4 space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-left text-sm font-semibold text-gray-600">Email</label>
                  <input
                    type="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    className={`w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 
                                ${errors.email ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-left text-sm font-semibold text-gray-600">Password</label>
                  <input
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className={`w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 
                                ${errors.password ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
                    required
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* General Error Message */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Sign In Button */}
                <motion.button
                  type="submit"
                  className="w-full py-2 mt-4 bg-blue-500 cursor-pointer text-white rounded-full hover:bg-blue-600 transition"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  Sign In
                </motion.button>

                <p className="mt-4 text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-500 hover:underline">
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;

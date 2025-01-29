import React from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Import React Icons
import { motion } from "framer-motion"; // Import framer-motion for animations

const SocialLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://your-laravel-api-domain.com/auth/google";
  };

  const handleFacebookLogin = () => {
    window.location.href = "http://your-laravel-api-domain.com/auth/facebook";
  };

  return (
    <div className="flex flex-row space-x-4 justify-center items-center">
      {/* Google Button with Motion Animation */}
      <motion.button
        onClick={handleGoogleLogin}
        className="w-12 py-3 px-3 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center space-x-4 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaGoogle className="text-xl" /> {/* Google Icon */}
        {/* Button Text */}
      </motion.button>

      {/* Facebook Button with Motion Animation */}
      <motion.button
        onClick={handleFacebookLogin}
        className="w-12 py-3 px-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center justify-center space-x-4 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaFacebook className="text-xl" /> {/* Facebook Icon */}
        {/* Button Text */}
      </motion.button>
    </div>
  );
};

export default SocialLogin;

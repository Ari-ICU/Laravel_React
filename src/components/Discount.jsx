import React from "react";
import { motion } from "framer-motion";
import useTypingEffect from "./useTypingEffect"; // Import the custom hook

const Discount = () => {
  // Use the typing effect hook for each paragraph
  const displayText = useTypingEffect(
    "Get 20% off on your first purchase – Experience luxury.",
    "Don't miss out – this offer is valid for a limited time only."
  );

  const discountVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className="discount-section text-white p-6 rounded-lg shadow-lg relative bg-gradient-to-r from-purple-500 to-pink-500"
      initial="hidden"
      animate="visible"
      transition={{ duration: 1 }}
      variants={discountVariants}
    >
      {/* Title Animation */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-semibold"
      >
        Exclusive Offer!
      </motion.h2>

      {/* Typing Animation for First Paragraph */}
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 1.2 }}
        className="mt-2 text-lg sm:text-xl"
      >
        <span className="inline-block text-yellow-300">{displayText}</span>
      </motion.p>

      {/* Button Animation */}
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "#fbbf24" }} // Hover effect
        whileTap={{ scale: 0.95 }} // Tap effect
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="mt-6 bg-yellow-500 text-black p-3 rounded-lg hover:bg-yellow-400 transition-all duration-300"
      >
        Redeem Offer
      </motion.button>
    </motion.div>
  );
};

export default Discount;

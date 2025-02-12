import React from "react";
import { motion } from "framer-motion";

const Discount = () => {
  const discountVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className="bg-[#8fa00c] text-white p-6 rounded-sm shadow-lg"
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
      variants={discountVariants}
    >
      {/* Title Animation */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-semibold"
      >
        Special Discount!
      </motion.h2>

      {/* Typing Animation for Description */}
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-2"
      >
        <span className="inline-block text-[rgb(43,36,255)] animate-pulse">
          Get 20% off on your next purchase.
        </span>
      </motion.p>

      {/* Button Animation */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-4 bg-yellow-500 text-black p-2 rounded hover:bg-yellow-400"
      >
        Claim Offer
      </motion.button>
    </motion.div>
  );
};

export default Discount;

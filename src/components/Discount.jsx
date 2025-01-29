import React from "react";
import { motion } from "framer-motion";

const Discount = () => {
  const discountVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className="bg-red-500 text-white p-6 rounded-lg shadow-lg"
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
      variants={discountVariants}
    >
      <motion.h2
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-semibold"
      >
        Special Discount!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-2"
      >
        Get 20% off on your next purchase.
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-4 bg-yellow-500 text-black p-2 rounded hover:bg-yellow-400"
      >
        Claim Offer
      </motion.button>
    </motion.div>
  );
};

export default Discount;

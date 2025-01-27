import React from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-[400px] bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
      </motion.div>
    </div>
  );
};

export default NotFound;

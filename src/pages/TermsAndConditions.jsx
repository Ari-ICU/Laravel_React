import React from "react";
import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 p-8"
    >
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-gray-700">
          Welcome to our app! By using our services, you agree to the following
          terms and conditions...
        </p>
        {/* Add more content here */}
      </div>
    </motion.div>
  );
};

export default TermsAndConditions;

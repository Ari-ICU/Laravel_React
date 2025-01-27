import React from "react";
import { motion } from "framer-motion";
import perfume from "../assets/perfume.png";

const HeroSection = () => {
  return (
    <section className="bg-gray-900 text-white h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 gap-10 grid grid-cols-1 lg:grid-cols-2 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full text-center lg:text-left order-2 lg:order-1"
        >
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Company</h1>
          <p className="text-xl mb-8">
            We provide the best solutions for your business needs.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full lg:order-2 order-1"
        >
          <img
            src={perfume}
            alt="Hero Image"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

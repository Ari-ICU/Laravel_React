import React from "react";
import { motion } from "framer-motion";
import { FaShoppingBag, FaGift, FaHeart } from "react-icons/fa"; // Importing React Icons

const services = [
  {
    title: "Curated Fragrance Selection",
    description: "Discover expertly chosen perfumes from top brands and niche artisans.",
    icon: <FaShoppingBag className="h-12 w-12 text-pink-500 mb-4" />, // Shopping Bag Icon
  },
  {
    title: "Personalized Recommendations",
    description: "Find your perfect scent with tailored recommendations based on your preferences.",
    icon: <FaGift className="h-12 w-12 text-yellow-500 mb-4" />, // Gift Icon
  },
  {
    title: "Exclusive Offers & Samples",
    description: "Enjoy special deals and try new scents with complimentary samples.",
    icon: <FaHeart className="h-12 w-12 text-red-500 mb-4" />, // Heart Icon
  },
];

const ServiceSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="py-12 text-gray-800" // Changed text color to gray-800 for better readability
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-center mb-8"
        >
          Our Perfume Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 bg-white rounded-lg shadow-lg" // Added white background for perfume shop vibe
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-center">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ServiceSection;
import React from "react";
import { motion } from "framer-motion";
import { usePartners } from "../context/PartnerContext";

const PartnerSection = () => {
  const { partners, loading, error } = usePartners();

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto  mb-20 mt-10 bg-white rounded-lg shadow-lg">
        <p className="text-center text-gray-500">Loading partners...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto  mb-20 mt-10  bg-white rounded-lg shadow-lg">
        <p className="text-center text-red-500">
          Failed to load partners. Please try again.
        </p>
      </div>
    );
  }

  if (!partners || partners.length === 0) {
    return (
      <div className="max-w-3xl mx-auto mb-20 mt-10 bg-white rounded-lg shadow-lg">
        <p className="text-center text-gray-500">No partners available.</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Partners
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {partners.map((partner) => (
            <div key={partner.id} className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-full h-32 object-contain"
              />
              <p className="text-center mt-4 text-sm font-semibold">
                {partner.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerSection;

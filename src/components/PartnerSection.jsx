import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PartnerSection = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    // Replace with your API endpoint
    fetch("https://api.example.com/partners")
      .then((response) => response.json())
      .then((data) => setPartners(data))
      .catch((error) => console.error("Error fetching partners:", error));
  }, []);

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
          className="grid grid-cols-4 md:grid-cols-6 gap-8"
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
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerSection;

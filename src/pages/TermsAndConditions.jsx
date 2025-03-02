import React from "react";
import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FDF7F0] p-8 flex items-center justify-center"
    >
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-4xl font-bold mb-6 text-[#6B4226]">
          Terms & Conditions
        </h1>
        <p className="text-gray-700 mb-4">
          Welcome to <span className="font-semibold">CELESTINE</span>. By
          purchasing our perfumes and using our services, you agree to the
          following terms and conditions:
        </p>

        <h2 className="text-2xl font-semibold mt-4 text-[#6B4226]">
          1. Product Authenticity
        </h2>
        <p className="text-gray-700">
          We guarantee that all our perfumes are made with premium ingredients
          and comply with international fragrance safety standards.
        </p>

        <h2 className="text-2xl font-semibold mt-4 text-[#6B4226]">
          2. Returns & Refunds
        </h2>
        <p className="text-gray-700">
          Due to the nature of perfumes, we only accept returns on **unopened
          and unused** products within **14 days of purchase**.
        </p>

        <h2 className="text-2xl font-semibold mt-4 text-[#6B4226]">
          3. Allergies & Sensitivities
        </h2>
        <p className="text-gray-700">
          Our perfumes contain essential oils and fragrance compounds. If you
          have **skin sensitivities or allergies**, please test a small amount
          before full application.
        </p>

        <h2 className="text-2xl font-semibold mt-4 text-[#6B4226]">
          4. Usage Guidelines
        </h2>
        <p className="text-gray-700">
          Perfumes are for **external use only**. Avoid contact with eyes and
          store in a cool, dry place away from direct sunlight.
        </p>

        <h2 className="text-2xl font-semibold mt-4 text-[#6B4226]">
          5. Privacy Policy
        </h2>
        <p className="text-gray-700">
          We respect your privacy. Your personal data is securely stored and
          never shared with third parties for marketing without your consent.
        </p>

        <p className="text-gray-700 mt-6">
          By purchasing from{" "}
          <span className="font-semibold">[Your Perfume Brand]</span>, you agree
          to abide by these terms.
        </p>
      </div>
    </motion.div>
  );
};

export default TermsAndConditions;

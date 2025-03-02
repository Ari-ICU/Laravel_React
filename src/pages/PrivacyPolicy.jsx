import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FDF7F0] p-8 flex items-center justify-center"
    >
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-4xl font-bold mb-6 text-[#6B4226]">
          Privacy Policy
        </h1>
        <p className="text-gray-700 mb-4">
          Welcome to <span className="font-semibold">CELESTINE</span>. We
          respect your privacy and are committed to protecting your personal
          data. This Privacy Policy explains how we collect, use, and safeguard
          your information.
        </p>

        <h2 className="text-2xl font-semibold mt-4 text-[#6B4226]">
          1. Information We Collect
        </h2>
        <p className="text-gray-700">
          - Personal details: Name, email, phone number, and shipping address. -
          Purchase history: Orders placed on our website. - Payment details:
          Securely processed via third-party payment gateways. - Device and
          browsing data for a better shopping experience.
        </p>

        <h2 className="text-2xl font-semibold mt-4 text-[#6B4226]">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-700">
          - To process and deliver your orders. - To improve our perfumes and
          customer service. - To send promotional offers (only with your
          consent). - To enhance website security and user experience.
        </p>

        <h2 className="text-2xl font-semibold mt-4 text-[#6B4226]">
          3. Data Security
        </h2>
        <p className="text-gray-700">
          We use industry-standard encryption and security measures to protect
          your personal data. Your payment details are never stored on our
          servers.
        </p>

        <h2 className="text-2xl font-semibold mt-4 text-[#6B4226]">
          4. Third-Party Services
        </h2>
        <p className="text-gray-700">
          We may share necessary data with **trusted partners** (e.g., payment
          processors, delivery services) to fulfill your orders. We do **not**
          sell or rent your data to third parties.
        </p>

        <h2 className="text-2xl font-semibold mt-4 text-[#6B4226]">
          5. Cookies & Tracking
        </h2>
        <p className="text-gray-700">
          Our website uses cookies to enhance your browsing experience. You can
          disable cookies in your browser settings if preferred.
        </p>

        <h2 className="text-2xl font-semibold mt-4 text-[#6B4226]">
          6. Your Rights
        </h2>
        <p className="text-gray-700">
          You can request to access, update, or delete your personal data
          anytime. Simply contact our support team.
        </p>

        <p className="text-gray-700 mt-6">
          If you have any concerns about your data, feel free to contact us at
          <span className="font-semibold"> support@celestine.com</span>.
        </p>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;

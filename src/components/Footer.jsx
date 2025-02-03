import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import aba from "../assets/payment/aba.png";
import acleda from "../assets/payment/acleda.png";
import wingbank from "../assets/payment/wingbank.png";
import paypal from "../assets/payment/paypal.png";
import crediCard from "../assets/payment/creditecard.png";

const Social = () => {
  const iconVariants = {
    hover: { scale: 1.2, rotate: 15 },
    rest: { scale: 1, rotate: 0 },
  };

  return (
    <ul className="flex space-x-6 mt-4">
      {/* Facebook Icon */}
      <motion.li
        initial="rest"
        whileHover="hover"
        variants={iconVariants}
        transition={{ duration: 0.3 }}
      >
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="text-blue-600 text-3xl hover:text-blue-800 transition-colors" />
        </a>
      </motion.li>

      {/* Instagram Icon */}
      <motion.li
        initial="rest"
        whileHover="hover"
        variants={iconVariants}
        transition={{ duration: 0.3 }}
      >
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-pink-500 text-3xl hover:text-pink-700 transition-colors" />
        </a>
      </motion.li>

      {/* TIktok Icon */}
      <motion.li
        initial="rest"
        whileHover="hover"
        variants={iconVariants}
        transition={{ duration: 0.3 }}
      >
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTiktok className="text-blue-700 text-3xl hover:text-blue-900 transition-colors" />
        </a>
      </motion.li>
    </ul>
  );
};
const Footer = () => {
  const iconVariants = {
    hover: { scale: 1.2, rotate: -50 },
    rest: { scale: 1, rotate: 0 },
  };

  return (
    <motion.footer
      inherit={{ x: 0, y: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-[#AD9C8E] text-[#F7E6CA] py-8"
    >
      <div className="container mx-auto px-4 ">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="px-4 py-2">
            <div>
              <img src="" alt="logo" />
            </div>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              suscipit, odio ut ultricies.
            </p>
          </div>
          <div className="px-4 py-2">
            <h4 className="text-lg underline font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              <li className="hover:underline">
                <Link to="/terms">Term &Condition</Link>
              </li>
              <li className="hover:underline">
                <Link to="/privacy">Privacy &Policy</Link>
              </li>
            </ul>
          </div>
          <div className="px-4 py-2">
            <h4 className="text-lg underline font-semibold mb-4">
              Payment Method
            </h4>
            <div className="flex flex-wrap space-x-4 space-y-4">
              <motion.img
                initial="rest"
                whileHover="hover"
                variants={iconVariants}
                transition={{ duration: 0.3 }}
                src={aba}
                alt="aba"
                className="h-8 w-10"
              />
              <motion.img
                initial="rest"
                whileHover="hover"
                variants={iconVariants}
                transition={{ duration: 0.3 }}
                src={acleda}
                alt="wing"
                className="h-8 w-10"
              />
              <motion.img
                initial="rest"
                whileHover="hover"
                variants={iconVariants}
                transition={{ duration: 0.3 }}
                src={wingbank}
                alt="ACLEDA"
                className="h-8 w-10"
              />
              <motion.img
                initial="rest"
                whileHover="hover"
                variants={iconVariants}
                transition={{ duration: 0.3 }}
                src={paypal}
                alt="paypal"
                className="h-8 w-10"
              />
              <motion.img
                initial="rest"
                whileHover="hover"
                variants={iconVariants}
                transition={{ duration: 0.3 }}
                src={crediCard}
                alt="paypal"
                className="h-8 w-10"
              />
            </div>
          </div>
          <div className="px-4 py-2">
            <h4 className="text-lg underline font-semibold mb-4">
              Contact Info
            </h4>
            <ul className="space-y-2">
              <li className="hover:underline">+855 888 639 316</li>
              <li className="hover:underline">
                123, St. 456, Phnom Penh, Cambodia
              </li>
              <li className="hover:underline">thoeurn.ratha.kh@gamil.com</li>
            </ul>
            {Social()}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

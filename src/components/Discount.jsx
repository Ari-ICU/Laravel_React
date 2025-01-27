import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Typewriter = ({ text, speed = 50, loop = false }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    let interval;

    const startTyping = () => {
      interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text[index]);
          index++;
        } else {
          clearInterval(interval);
          if (loop) {
            setTimeout(() => {
              setDisplayedText("");
              index = 0; // Reset index for looping
              startTyping();
            }, 5000); // Wait before restarting
          }
        }
      }, speed);
    };

    startTyping();

    return () => clearInterval(interval);
  }, [text, speed, loop]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="whitespace-pre"
    >
      {displayedText}
    </motion.span>
  );
};

const Discount = ({ originalPrice = 0, discountPercentage = 0 }) => {
  // Defensive checks for valid input
  if (originalPrice === 0 || discountPercentage === 0) {
    return <p className="text-red-500">Invalid data provided for discount.</p>;
  }

  const discountedPrice = (
    originalPrice -
    (originalPrice * discountPercentage) / 100
  ).toFixed(2);

  return (
    <motion.div
      className="p-6 bg-blue-100 rounded-lg shadow-lg text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800">
        <Typewriter text="Special Offer!" loop={true} />
      </h2>

      {/* Original Price */}
      <p className="text-gray-600 mt-4">
        Original Price:{" "}
        <span className="line-through">
          <Typewriter text={`$${originalPrice.toFixed(2)}`} loop={true} />
        </span>
      </p>

      {/* Discounted Price */}
      <p className="text-green-600 font-semibold text-lg mt-2">
        Now: <Typewriter text={`$${discountedPrice}`} loop={true} />
      </p>

      {/* Savings */}
      <p className="text-sm text-gray-500 mt-4">
        <Typewriter text={`You save ${discountPercentage}%!`} loop={true} />
      </p>
    </motion.div>
  );
};

export default Discount;

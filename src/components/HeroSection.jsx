import React, { useRef, useEffect } from "react";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import perfume from "../assets/perfume.png";
import { useNavigate } from "react-router-dom";
import useTypingEffect from "./useTypingEffect"; // Import the custom hook

const HeroSection = () => {
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const { scrollY } = useViewportScroll();

  // The initial and second texts for the typing effect
  const firstText = "Elevate Your Senses with Our Premium Fragrance Collection";
  const secondText = "Discover the Perfect Scent for Every Moment";

  // Use the hook to manage the typing effect
  const displayText = useTypingEffect(firstText, secondText);

  // Parallax effect for the image
  const y = useTransform(scrollY, [0, 300], [0, 150]);

  // Handle button click to navigate to the product page
  const handleBtnClick = () => {
    navigate("/products");
  };

  // Breathing animation for the image
  useEffect(() => {
    if (!imageRef.current) return;

    let animationFrameId;

    const animate = () => {
      const scale = 1 + Math.sin(Date.now() * 0.001) * 0.02; // Breathing effect
      imageRef.current.style.transform = `scale(${scale})`;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup animation frame on unmount
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section className="text-black h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 gap-10 grid grid-cols-1 sm:grid-cols-2 items-center relative">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full text-center lg:text-left order-2 lg:order-1"
        >
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-l from-green-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent"
          >
            {displayText || ""} {/* Fallback text while typing */}
          </motion.h1>
          <p className="text-lg sm:text-xl mb-8 text-gray-700">
            Explore our curated collection of exquisite perfumes, crafted for
            every occasion.
          </p>

          <motion.button
            onClick={handleBtnClick}
            whileHover={{ scale: 1.1, backgroundColor: "#6B46C1" }}
            whileTap={{ scale: 0.9 }}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            Shop Now
          </motion.button>
        </motion.div>

        {/* Image with Parallax Effect */}
        <div className="w-full lg:order-2 order-1 overflow-hidden rounded-lg">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, delay: 0.3 }}
            style={{ y }}
            className="inset-0 w-full h-full"
          >
            <img
              ref={imageRef}
              src={perfume}
              alt="Premium Fragrance Collection"
              className="w-full h-full object-cover rounded-lg"
              style={{ willChange: "transform" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

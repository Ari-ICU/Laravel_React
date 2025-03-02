import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PartnerSection = () => {
  // Static data for partners
  const partners = [
    { id: 1, logo: "https://via.placeholder.com/150", name: "Partner 1" },
    { id: 2, logo: "https://via.placeholder.com/150", name: "Partner 2" },
    { id: 3, logo: "https://via.placeholder.com/150", name: "Partner 3" },
    { id: 4, logo: "https://via.placeholder.com/150", name: "Partner 4" },
    { id: 5, logo: "https://via.placeholder.com/150", name: "Partner 5" },
    { id: 6, logo: "https://via.placeholder.com/150", name: "Partner 6" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Partners
        </motion.h2>

        {/* Swiper Slider */}
        <Swiper
          spaceBetween={30} // Space between slides
          slidesPerView="auto" // Auto slides per view
          loop={true} // Infinite loop
          grabCursor={true} // Allows grabbing
          breakpoints={{
            640: {
              slidesPerView: 2, // 2 slides on small screens
            },
            768: {
              slidesPerView: 3, // 3 slides on medium screens
            },
            1024: {
              slidesPerView: 4, // 4 slides on large screens
            },
          }}
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id} className="p-6 rounded-lg shadow-lg bg-white">
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-full h-32 object-contain"
              />
              <p className="text-center mt-4 text-sm font-semibold text-gray-700">
                {partner.name}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PartnerSection;

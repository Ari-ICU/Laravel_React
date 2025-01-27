import React from "react";
import Layout from "../components/Layout";
import Feature from "../components/Feature";
import ReviewSection from "../components/Reviews";
import Carousel from "../components/Carousel";
import ServiceSection from "../components/ServiceSection";
import Discount from "../components/Discount";

const Homepage = () => {
  return (
    <>
      {/* Carousel Section */}
      <Carousel />

      <Discount originalPrice={100} discountPercentage={20} />
      {/* Feature Section */}
      <Feature />

      {/* Review Section */}
      <ReviewSection />

      {/* Service section */}
      <ServiceSection />
    </>
  );
};

export default Homepage;

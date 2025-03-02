import React, { Suspense, lazy } from "react";
import Feature from "../components/Feature";
import ReviewSection from "../components/ReviewSection";
import ServiceSection from "../components/ServiceSection";
import Discount from "../components/Discount";

const LazyCarousel = lazy(() => import("../components/Carousel"));

const Homepage = () => {
  return (
    <>
      {/* Carousel Section - Lazy Loaded */}
      <Suspense fallback={<div>Loading Carousel...</div>} cla>
      <div className="py-2">

      <LazyCarousel />

      </div>
      </Suspense>

     
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

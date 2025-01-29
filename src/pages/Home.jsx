import React, { useRef } from "react";
import { useAnimationFrame } from "motion/react";
import Feature from "../components/Feature";
import ReviewSection from "../components/ReviewSection";
import Carousel from "../components/Carousel";
import ServiceSection from "../components/ServiceSection";
import Discount from "../components/Discount";

const Homepage = () => {
  const ref = useRef(null);

  // Animate the cube with rotation and movement
  useAnimationFrame((time) => {
    if (ref.current) {
      const rotate = Math.sin(time / 1000) * 50; // Rotate the cube
      const yMovement = Math.sin(time / 1500) * -50; // Vertical movement

      ref.current.style.transform = `translateY(${yMovement}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
    }
  });

  return (
    <>
      {/* Rotating Cube Background */}
      <div
        ref={ref}
        className="w-full fixed  h-screen"
        style={{
          zIndex: -1,
          transformStyle: "preserve-3d", // Enable 3D transformations
        }}
      >
        <div className="cube">
          <div className="side front" />
          <div className="side left" />
          <div className="side right" />
          <div className="side top" />
          <div className="side bottom" />
          <div className="side back" />
        </div>
        <StyleSheet />
      </div>

      {/* Carousel Section */}
      <Carousel />

      <Discount />
      {/* Feature Section */}
      <Feature />

      {/* Review Section */}
      <ReviewSection />

      {/* Service section */}
      <ServiceSection />
    </>
  );
};

function StyleSheet() {
  return (
    <style>{`
      .cube {
        width: 200px;
        height: 200px;
        position: relative;
        transform-style: preserve-3d;
        margin: 0 auto;
      }

      .side {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: red;
        opacity: 0.6;
      }

      .front {
        transform: rotateY(0deg) translateZ(100px);
        background-color: rgba(255, 0, 0, 0.5);
      }

      .right {
        transform: rotateY(90deg) translateZ(100px);
        background-color: rgba(0, 255, 0, 0.5);
      }

      .back {
        transform: rotateY(180deg) translateZ(100px);
        background-color: rgba(0, 0, 255, 0.5);
      }

      .left {
        transform: rotateY(-90deg) translateZ(100px);
        background-color: rgba(255, 255, 0, 0.5);
      }

      .top {
        transform: rotateX(90deg) translateZ(100px);
        background-color: rgba(0, 255, 255, 0.5);
      }

      .bottom {
        transform: rotateX(-90deg) translateZ(100px);
        background-color: rgba(255, 0, 255, 0.5);
      }
    `}</style>
  );
}

export default Homepage;

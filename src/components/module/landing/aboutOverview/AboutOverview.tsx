"use client";
import React from "react";
import { images } from "@/constants/data";
import BgAnimateShape from "@/components/element/animations/BgAnimateShape";
import AboutImage from "./AboutImage";
import AboutText from "./AboutText";
import { motion } from "framer-motion";
import { staggerContainer } from "@/utils/motion";

const AboutOverview: React.FC = () => {
  return (
    <motion.div
      variants={staggerContainer(0.2, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="flex h-auto md:h-[800px] sm:h-[500px]"
    >
      <div className="relative w-1/2 h-full">
        {/* Background Shape */}
        <div className="relative top-0 right-[-5rem]">
          <BgAnimateShape animation="animate-bounce " />
        </div>

        {/* Images */}
        <div>
          {images.map((image, index) => (
            <AboutImage key={index} {...image} />
          ))}
        </div>
      </div>

      {/* Right Side: Text */}
      <AboutText />
    </motion.div>
  );
};

export default AboutOverview;

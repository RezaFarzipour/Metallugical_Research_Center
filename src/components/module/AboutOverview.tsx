"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { images } from "@/config/data";
import AboutImage from "../element/aboutOverview/AboutImage";
import AboutText from "../element/aboutOverview/AboutText";
import SectionWrapper from "../../hoc/SectionWrapper";
import { fadeIn } from "../../utils/motion";

const AboutOverview: React.FC = () => {
  const { ref: firstImageRef, isVisible } = useIntersectionObserver(0.5);

  return (
    <div className="flex h-auto md:h-[800px] sm:h-[500px]">
      <div className="relative w-1/2 h-full">
        {/* Background Shape */}
        <motion.div
          ref={firstImageRef}
          variants={fadeIn(0, 6, 0.5)}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
        >
          <Image
            src="/images/about-shape.png"
            alt="About shape"
            width={300}
            height={200}
            className="animate-bounce [animation-duration:12s] absolute top-0 right-[-90px] w-[300px] md:w-[300px] lg:w-[300px] brightness-[80%]"
          />
        </motion.div>

        {/* Images */}
        <div>
          {images.map((image, index) => (
            <AboutImage key={index} {...image} />
          ))}
        </div>
      </div>

      {/* Right Side: Text */}
      <AboutText />
    </div>
  );
};

export default SectionWrapper(AboutOverview, "about-overwiew");

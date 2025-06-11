"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { imageReveal, shimmerEffect } from "@/utils/motion";

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string; 
};

const AboutImage: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
}) => {
  const { ref: imageRef, isVisible } = useIntersectionObserver(0.5);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    if (isVisible) {
      controls.start(imageReveal(0, width).show);
    }
  }, [controls, isVisible]);

  return (
    <motion.div
      ref={imageRef}
      className={` overflow-hidden transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={imageReveal(0, width)}
      initial="hidden"
      animate={controls}
    >
      {/* Main Image */}
      <Image src={src} alt={alt} width={width} height={height} />

      {/* Shimmer effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"
          {...shimmerEffect()}
        />
      )}
    </motion.div>
  );
};

export default AboutImage;

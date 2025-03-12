import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { shimmerEffect } from "@/utils/motion";

interface ImageContainerProps {
  image: string;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
}

export const ImageContainer: React.FC<ImageContainerProps> = ({
  image,
  isHovered,
  setIsHovered,
}) => (
  <div className="relative w-full h-full overflow-hidden rounded-xl ">
    <Image
      width={500}
      height={500}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      alt="Card example background"
      className="  w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 group-hover:rotate-2 "
      src={image}
    />
    {isHovered && (
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"
        {...shimmerEffect()}
      />
    )}
  </div>
);

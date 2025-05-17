import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { shimmerEffect } from "@/utils/motion";

interface ImageContainerProps {
  image: string | undefined;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
  view: boolean;
}


const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? "http://localhost:8000";

const getValidImageSrc = (src: string | undefined): string => {
  if (!src) return "/fallback.jpg";
  if (src.startsWith("http") || src.startsWith("/")) return src;
  return `${BASE_URL}/${src}`;
};


export const ImageContainer: React.FC<ImageContainerProps> = ({
  image,
  isHovered,
  setIsHovered,
  view,
}) => (
  <div
    className={`relative w-full h-full overflow-hidden ${view && "rounded-xl"}`}
  >
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="  w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 group-hover:rotate-2 "
      initial="hidden"
    >
      {/* Main Image */}
      <Image
        width={500}
        height={500}
        alt="Card example background"
        src={getValidImageSrc(image)}
      />
      {/* Shimmer effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"
          {...shimmerEffect()}
        />
      )}
    </motion.div>
  </div>
);

"use client";

import React from "react";
import { motion } from "framer-motion";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Image from "next/image";
import { fadeIn } from "@/utils/motion";
import { cn } from "@/utils/cn";

interface Props {
  animation?: string;
  width?: string;
}

const BgAnimateShape: React.FC<Props> = ({ animation, width }) => {
  const { ref: firstImageRef, isVisible } = useIntersectionObserver(0.5);

  return (
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
        className={cn(
          animation,
          "[animation-duration:12s]",
          `w-[${width}px]`,
          "md:w-[300px]",
          "lg:w-[300px]",
          "brightness-[80%]"
        )}
      />
    </motion.div>
  );
};

export default BgAnimateShape;

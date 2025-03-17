"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeInSlide } from "@/utils/motion";

type Props = {
  children: React.ReactNode;
  size?: string;
};

const TitleStructure = ({ children, size }: Props) => {
  return (
    <motion.div variants={fadeInSlide("left", "tween", 0.2, 1)}>
      <div className="flex">
        <div className="border-4 border-secondary-700 rounded-lg py-2"></div>

        <p
          className={`flex justify-center items-center mr-2 font-bold text-gray-600 tracking-wide ${
            size ? `text-xs md:text-[1rem]` : "text-xs md:text-sm"
          }`}
        >
          {children}
        </p>
      </div>
    </motion.div>
  );
};

export default TitleStructure;

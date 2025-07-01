"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import backToUp from "@/utils/BackToUp";
import { FaArrowUp } from "react-icons/fa";

const BackToUpBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="fixed left-4 bottom-20 z-[1000]"
    >
      <button
        onClick={() => backToUp()}
        className="bg-gray-100 text-secondary-400 font-bold flex items-center justify-center p-3 rounded-md shadow-md hover:bg-secondary-500 hover:text-white hover:-translate-y-1 active:bg-secondary-700 active:translate-y-0 transition-all duration-300"
      >
        <FaArrowUp size={14} />
      </button>
    </motion.div>
  );
};

export default BackToUpBtn;

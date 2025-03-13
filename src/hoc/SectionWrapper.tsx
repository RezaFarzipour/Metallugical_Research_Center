"use client";
import React from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "../utils/motion";

const SectionWrapper = (Component: React.FC, idName: string): React.FC => {
  const WrappedComponent = () => {
    return (
      <motion.section
        variants={staggerContainer(0.5, 0.25)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="max-w-7xl mx-auto relative z-0 px-6 sm:px-8 lg:px-12"
      >
        {/* Anchor link */}
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        {/* Render the wrapped component */}
        <Component />
      </motion.section>
    );
  };

  WrappedComponent.displayName = `SectionWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

export default SectionWrapper;

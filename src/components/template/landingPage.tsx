"use client";
import React from "react";
import AboutOverview from "../module/AboutOverview";
import BlogCardModule from "../module/BlogCardModule";
import FaqAccordian from "../module/FaqAccordian";
type Props = {};

const LandingPage = (props: Props) => {
  return (
    <>
      <AboutOverview />
      <BlogCardModule />
      <FaqAccordian/>
    </>
  );
};

export default LandingPage;

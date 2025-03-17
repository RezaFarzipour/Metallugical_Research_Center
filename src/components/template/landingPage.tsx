"use client";
import React from "react";
import AboutOverview from "../module/AboutOverview";
import BlogCardModule from "../module/BlogCardModule";
import ArrowIconEndContent from "../element/animations/ArrowIconEndContent";
type Props = {};

const LandingPage = (props: Props) => {
  return (
    <>
      <AboutOverview />
      <BlogCardModule />.
    </>
  );
};

export default LandingPage;

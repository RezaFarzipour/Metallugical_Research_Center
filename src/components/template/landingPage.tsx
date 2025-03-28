"use client";
import React from "react";
import AboutOverview from "../module/AboutOverview";
import BlogCardModule from "../module/BlogCardModule";
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

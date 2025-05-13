"use client";
import React from "react";
import LandingHeader from "../module/landing/LandingHeader";
import AboutOverview from "../module/landing/aboutOverview/AboutOverview";
import FaqAccordian from "../module/landing/FaqAccordian";
import Blogs from "../module/landing/Blogs";
import Services from "../module/landing/Services";

const LandingPage = () => {
  return (
    <main className="w-full overflow-x-hidden ">
      {/* Hero Header */}
      <section className="w-full ">
        <LandingHeader />
      </section>
      {/* About Section */}
      <section className="w-full py-20">
        <AboutOverview />
      </section>

      {/* Services Section */}
      <section className="w-fullpx-4 md:px-8 py-16">
        <Services />
      </section>
      {/* FAQ Section */}
      <section className="w-full  py-16 ">
        <FaqAccordian />
      </section>
      {/* Blog Section */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16">
        <Blogs />
      </section>
    </main>
  );
};

export default LandingPage;

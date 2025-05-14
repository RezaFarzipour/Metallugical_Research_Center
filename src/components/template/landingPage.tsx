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
      <section className="w-full mt-40">
        <AboutOverview />
      </section>

      {/* Services Section */}
      <section className="w-full">
        <Services />
      </section>
      {/* FAQ Section */}
      <section className="w-full  my-40 ">
        <FaqAccordian />
      </section>
      {/* Blog Section */}
      <section className="w-full my-40">
        <Blogs />
      </section>
    </main>
  );
};

export default LandingPage;

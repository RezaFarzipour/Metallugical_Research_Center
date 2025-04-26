"use client";
import React from "react";
import BlogCardModule from "../module/BlogCardModule";
import FaqAccordian from "../module/FaqAccordian";
import LandingHeader from "../module/LandingHeader";
import { showToast } from "@/store/useToastSlice";
import AboutOverview from "../module/aboutOverview/AboutOverview";

const LandingPage = () => {
  return (
    <main className="w-full overflow-x-hidden bg-[#fcfcfc]">
      {/* Hero Header */}
      <section className="w-full bg-[#f9f9f9]">
        <LandingHeader />
      </section>

      {/* About Section */}
      <section className="w-full   py-20">
        <AboutOverview />
      </section>

      {/* FAQ Section */}
      <section className="w-full mx-auto px-4 md:px-8 py-16 bg-[#f9f9f9]">
        <FaqAccordian />
      </section>

      {/* Blog Section */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16">
        <BlogCardModule />
      </section>
      <button onClick={() => showToast("عملیات موفقیت‌آمیز بود", "success")}>
        click
      </button>
    </main>
  );
};

export default LandingPage;

"use client";
import React from "react";
import AboutOverview from "../module/AboutOverview";
import BlogCardModule from "../module/BlogCardModule";
import FaqAccordian from "../module/FaqAccordian";
import { useQuery } from "@tanstack/react-query";
import { usercustomer } from "@/services/auth";
import LandingHeader from "../module/LandingHeader";


const LandingPage = () => {

const {data} = useQuery({
  queryKey:["user"],
  queryFn:usercustomer
})

console.log('data',data);

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
    </main>
  );
};

export default LandingPage;

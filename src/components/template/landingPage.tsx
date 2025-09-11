"use client";
import React from "react";
import LandingHeader from "../module/landing/LandingHeader";
import AboutOverview from "../module/landing/aboutOverview/AboutOverview";
import FaqAccordian from "../module/landing/FaqAccordian";
import Blogs from "../module/landing/Blogs";
import Services from "../module/landing/Services";
import { BlogType } from "@/types";
import { ServiceData } from "@/types/serviceType";
import BackToUpBtn from "../element/BackToUpBtn";
import Courses from "../module/landing/Courses";

type LandingPageProps = {
  initialData: ServiceData[];
  AllBlogs: BlogType[];
};

const LandingPage = ({ initialData, AllBlogs }: LandingPageProps) => {
  return (
    <main className="w-full overflow-x-hidden ">
      {/* Hero Header */}
      <section className="w-full ">
        <LandingHeader />
      </section>

      {/* About Section */}
      <section className="w-full mt-32 md:mt-60 mx-auto xl:max-w-screen-xl">
        <AboutOverview />
      </section>

      {/* Services Section */}
      <section className="w-full mt-44 md:mt-2">
        <Services initialData={initialData} />
      </section>

      {/* Courses Section */}
      <section className="w-full mt-36 md:mt-44">
        <Courses />
      </section>

      {/* FAQ Section */}
      <section className="w-full mt-36 md:mt-44 mx-auto xl:max-w-screen-xl">
        <FaqAccordian />
      </section>

      {/* Blog Section */}
      <section className="w-full mt-36 md:mt-44 mb-40">
        <Blogs AllBlogs={AllBlogs} />
      </section>

      <section>
        <BackToUpBtn />
      </section>
    </main>
  );
};

export default LandingPage;

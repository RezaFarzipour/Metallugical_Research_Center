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
      <section className="w-full mt-60 mx-auto xl:max-w-screen-xl">
        <AboutOverview />
      </section>

      {/* Services Section */}
      <section className="w-full">
        <Services initialData={initialData} />
      </section>
      {/* FAQ Section */}
      <section className="w-full  my-40  mx-auto xl:max-w-screen-xl">
        <FaqAccordian />
      </section>
      {/* Blog Section */}
      <section className="w-full my-40">
        <Blogs AllBlogs={AllBlogs} />
      </section>
      <section>
        <BackToUpBtn />
      </section>
    </main>
  );
};

export default LandingPage;

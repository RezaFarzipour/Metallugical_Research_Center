"use client";
import React from "react";
import AboutOverview from "../module/AboutOverview";
import BlogCardModule from "../module/BlogCardModule";
import FaqAccordian from "../module/FaqAccordian";
import { useQuery } from "@tanstack/react-query";
import { usercustomer } from "@/services/auth";


const LandingPage = () => {

const {data} = useQuery({
  queryKey:["user"],
  queryFn:usercustomer
})

console.log('data',data);

  return (
    <>
   
      <AboutOverview />
      <BlogCardModule />
      <FaqAccordian/>



    </>
  );
};

export default LandingPage;

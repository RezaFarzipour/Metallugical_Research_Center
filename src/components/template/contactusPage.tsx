"use client";

import React from "react";
import ContactusInformation from "../module/contactUs/ContactusInformation";
import dynamic from "next/dynamic";

const MapModule = dynamic(() => import("../module/contactUs/MapModule"), {
  ssr: false,
});

const ContactusPage = () => {
  return (
    <div className=" w-full flex flex-col mt-80">
      {/* main content */}

      <div className="w-full   my-20 flex flex-col lg:flex-row justify-around gap-5 items-center">
        <ContactusInformation />
      </div>

      {/* map section */}
      <div className="w-full">
        <MapModule />
      </div>
    </div>
  );
};

export default ContactusPage;

"use client";

import React from "react";
import MapModule from "../module/contactUs/MapModule";
import ContactusInformation from "../module/contactUs/ContactusInformation";

//import { Divider } from "@heroui/react";

const ContactusPage = () => {
  return (
    <div className=" w-full flex flex-col mt-80">
      {/* main content */}

      <div className="w-full   my-20 flex flex-col lg:flex-row justify-around gap-5 items-center">
        <ContactusInformation />
      </div>

      {/* map section */}
      <div>
        <MapModule />
      </div>
    </div>
  );
};

export default ContactusPage;

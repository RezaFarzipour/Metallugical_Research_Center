import React from "react";
import ContactusHeader from "../module/ContactusHeader";
import { FaRegClock } from "react-icons/fa6";

import MapModule from "../module/MapModule";
import ContactusInformation from "../module/ContactusInformation";
//import { Divider } from "@heroui/react";

const ContactusPage = () => {
  return (
    <div className=" w-full flex flex-col ">
      {/* banner section */}
      <ContactusHeader />

      {/* main content */}

      <div className="w-full  my-20 flex flex-col lg:flex-row justify-around gap-5 items-center">
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

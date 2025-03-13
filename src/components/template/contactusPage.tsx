import React from "react";
import ContactusHeader from "../module/contactusHeader";
import { FaRegClock } from "react-icons/fa6";
import { contactusinformation } from "@/constants/data";
import MapModule from "../module/mapModule";
import ContactusInformation from "../module/clipedDrawer/contactusInformation";
//import { Divider } from "@heroui/react";

const ContactusPage = () => {
  return (
    <div className=" w-full flex flex-col ">
      {/* banner section */}
      <ContactusHeader />

      {/* main content */}

      <div className="w-full  my-20 flex flex-col lg:flex-row justify-around gap-5 items-center">
        <ContactusInformation/>
      </div>


      {/* map section */}
      <div>
        <MapModule/>
      </div>
    </div>
  );
};

export default ContactusPage;

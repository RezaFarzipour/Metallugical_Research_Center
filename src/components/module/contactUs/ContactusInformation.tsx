import { contactusinformation } from "@/constants/data";
import React from "react";
import { FaRegClock } from "react-icons/fa";
import Lottie from "lottie-react";
import AnimationData from "../../../../public/Animation - 1748005230216.json";
const ContactusInformation = () => {
  return (
    <>
      {/*right */}
      <div className="w-full lg:w-1/2 py-10 mx-auto">
        <Lottie animationData={AnimationData} loop={true} />
      </div>
      {/* left */}
      <div className="w-full flex flex-col items-center gap-5 lg:w-1/2  mx-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold ">
          دکتر محمد سلیمی
        </h1>
        <p className="font-bold text-xl">زمان فعالیت آزمایشگاه</p>
        <div className="flex items-center gap-5">
          <p className=" text-default-600  flex items-center gap-3">
            <FaRegClock />
            شنبه تا چهارشنبه
          </p>
          <p className="text-default-600 flex items-center gap-3">
            <FaRegClock /> 8 صبح - ۴ بعد از ظهر{" "}
          </p>
        </div>
        <div className="w-full h-[2px] bg-gray-300 mt-5"></div>
        <div className="flex flex-col gap-5 itema-end ">
          {contactusinformation.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="p-5 rounded-full bg-[#E0E3FA] text-center">
                <span className=" md:text-2xl">{<item.icon />}</span>
              </div>

              <div className="flex flex-col gap-4">
                <p className="font-extrabold  md:text-xl">{item.title}</p>
                <p className="text-default-600 ">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactusInformation;

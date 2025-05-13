import { Button } from "@heroui/button";
import Link from "next/link";
import React from "react";

const LandingHeader = () => {
  return (
    <section className=" relative w-full h-screen flex  justify-start overflow-hidden ">
      <div className="relative w-[90%] max-w-[800px] h-[220vh] md:h-[2300px] perspective-custom mt-[-60%] md:mt-[-80%] mr-[-20%] md:mr-[-5%]">
        <div className="w-full h-full slider relative" />
      </div>

      <div className="flex justify-center items-center -mt-16">
        <div className="relative z-10 text-right px-6 md:px-16 text-gray-600 space-y-4">
          <h1 className="text-xl md:text-3xl font-semibold leading-relaxed">
            به مرکز تحقیقات متالورژی{" "}
            <span className="font-normal text-[10px] md:text-[16px] md:text-base text-gray-400">
              (تخصصی سرب و روی)
            </span>{" "}
            خوش آمدید.
          </h1>

          <h2 className=" text-lg md:text-xl font-bold text-secondary-500">
            دانشگاه آزاد اسلامی زنجان
          </h2>
          <Link href="/services">
            <Button className="bg-secondary-600 text-white mt-4 px-6 py-2 text-sm md:text-base rounded-md hover:bg-secondary-700 transition duration-300">
              همین حالا رزرو کن ...
            </Button>
          </Link>
        </div>
      </div>

      {/* افکت مه */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#f9f9f9] via-[#f9f9f9]/80 to-transparent pointer-events-none z-20"></div>
    </section>
  );
};

export default LandingHeader;

import Button from "@/components/element/Button";
import React from "react";

const LandingHeader = () => {
  return (
    <section className=" relative w-full h-screen flex  justify-start overflow-hidden ">
      <div className="relative w-[100%] max-w-[800px] h-[150vh] md:h-[2300px]  perspective-custom mt-[-70%] md:mt-[-80%] mr-[-20%] md:mr-[-15%] lg:mr-[-10%] xl:mr-[-7%]">
        <div className="w-full h-full slider relative" />
      </div>

      <div className="flex justify-center items-center -mt-16">
        <div className="relative z-10 text-right px-6 md:px-16 text-gray-600 space-y-4">
          <h1 className="text-md md:text-3xl font-semibold leading-relaxed">
            به مرکز تحقیقات متالورژی{" "}
            <span className="font-normal text-[10px] md:text-[16px] md:text-base text-gray-400">
              (تخصصی سرب و روی)
            </span>{" "}
            خوش آمدید.
          </h1>

          <h2 className=" text-lg md:text-xl font-bold text-secondary-500">
            دانشگاه آزاد اسلامی زنجان
          </h2>
          <Button variant="primary" type="submit" path="/services">
            همین حالا رزرو کن ...
          </Button>
        </div>
      </div>

      {/* افکت مه */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#ffffff] via-[#f9f9f9]/80 to-transparent pointer-events-none z-20"></div>
    </section>
  );
};

export default LandingHeader;

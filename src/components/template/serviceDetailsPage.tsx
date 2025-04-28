import CarGallery from "@/components/module/ImageGallery";
import { sp } from "@/utils/formatter/numberFormatter";
import { Button } from "@heroui/button";
import Image from "next/image";
import React from "react";

const ServiceDetails = () => {
  return (
    <div className="w-full flex justify-center  gap-4 flex-col md:flex-row p-4">
      {/* right section */}
      <div className="w-full flex flex-col gap-4 mb-10 md:mb-0">
        <div className="flex  text-center items-center my-5 gap-4">
          <Image
            className="rounded-full"
            alt="image"
            width={70}
            height={70}
            src={"/images/blog1-img1.png"}
          />{" "}
          <h2 className="text-2xl font-bold"> اسم محصول</h2>
        </div>
        <p className="wrap text-justify text-default-400 mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel sunt,
          optio ex nostrum laudantium minima nemo alias iure, est error autem,
          magnam minus esse consequatur nihil. Magnam ipsa sit itaque quas saepe
          repellendus vel quaerat iste corporis debitis minus odit ex
        </p>

        <div className="text-center my-5  font-bold text-2xl">
          قیمت محصول:{sp(100000)}
        </div>

        <div className="flex justify-center w-full">
          <Button className="bg-secondary-500 rounded-5 w-[90%] text-default-50">
            رزرو کنید
          </Button>
        </div>
      </div>

      {/* left section */}
      <div className="w-full mb-10 md:mb-0">
        <CarGallery />
      </div>
    </div>
  );
};

export default ServiceDetails;

import Image from "next/image";
import React from "react";

type ServiceDetailRightSectionProps = {
  coverImageSrc: string;
  service_name: string;
};

const ServiceDetailRightSection = ({
  coverImageSrc,
  service_name,
}: ServiceDetailRightSectionProps) => {
  return (
    <div className="flex items-center space-x-4 rtl:space-x-reverse">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20">
        <Image
          className="rounded-full object-cover"
          alt="serviceImage"
          fill
          src={coverImageSrc}
        />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-secondary-500 pt-8">
        {service_name}
      </h2>
    </div>
  );
};

export default ServiceDetailRightSection;

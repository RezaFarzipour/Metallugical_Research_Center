import React from "react";
import Image from "next/image";
import BreadcrumbsElement from "../element/Breadcrumbs";

type HeaderImageProps = {
 
  
  panelHref: string;
  breadcrumbItem1: string;
};

const HeaderImage = ({
  breadcrumbItem1,
  panelHref,
}: HeaderImageProps) => {
  return (
    <div className="absolute top-0 left-0 w-full z-0">
      <header className="relative w-full h-96">
        <Image
          src="/images/contactus.jpg"
          priority
          alt="Contact Us"
          fill
          objectFit="cover"
          className=" z-0 brightness-50"
        />

        <div className="relative z-10 flex items-center justify-start h-full mr-14 text-white">
          <div className="flex flex-col gap-4">
            <h1 className="text-6xl font-bold">{breadcrumbItem1}</h1>
            <BreadcrumbsElement
              item1="خانه"
              item2={breadcrumbItem1}
              panelHref={panelHref}
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderImage;

"use client";
import React from "react";
import AboutImage from "../element/aboutOverview/AboutImage";
import AboutText from "../element/aboutOverview/AboutText";
import SectionWrapper from "../../hoc/SectionWrapper";
import BgAnimateShape from "../element/animations/BgAnimateShape";

const AboutOverview: React.FC = () => {
  return (
    <div className="flex h-auto md:h-[800px] sm:h-[500px]">
      <div className="relative w-1/2 h-full">
        {/* Background Shape */}
        <div className="relative top-0 right-[-5rem]">
          <BgAnimateShape animation="animate-bounce " />
        </div>

        {/* Images */}
        <div>
          {images.map((image, index) => (
            <AboutImage key={index} {...image} />
          ))}
        </div>
      </div>

      {/* Right Side: Text */}
      <AboutText />
    </div>
  );
};

export default SectionWrapper(AboutOverview, "about-overwiew");
const images = [
  {
    src: "/images/about1-image1.png",
    alt: "About image 1",
    width: 260,
    height: 300,
    className:
      "object-cover absolute top-0 right-4 sm:right-8 md:right-16 lg:right-28 ",
  },
  {
    src: "/images/about1-image2.png",
    alt: "About image 2",
    width: 360,
    height: 360,
    className:
      "object-cover absolute top-[4rem] sm:top-[5rem] md:top-[6rem] right-[8rem] sm:right-[10rem] md:right-[12rem] lg:right-[20rem]",
  },
  {
    src: "/images/about1-image3.png",
    alt: "About image 3",
    width: 340,
    height: 340,
    className:
      "object-cover absolute top-[18rem] sm:top-[20rem] md:top-[22rem] lg:top-[28rem] right-4 sm:right-8 md:right-16 lg:right-28",
  },
];

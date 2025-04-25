"use client";

import { SlCalender } from "react-icons/sl";
import { InfoItem } from "./InfoItem";
import { CgProfile } from "react-icons/cg";
import { Button } from "@heroui/button";
import React from "react";
import { twMerge } from "tailwind-merge";
import HoverIcon from "@/components/element/animations/ArrowIconEndContent";
import Link from "next/link";

interface CardContentProps {
  date: string;
  isDate: boolean;
  moreDetailsHref?: string;
  name: string;
  description: string;
  widthConter: string;
  heightConter: string;
  view: boolean;
}

export const CardContent: React.FC<CardContentProps> = ({
  date,
  isDate,
  moreDetailsHref,
  name,
  description,
  widthConter,
  heightConter,
  view,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const cardStyles = {
    cardBox: `flex flex-col gap-4 p-4 absolute left-1/2 -translate-x-1/2 bottom-[-160px] w-[${widthConter}] bg-[#ffffff] xs:h-[230px] sm:h-[${heightConter}] rounded-xl shadow-lg transition-transform duration-300 ease-out group-hover:translate-y-[-10px]`,

    cardList: `flex  gap-4 p-4 w-full bg-[#ffffff]  rounded-xl shadow-lg transition-transform duration-300 ease-out `,
  };

  return (
    <div className={twMerge(view ? cardStyles.cardBox : cardStyles.cardList)}>
      <div className="flex justify-start gap-5">
        {isDate && <InfoItem icon={<SlCalender />} text={date} />}
        <InfoItem icon={<CgProfile />} text={name} />
      </div>
      <h6 className="font-light text-wrap text-justify">{description}</h6>
      <div className="mb-5">
        {moreDetailsHref && (
          <Link href={moreDetailsHref}>
            <Button
              className={`data-[hover]:bg-transparent data-[hover]:text-secondary-500  ${
                isHovered ? "bg-gray-200" : ""
              }`}
              variant="light"
              size="md"
              endContent={<HoverIcon isHovered={isHovered} />}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              مشاهده ی بیشتر
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

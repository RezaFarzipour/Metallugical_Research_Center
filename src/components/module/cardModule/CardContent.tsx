"use client";

import { SlCalender } from "react-icons/sl";
import { InfoItem } from "./InfoItem";
import { CgProfile } from "react-icons/cg";
import { Button } from "@heroui/button";
import React from "react";
import { twMerge } from "tailwind-merge";
import HoverIcon from "@/components/element/animations/ArrowIconEndContent";
import Link from "next/link";
import clsx from "clsx";
import { RiPriceTag3Line, RiInformationLine } from "react-icons/ri";
import { BsFileEarmarkFont } from "react-icons/bs";

interface CardContentProps {
  id: string | number; // این خط اضافه شد
  date: string;
  isDate: boolean | undefined;
  isMoreDetails?: string;
  name: string;
  description: string;
  widthConter: string;
  heightConter: string;
  view: boolean;
  styleForAdmin: boolean;
}

export const CardContent: React.FC<CardContentProps> = ({
  date,
  isDate,
  id,
  isMoreDetails,
  name,
  description,
  widthConter,
  heightConter,
  view,
  styleForAdmin,
}) => {
  console.log('name',name);
  
  const [isHovered, setIsHovered] = React.useState(false);

  const cardStyles = {
    cardBox: clsx(
      "flex flex-col gap-2 p-4 absolute left-1/2 -translate-x-1/2 bottom-[-160px] bg-[#ffffff] rounded-xl shadow-lg transition-transform duration-300 ease-out group-hover:translate-y-[-10px]"
    ),
    cardList: clsx(
      "flex flex-col gap-4 p-4 w-full bg-[#ffffff] rounded-xl shadow-lg transition-transform duration-300 ease-out"
    ),
  };

  const MoreDetailsHref =
    isMoreDetails === "admin"
      ? `/admin/services/${id}/details`
      : `/services/${id}`;

  const MoreDetailsButton = MoreDetailsHref && (
    <div className="mt-auto absolute left-0 bottom-0">
      <Link href={MoreDetailsHref}>
        <Button
          className={`data-[hover]:bg-transparent data-[hover]:text-secondary-500 ${
            isHovered ? "bg-gray-200" : ""
          }`}
          variant="light"
          size="md"
          endContent={<HoverIcon isHovered={isHovered} />}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          مشاهده‌ی بیشتر
        </Button>
      </Link>
    </div>
  );

  return styleForAdmin && view ? (
    <div
      className={clsx(
        "bg-gray-50 p-4 rounded-lg shadow-lg flex flex-col [&>div]:text-secondary-700",
        cardStyles.cardBox
      )}
      style={{ width: widthConter, height: heightConter }}
    >
      <div className="flex items-center gap-3">
        <BsFileEarmarkFont className="text-xl " />
        <h3 className="text-lg font-bold text-gray-600">{name}</h3>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <RiPriceTag3Line className="text-xl" />
        <p className="text-base font-medium text-gray-600">
          قیمت: ۲۵۰,۰۰۰ تومان
        </p>
      </div>

      <div className="flex items-start gap-3 mt-2 flex-grow">
        <RiInformationLine className="text-xl mt-1" />
        <p className="text-sm text-gray-600 text-justify">{description}</p>
      </div>

      {MoreDetailsButton}
    </div>
  ) : (
    <div
      className={twMerge(
        view ? cardStyles.cardBox : cardStyles.cardList,
        "flex-col"
      )}
      style={view ? { width: widthConter, height: heightConter } : undefined}
    >
      <div className="flex justify-start gap-5">
        {isDate && <InfoItem icon={<SlCalender />} text={date} />}
        <InfoItem icon={<CgProfile />} text={name} />
      </div>

      <h6 className="font-light text-wrap text-justify flex-grow">
        {description}
      </h6>

      {MoreDetailsButton}
    </div>
  );
};

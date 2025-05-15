"use client";

import { Button } from "@heroui/button";
import React, { useState } from "react";
import HoverIcon from "@/components/element/animations/ArrowIconEndContent";
import Link from "next/link";
import { RiPriceTag3Line } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";
import { cn } from "@/utils/cn";
import { formatDateRangesToPersian2 } from "@/utils/formatter/formatDateRangesToPersian";
import { toPersianNumbersWithComma } from "@/utils/formatter/toPersianNumbers";
import { MdOutlineDescription, MdOutlineSubtitles } from "react-icons/md";
import truncateText from "@/utils/formatter/truncateText";

interface ReserveDate {
  id: number;
  reserved_from: string;
  reserved_to: string;
  service: number;
}

interface CardContentProps {
  id: string | number;
  reserve_date?: ReserveDate[];
  price?: string;
  isMoreDetails?: string;
  name: string;
  service_name?: string;
  description: string;
  widthConter: string;
  heightConter: string;
  view: boolean;
  styleForAdmin: boolean;
}

const InfoRow = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-3">
    {icon}
    {children}
  </div>
);

const CardContentBox: React.FC<{
  children: React.ReactNode;
  width: string;
  height: string;
  className: string;
}> = ({ children, width, height, className }) => (
  <div
    className={cn(className, "flex-col [&>div]:text-secondary-700")}
    style={{ width, height }}
  >
    {children}
  </div>
);

export const CardContent: React.FC<CardContentProps> = ({
  id,
  reserve_date,
  price,
  isMoreDetails,
  name,
  service_name,
  description,
  widthConter,
  heightConter,
  view,
  styleForAdmin,
  dateRange,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const MoreDetailsHref =
    isMoreDetails === "admin"
      ? `/admin/services/${id}/details`
      : `/services/${id}/details`;

  const cardStyles = {
    box: cn(
      "bg-gray-50 p-4 rounded-lg shadow-lg flex gap-1",
      view
        ? "absolute left-1/2 -translate-x-1/2 bottom-[-160px] group-hover:translate-y-[-10px] transition-transform duration-300 ease-out"
        : "w-full"
    ),
  };

  return (
    <CardContentBox
      width={view ? widthConter : "100%"}
      height={view ? heightConter : "auto"}
      className={cardStyles.box}
    >
      <InfoRow icon={<MdOutlineSubtitles className="text-xl" />}>
        <h3 className="text-lg font-bold text-gray-600">
          {service_name || name}
        </h3>
      </InfoRow>

      {price && (
        <InfoRow icon={<RiPriceTag3Line className="text-xl" />}>
          <p className="text-base  text-gray-600">
            {toPersianNumbersWithComma(price)}
          </p>
        </InfoRow>
      )}

      <InfoRow icon={<MdOutlineDescription className="text-xl mt-1" />}>
        <p className="text-sm text-gray-600 text-justify">
          {truncateText(description, 20)}
        </p>
      </InfoRow>

      {styleForAdmin && (
        <InfoRow icon={<IoCalendarOutline size={20} className="mt-1" />}>
          <p className="text-sm text-gray-600 text-justify pt-2">{dateRange}</p>
        </InfoRow>
      )}

      {reserve_date && reserve_date.length > 0 && (
        <InfoRow icon={<IoCalendarOutline size={20} className="mt-1" />}>
          <ul className="text-sm text-gray-600">
            {reserve_date.map((dateItem, index) => (
              <li key={index} className="pt-2">
                {formatDateRangesToPersian2(dateItem.reserved_from)} تا{" "}
                {formatDateRangesToPersian2(dateItem.reserved_to)}
              </li>
            ))}
          </ul>
        </InfoRow>
      )}

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
    </CardContentBox>
  );
};

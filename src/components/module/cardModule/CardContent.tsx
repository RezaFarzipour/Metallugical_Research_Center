"use client";

import { Button } from "@heroui/button";
import React from "react";
import HoverIcon from "@/components/element/animations/ArrowIconEndContent";
import { MdOutlineDescription, MdOutlineSubtitles } from "react-icons/md";
import { RiPriceTag3Line } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";
import { TiTags } from "react-icons/ti";
import { cn } from "@/utils/cn";
import truncateText from "@/utils/formatter/truncateText";
import { formatDateRangesToPersian2 } from "@/utils/formatter/formatDateRangesToPersian";
import { toPersianNumbersWithComma } from "@/utils/formatter/toPersianNumbers";
import { BlogType } from "@/types";
import { ServiceReserveDateType } from "@/types/serviceType";
import Link from "next/link";
import { CURRENCY } from "@/config/site";

interface CardContentProps extends Partial<BlogType> {
  service_name?: string;
  name?: string;
  description?: string;
  price?: string | number;
  reserve_date?: ServiceReserveDateType[];
  parsedTags?: string[];
  widthConter: string;
  heightConter: string;
  view: boolean;
  styleForAdmin: boolean;
  dateRange?: string;
  bottomOffset?: string;
  MoreDetailsHref: string;
  isHovered: boolean;
  setIsHovered: (hover: boolean) => void;
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
  style?: React.CSSProperties;
}> = ({ children, width, height, className, style }) => (
  <div
    className={cn(className, "flex-col [&>div]:text-secondary-700")}
    style={{
      ...style,
      ...(width ? { width } : {}),
      ...(height ? { height } : {}),
    }}
  >
    {children}
  </div>
);

export const CardContent: React.FC<CardContentProps> = ({
  service_name,
  name,
  description,
  price,
  parsedTags,
  reserve_date,
  widthConter,
  heightConter,
  view,
  styleForAdmin,
  dateRange,
  bottomOffset,
  MoreDetailsHref,
  isHovered,
  setIsHovered,
}) => {
  const cardStyles = {
    box: cn(
      "bg-gray-50 p-4 rounded-lg shadow-lg flex gap-2",
      view
        ? "absolute left-1/2 -translate-x-1/2 group-hover:translate-y-[-10px] transition-all duration-300 ease-out"
        : "w-full"
    ),
    style: view ? { bottom: `-${bottomOffset || "80"}px` } : {},
  };

  return (
    <CardContentBox
      width={view ? widthConter : "100%"}
      height={view ? heightConter : "auto"}
      className={cardStyles.box}
      style={cardStyles.style}
    >
      <InfoRow icon={<MdOutlineSubtitles className="text-xl" />}>
        <h3 className="text-lg font-bold text-gray-600">
          {service_name || name || "بدون عنوان"}
        </h3>
      </InfoRow>

      {parsedTags && parsedTags.length > 0 && (
        <InfoRow icon={<TiTags className="text-xl" />}>
          {parsedTags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="bg-blue-50 text-secondary-800 text-xs font-medium px-2.5 py-0.5 rounded-md"
            >
              {tag}
            </span>
          ))}
          {parsedTags.length > 2 && (
            <span className="text-xs font-medium py-0.5">...</span>
          )}
        </InfoRow>
      )}

      {price && (
        <InfoRow icon={<RiPriceTag3Line className="text-xl" />}>
          <p className="text-base text-gray-600">
            {toPersianNumbersWithComma(price)}{" "}
            {CURRENCY === "rial" ? "ریال" : "تومان"}
          </p>
        </InfoRow>
      )}

      {description && (
        <InfoRow icon={<MdOutlineDescription className="text-xl mt-1" />}>
          <p className="text-sm text-gray-600 text-justify">
            {truncateText(description, 20)}
          </p>
        </InfoRow>
      )}

      {styleForAdmin && dateRange && (
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

      <div className="mt-auto absolute left-0 -bottom-2 md:bottom-0 hidden md:block">
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

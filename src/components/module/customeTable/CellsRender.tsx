"use client";
import React from "react";
import { Chip, Tooltip } from "@heroui/react";
import { statusColorMap } from "@/constants/tableData";
import Image from "next/image";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";
import truncateText from "@/utils/formatter/truncateText";
import { BlogType, ReportData, TableBase, UserType } from "@/types";
import { ServerServiceType } from "@/types/serviceType";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { showToast } from "@/store/useToastSlice";

type TableData = ServerServiceType | BlogType | UserType | ReportData;

interface CellRendererProps<T extends TableData> {
  data: T;
  columnKey: keyof TableBase | "actions";
  firstActionContent?: string;
  firstActionIcon?: React.FC;
  secondActionContent?: string;
  secondActionIcon?: React.FC;
  firstActionClickHandler?: (id: number | string, phone_number: string) => void;
  secondActionClickHandler?: (
    id: number | string,
    phone_number: string,
    name: string
  ) => void;
  image?: boolean;
}

export const CellRenderer = <T extends TableData>({
  data,
  columnKey,
  firstActionContent,
  firstActionIcon,
  secondActionContent,
  secondActionIcon,
  firstActionClickHandler,
  secondActionClickHandler,
  image,
}: CellRendererProps<T>): React.ReactElement => {
  const cellValue = (data as Record<string, any>)[columnKey];

  switch (columnKey) {
    case "name":
      return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          {image && (
            <div className="w-10 h-10 relative">
              <Image
                src={(data as any).image || `/images/user.png`}
                alt={(data as any).name}
                fill
                className="rounded-md object-cover"
              />
            </div>
          )}
          <span className="whitespace-normal sm:whitespace-nowrap font-medium">
            {(data as any).name}
          </span>
        </div>
      );

    case "status":
      return (
        <Chip
          className="capitalize"
          color={
            statusColorMap[(data as any).status as keyof typeof statusColorMap]
          }
          size="sm"
          variant="flat"
        >
          {cellValue}
        </Chip>
      );

    case "payment_status":
      return (
        <Chip
          className="capitalize"
          color={
            statusColorMap[
              (data as any).payment_status as keyof typeof statusColorMap
            ]
          }
          size="sm"
          variant="flat"
        >
          {cellValue}
        </Chip>
      );

    case "role":
      return (
        <Chip
          className="capitalize"
          color={
            statusColorMap[(data as any).role as keyof typeof statusColorMap]
          }
          size="sm"
          variant="flat"
        >
          {cellValue}
        </Chip>
      );

    case "description":
      return (
        <p className="max-w-[150px] sm:max-w-none truncate whitespace-normal">
          {truncateText(String(cellValue ?? ""), 40)}
        </p>
      );

    case "admin_description":
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

      return isMobile ? (
        <Popover placement="bottom">
          <PopoverTrigger>
            <Chip
              size="md"
              className="cursor-pointer max-w-[150px] sm:max-w-none truncate whitespace-normal"
              variant="shadow"
            >
              {cellValue
                ? truncateText(String(cellValue), 40)
                : "توضیحاتی ثبت نشده"}
            </Chip>
          </PopoverTrigger>
          <PopoverContent>
            <div className="max-w-xs whitespace-pre-wrap break-words">
              {cellValue || "توضیحاتی ثبت نشده"}
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Tooltip
          content={
            <div className="max-w-2xl whitespace-pre-wrap break-words">
              {cellValue || "توضیحاتی ثبت نشده"}
            </div>
          }
        >
          <Chip
            size="md"
            className="cursor-pointer max-w-[150px] sm:max-w-none truncate whitespace-normal"
            variant="shadow"
          >
            {cellValue
              ? truncateText(String(cellValue), 40)
              : "توضیحاتی ثبت نشده"}
          </Chip>
        </Tooltip>
      );

    case "tags":
      let tagsArray: string[] = [];
      try {
        if (
          Array.isArray((data as any).tags) &&
          typeof (data as any).tags[0] === "string"
        ) {
          tagsArray = JSON.parse((data as any).tags[0]);
        }
      } catch (error: any) {
        const errorMessage = error?.message || "خطا در پردازش تگ‌ها";
        showToast(errorMessage, "error");
      }

      return (
        <div className="flex gap-1 flex-wrap max-w-[200px] sm:max-w-none">
          {tagsArray.map((tag, index) => (
            <Chip key={index} size="sm" variant="flat" color="primary">
              {tag}
            </Chip>
          ))}
        </div>
      );

    case "actions":
      return (
        <div className="flex justify-center gap-2">
          <EditBtn
            data={data}
            firstActionContent={firstActionContent ?? "ویرایش"}
            firstActionIcon={firstActionIcon}
            firstActionClickHandler={firstActionClickHandler ?? (() => {})}
          />
          {secondActionClickHandler && (
            <DeleteBtn
              data={
                data as {
                  id: string | number;
                  name: string;
                  phone_number?: string;
                }
              }
              secondActionContent={secondActionContent ?? "حذف"}
              secondActionIcon={secondActionIcon}
              secondActionClickHandler={secondActionClickHandler}
            />
          )}
        </div>
      );

    default:
      return (
        <span className="whitespace-normal sm:whitespace-nowrap truncate max-w-[150px] sm:max-w-none">
          {cellValue}
        </span>
      );
  }
};

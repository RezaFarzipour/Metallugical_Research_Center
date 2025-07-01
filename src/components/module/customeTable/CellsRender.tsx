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
    phone_number: string
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
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {image && (
              <Image
                src={(data as any).image || `/images/user.png`}
                alt={(data as any).name}
                width={50}
                height={50}
              />
            )}
            <span className="text-nowrap">{(data as any).name}</span>
          </div>
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
      return <p>{truncateText(String(cellValue ?? ""), 40)}</p>;

    case "admin_description":
      return (
        <Tooltip
          content={
            <div className="max-w-2xl whitespace-pre-wrap break-words">
              {cellValue || "توضیحاتی ثبت نشده"}
            </div>
          }
        >
          <Chip size="md" className="cursor-pointer" variant="shadow">
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
      } catch (err) {
        console.error("Error parsing tags:", err);
      }

      return (
        <div className="flex gap-1 flex-wrap">
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
      return <span className="text-nowrap">{cellValue}</span>;
  }
};

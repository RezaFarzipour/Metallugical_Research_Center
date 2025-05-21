"use client";
import React from "react";
import { Chip, Tooltip } from "@heroui/react";
import { statusColorMap } from "@/constants/tableData";
import Image from "next/image";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";
import truncateText from "@/utils/formatter/truncateText";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  amount: string;
  date: string;
  title: string;
  description: string;
  admin_description: string;
  image: string;
  author: string;
  articleTitle: string;
  dateRange: string;
  payment_status?: string;
}

interface CellRendererProps {
  data: User;
  columnKey: keyof User | "actions";
  firstActionContent: string;
  firstActionIcon?: React.FC;
  secondActionContent: string;
  secondActionIcon?: React.FC;
  firstActionClickHandler: (id: number | string, phone_number: string) => void;
  secondActionClickHandler: (id: number | string, phone_number: string) => void;
  image?: boolean;
}

export const CellRenderer: React.FC<CellRendererProps> = ({
  data,
  columnKey,
  firstActionContent,
  firstActionIcon,
  secondActionContent,
  secondActionIcon,
  firstActionClickHandler,
  secondActionClickHandler,
  image,
}) => {
  const cellValue = data[columnKey as keyof User];

  switch (columnKey) {
    case "name":
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {image && (
              <Image
                src={data.image || `/images/user.png`}
                alt={data.name}
                width={50}
                height={50}
              />
            )}
            <span className="text-nowrap">{data.name}</span>
          </div>
        </div>
      );

    case "status":
      return (
        <Chip
          className="capitalize"
          color={statusColorMap[data.status as keyof typeof statusColorMap]}
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
            statusColorMap[data.payment_status as keyof typeof statusColorMap]
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
          color={statusColorMap[data.role as keyof typeof statusColorMap]}
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
          content={cellValue || "توضیحاتی ثبت نشده"}
          className="max-w-96 max-h-auto whitespace-pre-wrap break-words "
        >
          <Chip size="md" className="cursor-pointer" variant="shadow">
            {cellValue
              ? truncateText(String(cellValue), 40)
              : "توضیحاتی ثبت نشده"}
          </Chip>
        </Tooltip>
      );

    case "actions":
      return (
        <div className="flex justify-center gap-2">
          <EditBtn
            data={data}
            firstActionContent={firstActionContent}
            firstActionIcon={firstActionIcon}
            firstActionClickHandler={firstActionClickHandler}
          />
          <DeleteBtn
            data={data}
            secondActionContent={secondActionContent}
            secondActionIcon={secondActionIcon}
            secondActionClickHandler={secondActionClickHandler}
          />
        </div>
      );
    default:
      return <span className="text-nowrap">{cellValue}</span>;
  }
};

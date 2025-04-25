"use client";
import React from "react";
import { Chip, Tooltip } from "@heroui/react";
import { statusColorMap } from "@/constants/tableData";
import Image from "next/image";

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
  image: string;
  author: string;
  articleTitle: string;
}

interface CellRendererProps {
  data: User;
  columnKey: keyof User | "actions";
  firstActionContent: string;
  firstActionIcon?: React.FC;
  secondActionContent: string;
  secondActionIcon?: React.FC;
  firstActionClickHandler: (id: number | string) => void;
  secondActionClickHandler: (id: number | string) => void;
  image?: boolean;
}

export const CellRenderer: React.FC<CellRendererProps> = ({
  data,
  columnKey,
  firstActionContent,
  firstActionIcon: FirstIcon,
  secondActionContent,
  secondActionIcon: SecondIcon,
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
            <span>{data.name}</span>
          </div>
        </div>
      );
    case "title":
      return (
        <div className="flex items-center gap-2">
          {image && (
            <Image src={data.image} alt={data.author} width={32} height={32} />
          )}
          <span>{data.author}</span>
        </div>
      );
    case "role":
      return (
        <div className="flex flex-col">
          <p className="text-sm font-bold capitalize">{cellValue}</p>
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
    case "actions":
      return (
        <div className="flex justify-center gap-2">
          <Tooltip content={firstActionContent}>
            <span
              className="text-lg text-gray-400 cursor-pointer hover:opacity-50"
              onClick={() => firstActionClickHandler(data.id)}
            >
              {FirstIcon ? <FirstIcon /> : firstActionContent}
            </span>
          </Tooltip>

          <Tooltip content={secondActionContent}>
            <span
              className="text-lg text-red-500 cursor-pointer hover:opacity-50"
              onClick={() => secondActionClickHandler(data.id)}
            >
              {SecondIcon ? <SecondIcon /> : secondActionContent}
            </span>
          </Tooltip>
        </div>
      );
    default:
      return <>{cellValue}</>;
  }
};

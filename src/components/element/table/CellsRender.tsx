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
  user: User;
  columnKey: keyof User | "actions";
  firstActionContent: string;
  firstActionIcon?: React.FC;
  secondActionContent: string;
  secondActionIcon?: React.FC;
  image?: boolean;
}

export const CellRenderer: React.FC<CellRendererProps> = ({
  user,
  columnKey,
  firstActionContent,
  firstActionIcon: FirstIcon,
  secondActionContent,
  secondActionIcon: SecondIcon,
  image,
}) => {
  const cellValue = user[columnKey as keyof User];

  switch (columnKey) {
    case "name":
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {image && (
              <Image src={user.image} alt={user.name} width={32} height={32} />
            )}
            <span>{user.name}</span>
          </div>
          <span className="text-sm text-gray-500">{user.email}</span>
        </div>
      );
    case "title":
      return (
        <div className="flex items-center gap-2">
          {image && (
            <Image src={user.image} alt={user.author} width={32} height={32} />
          )}
          <span>{user.author}</span>
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
          color={statusColorMap[user.status as keyof typeof statusColorMap]}
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
            <span className="text-lg text-gray-400 cursor-pointer hover:opacity-50">
              {FirstIcon ? <FirstIcon /> : firstActionContent}
            </span>
          </Tooltip>
          <Tooltip content={secondActionContent}>
            <span className="text-lg text-red-500 cursor-pointer hover:opacity-50">
              {SecondIcon ? <SecondIcon /> : secondActionContent}
            </span>
          </Tooltip>
        </div>
      );
    default:
      return <>{cellValue}</>;
  }
};

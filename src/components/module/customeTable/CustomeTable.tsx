"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { CellRenderer } from "./CellsRender";
import { ServerServiceType } from "@/types/serviceType";
import { BlogType, ReportData, TableBase, UserType } from "@/types";

type TableData = ServerServiceType | BlogType | UserType | ReportData;

interface Column {
  name: string;
  uid: string;
}
interface CustomeTableProps<T extends TableData> {
  headerColumns: Column[];
  sortedItems: T[];
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

export default function CustomeTable<T extends TableData>({
  headerColumns,
  sortedItems,
  firstActionContent,
  firstActionIcon,
  secondActionContent,
  secondActionIcon,
  firstActionClickHandler,
  secondActionClickHandler,
  image,
}: CustomeTableProps<T>) {
  return (
    <Table
      isHeaderSticky
      aria-label="جدول کاربران با قابلیت فیلتر، مرتب‌سازی و صفحه‌بندی"
      bottomContentPlacement="outside"
      classNames={{ wrapper: "max-h-[382px]" }}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                <CellRenderer
                  data={item}
                  columnKey={columnKey as keyof TableBase | "actions"}
                  firstActionContent={firstActionContent}
                  firstActionIcon={firstActionIcon}
                  secondActionContent={secondActionContent}
                  secondActionIcon={secondActionIcon}
                  firstActionClickHandler={firstActionClickHandler}
                  secondActionClickHandler={secondActionClickHandler}
                  image={image}
                />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

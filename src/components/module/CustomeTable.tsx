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
import { CellRenderer } from "../element/CellsRender";
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
interface Column {
  name: string;
  uid: string;
  sortable?: boolean;
}
interface CustomeTableProps {
  headerColumns: Column[];
  sortedItems: T[];
  firstActionContent: string;
  firstActionIcon?: React.FC;
  secondActionContent: string;
  secondActionIcon?: React.FC;
  firstActionClickHandler: () => void;
  secondActionClickHandler: () => void;
  image?: boolean;
}

export default function CustomeTable({
  headerColumns,
  sortedItems,
  firstActionContent,
  firstActionIcon,
  secondActionContent,
  secondActionIcon,
  firstActionClickHandler,
  secondActionClickHandler,
  image,
}: CustomeTableProps) {
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
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody  items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                <CellRenderer
                  user={item}
                  columnKey={columnKey as keyof User | "actions"}
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

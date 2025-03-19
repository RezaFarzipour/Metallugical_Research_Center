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

interface CustomeTableProps {
  headerColumns: any[];
  sortedItems: any[];
  firstActionContent: string;
  firstActionIcon?: React.FC;
  secondActionContent: string;
  secondActionIcon?: React.FC;
  image?: boolean;
}

export default function CustomeTable({
  headerColumns,
  sortedItems,
  firstActionContent,
  firstActionIcon,
  secondActionContent,
  secondActionIcon,
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
      <TableBody emptyContent="کاربری یافت نشد" items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                <CellRenderer
                  user={item}
                  columnKey={columnKey}
                  firstActionContent={firstActionContent}
                  firstActionIcon={firstActionIcon}
                  secondActionContent={secondActionContent}
                  secondActionIcon={secondActionIcon}
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

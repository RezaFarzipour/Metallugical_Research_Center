"use client";
import React, { useCallback } from "react";
import { useTableStore } from "@/store/useTableSlice";
import { Button } from "@heroui/button";
import { FaPlus } from "react-icons/fa";
import ViewToggle from "./ViewToggle";
import Link from "next/link";
import { toPersianNumbers } from "@/utils/formatter/toPersianNumbers";
import SearchField from "@/components/element/SearchField";
import TableFilters from "./TableFilters";
import { cn } from "@/utils/cn";

interface TopContentProps {
  columns: {
    name: string;
    uid: string;
    sortable?: boolean;
  }[];
  usersLength: number;
  quantity: string;
  rolesDropDown?: boolean;
  stausDropDown?: boolean;
  paymentStautsDropDown?: boolean;
  columnsDropDownBtn?: boolean;
  addBtn?: React.ReactNode;
  viewContent?: boolean;
  viewContentSmSize?: boolean;
  btnClickHandler?: () => void;
}

export default function TopContent({
  columns,
  usersLength,
  quantity,
  rolesDropDown,
  stausDropDown,
  paymentStautsDropDown,
  addBtn,
  columnsDropDownBtn,
  viewContent,
  viewContentSmSize,
  btnClickHandler,
}: TopContentProps) {
  const { view, setPage, setRowsPerPage, setView } = useTableStore();

  // تغییر سایز صفحه
  const handleRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [setRowsPerPage, setPage]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-3">
        <div className={cn(viewContentSmSize ? "hidden lg:block" : "hidden")}>
          {viewContent && setView && (
            <ViewToggle view={view} setView={setView} />
          )}
        </div>
        <SearchField />

        <div className="flex gap-3">
          <TableFilters
            rolesDropDown={rolesDropDown}
            stausDropDown={stausDropDown}
            paymentStautsDropDown={paymentStautsDropDown}
            columnsDropDownBtn={columnsDropDownBtn}
            columns={columns}
          />

          {addBtn && (
            <Button
              onPress={btnClickHandler}
              className="bg-secondary-500 text-white"
              endContent={<FaPlus />}
            >
              افزودن
            </Button>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          تعداد {quantity}: {toPersianNumbers(usersLength)}
        </span>
        <label className="flex items-center text-default-400 text-small">
          تعداد ردیف‌ها:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={handleRowsPerPageChange}
          >
            <option value="5">۵</option>
            <option value="10">۱۰</option>
            <option value="15">۱۵</option>
          </select>
        </label>
      </div>
    </div>
  );
}

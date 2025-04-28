"use client";
import React, { useCallback } from "react";
import RowsPerPageSelector from "./RowsPerPageSelector";
import { useTableStore } from "@/store/useTableSlice";
import { Button } from "@heroui/button";
import { FaPlus } from "react-icons/fa";
import { FilterSection } from "./FilterSection";
import ViewToggle from "./ViewToggle";
import { IoIosSearch } from "react-icons/io";
import { Input } from "@heroui/react";
import Link from "next/link";
import { toPersianNumbers } from "@/utils/formatter/toPersianNumbers";

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
  columnsDropDownBtn?: boolean;
  addBtn?: React.ReactNode;
  addBtnhref?: string;
  viewContent?: boolean;
  viewContentSmSize?: boolean;
}

export default function TopContent({
  columns,
  usersLength,
  quantity,
  rolesDropDown,
  stausDropDown,
  addBtn,
  addBtnhref,
  columnsDropDownBtn,
  viewContent,
  viewContentSmSize,
}: TopContentProps) {
  const {
    filterValue,
    visibleColumns,
    statusFilter,
    rolesFilter,
    view,
    setVisibleColumns,
    setStatusFilter,
    setRolesFilter,
    setPage,
    setFilterValue,
    setRowsPerPage,
    setView,
  } = useTableStore();

  const handleSearchChange = useCallback(
    (value: string) => {
      setFilterValue(value);
      setPage(1);
    },
    [setFilterValue, setPage]
  );

  const handleClearSearch = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, [setFilterValue, setPage]);

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
        <div className={`${viewContentSmSize ? "hidden md:block" : ""}`}>
          {viewContent && setView && (
            <ViewToggle view={view} setView={setView} />
          )}
        </div>
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="جستجو کنید"
          startContent={<IoIosSearch />}
          value={filterValue}
          onClear={handleClearSearch}
          onValueChange={handleSearchChange}
        />

        <div className="flex gap-3">
          <FilterSection
            columns={columns}
            rolesDropDown={rolesDropDown}
            stausDropDown={stausDropDown}
            columnsDropDownBtn={columnsDropDownBtn}
            rolesFilter={rolesFilter}
            statusFilter={statusFilter}
            visibleColumns={visibleColumns}
            setRolesFilter={setRolesFilter}
            setStatusFilter={setStatusFilter}
            setVisibleColumns={setVisibleColumns}
          />
          {addBtn && (
            <Link href={addBtnhref}>
              <Button
                className="bg-secondary-500 text-white"
                endContent={<FaPlus />}
              >
                افزودن
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          تعداد {quantity}: {toPersianNumbers(usersLength)}
        </span>
        <RowsPerPageSelector onRowsPerPageChange={handleRowsPerPageChange} />
      </div>
    </div>
  );
}

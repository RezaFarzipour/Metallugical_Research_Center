"use client";
import React, { useCallback } from "react";
import SearcBar from "../../SearcBar";
import RowsPerPageSelector from "./RowsPerPageSelector";
import { useTableStore } from "@/store/useTableSlice";
import { Button } from "@heroui/button";
import { FaPlus } from "react-icons/fa";
import { FilterSection } from "./FilterSection";
import ViewToggle from "./ViewToggle";

interface TopContentProps {
  usersLength: number;
  quantity: string;
  roles?: boolean;
  dropDownBtn?: boolean;
  btn?: React.ReactNode;
  product?: boolean;
  viewContent?: boolean;
}

export default function TopContent({
  usersLength,
  quantity,
  roles,
  btn,
  dropDownBtn,
  product,
  viewContent,
}: TopContentProps) {
  const {
    filterValue,
    visibleColumns,
    statusFilter,
    rolesFilter,
    productStatusFilter,
    view,
    setVisibleColumns,
    setStatusFilter,
    setRolesFilter,
    setProductStatusFilter,
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
        {viewContent && setView && <ViewToggle view={view} setView={setView} />}
        <SearcBar
          filterValue={filterValue}
          onClear={handleClearSearch}
          onSearchChange={handleSearchChange}
        />
        <div className="flex gap-3">
          <FilterSection
            roles={roles}
            product={product}
            dropDownBtn={dropDownBtn}
            rolesFilter={rolesFilter}
            statusFilter={statusFilter}
            productStatusFilter={productStatusFilter}
            visibleColumns={visibleColumns}
            setRolesFilter={setRolesFilter}
            setStatusFilter={setStatusFilter}
            setProductStatusFilter={setProductStatusFilter}
            setVisibleColumns={setVisibleColumns}
          />
          {btn && (
            <Button
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
          تعداد {quantity}: {usersLength}
        </span>
        <RowsPerPageSelector onRowsPerPageChange={handleRowsPerPageChange} />
      </div>
    </div>
  );
}

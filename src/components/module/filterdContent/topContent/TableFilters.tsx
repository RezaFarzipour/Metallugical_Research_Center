"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DropdownElement } from "@/components/element/DropdownElement";
import { rolesOptions, statusOptions } from "@/constants/tableData";
import { useTableStore } from "@/store/useTableSlice";

interface TableFiltersProps {
  rolesDropDown?: boolean;
  stausDropDown?: boolean;
  columnsDropDownBtn?: boolean;
  columns: { name: string; uid: string }[];
}

export default function TableFilters({
  rolesDropDown,
  stausDropDown,
  columnsDropDownBtn,
  columns,
}: TableFiltersProps) {
  const {
    visibleColumns,
    setVisibleColumns,
    rolesFilter,
    statusFilter,
    setRolesFilter,
    setStatusFilter,
  } = useTableStore();

  const searchParams = useSearchParams();
  const router = useRouter();

  // مقداردهی اولیه فیلترها از URL
  useEffect(() => {
    const roles = searchParams.get("roles");
    const status = searchParams.get("status");

    if (roles) {
      setRolesFilter(new Set(roles.split(",")));
    }

    if (status) {
      setStatusFilter(new Set(status.split(",")));
    }
  }, []);

  // آپدیت query string
  const updateQueryParam = (key: string, values: Set<string>) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.size > 0) {
      params.set(key, Array.from(values).join(","));
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  const handleRoleChange = (keys: Set<string>) => {
    setRolesFilter(keys);
    updateQueryParam("roles", keys);
  };

  const handleStatusChange = (keys: Set<string>) => {
    setStatusFilter(keys);
    updateQueryParam("status", keys);
  };

  return (
    <div className="flex gap-3">
      {rolesDropDown && (
        <DropdownElement
          label="نقش"
          options={rolesOptions}
          selectedKeys={rolesFilter}
          onSelectionChange={handleRoleChange}
        />
      )}
      {stausDropDown && (
        <DropdownElement
          label="وضعیت‌ها"
          options={statusOptions}
          selectedKeys={statusFilter}
          onSelectionChange={handleStatusChange}
        />
      )}
      {columnsDropDownBtn && (
        <DropdownElement
          label="ستون‌ها"
          options={columns}
          selectedKeys={visibleColumns}
          onSelectionChange={setVisibleColumns}
        />
      )}
    </div>
  );
}

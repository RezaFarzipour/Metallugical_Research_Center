"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DropdownElement } from "@/components/element/DropdownElement";
import {
  rolesOptions,
  statusOptions,
  statusOptionsPayment,
} from "@/constants/tableData";
import { useTableStore } from "@/store/useTableSlice";

// فرض بر تعریف نوع SharedSelection
type SharedSelection =
  | string
  | Set<string>
  | { anchorKey?: string; currentKey?: string };

interface TableFiltersProps {
  rolesDropDown?: boolean;
  stausDropDown?: boolean;
  paymentStautsDropDown?: boolean;
  columnsDropDownBtn?: boolean;
  columns: { name: string; uid: string }[];
}

export default function TableFilters({
  rolesDropDown,
  stausDropDown,
  paymentStautsDropDown,
  columnsDropDownBtn,
  columns,
}: TableFiltersProps) {
  const {
    visibleColumns,
    setVisibleColumns,
    rolesFilter,
    statusFilter,
    peymentStatusFilter,
    setRolesFilter,
    setStatusFilter,
    setPeymentStatusFilter,
  } = useTableStore();

  const searchParams = useSearchParams();
  const router = useRouter();

  // مقداردهی اولیه فیلترها از URL
  useEffect(() => {
    const roles = searchParams.get("roles");
    const status = searchParams.get("status");
    const payment_status = searchParams.get("payment_status");

    if (roles) {
      setRolesFilter(new Set(roles.split(",")));
    }

    if (status) {
      setStatusFilter(new Set(status.split(",")));
    }
    if (payment_status) {
      setPeymentStatusFilter(new Set(payment_status.split(",")));
    }
  }, [searchParams, setRolesFilter, setStatusFilter, setPeymentStatusFilter]);

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

  // تبدیل SharedSelection به Set<string>
  const convertToSet = (keys: SharedSelection): Set<string> => {
    if (typeof keys === "string") {
      return new Set([keys]);
    }
    if (keys instanceof Set) {
      return keys;
    }
    // مدیریت شیء { anchorKey, currentKey }
    return new Set(keys.currentKey ? [keys.currentKey] : []);
  };

  const handleRoleChange = (keys: SharedSelection) => {
    const newKeys = convertToSet(keys);
    setRolesFilter(newKeys);
    updateQueryParam("roles", newKeys);
  };

  const handleStatusChange = (keys: SharedSelection) => {
    const newKeys = convertToSet(keys);
    setStatusFilter(newKeys);
    updateQueryParam("status", newKeys);
  };

  const handlePaymentStatusChange = (keys: SharedSelection) => {
    const newKeys = convertToSet(keys);
    setPeymentStatusFilter(newKeys);
    updateQueryParam("payment_status", newKeys);
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
      {paymentStautsDropDown && (
        <DropdownElement
          label="وضعیت پرداخت‌ها"
          options={statusOptionsPayment}
          selectedKeys={peymentStatusFilter}
          onSelectionChange={handlePaymentStatusChange}
        />
      )}

      {columnsDropDownBtn && (
        <DropdownElement
          label="ستون‌ها"
          options={columns}
          selectedKeys={visibleColumns}
          onSelectionChange={(keys: SharedSelection) =>
            setVisibleColumns(convertToSet(keys))
          }
        />
      )}
    </div>
  );
}

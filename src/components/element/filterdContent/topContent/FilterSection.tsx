import {
  productProgresOptions,
  rolesOptions,
  statusOptions,
} from "@/constants/tableData";
import React from "react";
import { DropdownElement } from "../../DropdownElement";

interface FilterSectionProps {
  columns: {
    name: string;
    uid: string;
    sortable?: boolean;
  }[];
  roles?: boolean;
  product?: boolean;
  dropDownBtn?: boolean;
  rolesFilter: Set<string>;
  statusFilter: Set<string>;
  productStatusFilter: Set<string>;
  visibleColumns: Set<string>;
  setRolesFilter: (keys: Set<string>) => void;
  setStatusFilter: (keys: Set<string>) => void;
  setProductStatusFilter: (keys: Set<string>) => void;
  setVisibleColumns: (keys: Set<string>) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  columns,
  roles,
  product,
  dropDownBtn,
  rolesFilter,
  statusFilter,
  productStatusFilter,
  visibleColumns,
  setRolesFilter,
  setStatusFilter,
  setProductStatusFilter,
  setVisibleColumns,
}) => {
  const filterOptions = roles
    ? rolesOptions
    : product
    ? productProgresOptions
    : statusOptions;

  const selectedFilter = roles
    ? rolesFilter
    : product
    ? productStatusFilter
    : statusFilter;

  const setFilter = roles
    ? setRolesFilter
    : product
    ? setProductStatusFilter
    : setStatusFilter;

  return (
    <div className="flex gap-3">
      <DropdownElement
        label={roles ? "نقش" : "وضعیت‌ها"}
        options={filterOptions}
        selectedKeys={selectedFilter}
        onSelectionChange={setFilter}
      />
      {dropDownBtn && (
        <DropdownElement
          label="ستون‌ها"
          options={columns}
          selectedKeys={visibleColumns}
          onSelectionChange={setVisibleColumns}
        />
      )}
    </div>
  );
};

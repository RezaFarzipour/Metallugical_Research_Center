import { DropdownElement } from "@/components/element/DropdownElement";
import { rolesOptions, statusOptions } from "@/constants/tableData";
import React from "react";

interface FilterSectionProps {
  columns: {
    name: string;
    uid: string;
    sortable?: boolean;
  }[];
  rolesDropDown?: boolean;
  stausDropDown?: boolean;
  product?: boolean;
  columnsDropDownBtn?: boolean;
  rolesFilter: Set<string>;
  statusFilter: Set<string>;
  visibleColumns: Set<string>;
  setRolesFilter: (keys: Set<string>) => void;
  setStatusFilter: (keys: Set<string>) => void;
  setVisibleColumns: (keys: Set<string>) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  columns,
  rolesDropDown = false,
  stausDropDown = false,
  columnsDropDownBtn = false,
  rolesFilter,
  statusFilter,
  visibleColumns,
  setRolesFilter,
  setStatusFilter,
  setVisibleColumns,
}) => {
  let label: string | null = null;
  let options: { name: string; uid: string }[] = [];
  let selectedKeys: Set<string> = new Set();
  let onSelectionChange: ((keys: Set<string>) => void) | undefined;

  if (rolesDropDown) {
    label = "نقش";
    options = rolesOptions;
    selectedKeys = rolesFilter;
    onSelectionChange = setRolesFilter;
  } else if (stausDropDown) {
    label = "وضعیت‌ها";
    options = statusOptions;
    selectedKeys = statusFilter;
    onSelectionChange = setStatusFilter;
  }

  return (
    <div className="flex gap-3">
      {label && onSelectionChange && (
        <DropdownElement
          label={label}
          options={options}
          selectedKeys={selectedKeys}
          onSelectionChange={onSelectionChange}
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
};

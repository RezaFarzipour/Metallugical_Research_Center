"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import {
  columns,
  users,
  usersINITIAL_VISIBLE_COLUMNS,
} from "@/constants/tableData";
import React, { useMemo } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TbEyeDiscount } from "react-icons/tb";
import { useTableStore } from "@/store/useTableSlice";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/element/table/CustomeTable";

const UsersPage: React.FC = () => {
  const { visibleColumns } = useTableStore();
  const { sortedItems } = useFilteredContainer(users);

  // محاسبه ستون‌های هدر
  const headerColumns = useMemo(() => {
    return visibleColumns.size === columns.length
      ? columns
      : columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);
  return (
    <div className="grid grid-cols-1">
      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards mainTitle="کاربران" />

        <FilteredContainer
          users={users}
          INITIAL_VISIBLE_COLUMNS={usersINITIAL_VISIBLE_COLUMNS}
          quantity="کاربران"
          viewContent={false}
          viewContentSmSize={false}
          topContents={true}
          bottomContents={true}
          btn={true}
          dropDownBtn={true}
          roles={true}
          product={false}
          image={false}
        >
          <CustomeTable
            headerColumns={headerColumns}
            sortedItems={sortedItems}
            firstActionContent="جزئیات"
            firstActionIcon={TbEyeDiscount}
            secondActionContent="حذف"
            secondActionIcon={MdDeleteOutline}
            image={true}
          />
        </FilteredContainer>
      </div>
    </div>
  );
};

export default UsersPage;

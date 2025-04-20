"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import {
  columns,
  usersOrders,
  usersOrdersINITIAL_VISIBLE_COLUMNS,
} from "@/constants/tableData";

import React, { useMemo } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useTableStore } from "@/store/useTableSlice";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/CustomeTable";

const Reportspage: React.FC = () => {
  const { visibleColumns } = useTableStore();
  const { sortedItems } = useFilteredContainer(usersOrders);

  // محاسبه ستون‌های هدر
  const headerColumns = useMemo(() => {
    return visibleColumns.size === columns.length
      ? columns
      : columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);
  return (
    <div className="grid grid-cols-1">
      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards mainTitle="گزارش ها" />

        <FilteredContainer
          users={usersOrders}
          columns={columns}
          INITIAL_VISIBLE_COLUMNS={usersOrdersINITIAL_VISIBLE_COLUMNS}
          quantity="گزارش ها"
          viewContent={false}
          viewContentSmSize={false}
          topContents={true}
          bottomContents={true}
          btn={false}
          dropDownBtn={true}
          roles={false}
          product={false}
          image={false}
        >
          <CustomeTable
            headerColumns={headerColumns}
            sortedItems={sortedItems}
            firstActionContent="تایید"
            firstActionIcon={AiOutlineCheck}
            secondActionContent="لغو"
            secondActionIcon={AiOutlineClose}
            image={true}
          />
        </FilteredContainer>
      </div>
    </div>
  );
};

export default Reportspage;

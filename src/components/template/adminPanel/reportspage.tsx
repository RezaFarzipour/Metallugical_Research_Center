"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import {
  columns,
  Usercolumns,
  usersOrders,
  usersOrdersINITIAL_VISIBLE_COLUMNS,
} from "@/constants/tableData";

import React, { useMemo } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useTableStore } from "@/store/useTableSlice";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";

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
      <div className=" p-4 md:p-6">
        <TitleStructureDashboards mainTitle="گزارش ها" />

        <FilteredContainer
          datas={usersOrders}
          columns={columns}
          INITIAL_VISIBLE_COLUMNS={usersOrdersINITIAL_VISIBLE_COLUMNS}
          columns={Usercolumns}
          quantity="گزارش ها"
          topContents={true}
          viewContent={false}
          viewContentSmSize={false}
          addBtn={false}
          columnsDropDownBtn={true}
          rolesDropDown={false}
          stausDropDown={true}
          bottomContents={true}
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

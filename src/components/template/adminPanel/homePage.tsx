"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import MiniCardModule from "@/components/module/MiniCardModule";
import React, { useMemo } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { CgArrowLeft } from "react-icons/cg";
import {
  columns,
  Usercolumns,
  usersOrders,
  usersOrdersINITIAL_VISIBLE_COLUMNS,
} from "@/constants/tableData";
import { adminCards } from "@/constants/data";
import { useTableStore } from "@/store/useTableSlice";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";

const HomePage: React.FC = () => {
  const { visibleColumns } = useTableStore();
  const { sortedItems } = useFilteredContainer(usersOrders);

  // محاسبه ستون‌های هدر
  const headerColumns = useMemo(() => {
    return visibleColumns.size === columns.length
      ? columns
      : columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="p-4 md:p-6">
        <TitleStructureDashboards mainTitle="داشبورد" />
        <MiniCardModule cards={adminCards} />
      </div>

      <div className="p-4 md:p-6">
        <TitleStructureDashboards
          mainTitle="گزارش های اخیر"
          viewMore="مشاهده همه "
          href="/admin/reports"
          icon={<CgArrowLeft />}
        />
        <FilteredContainer
          datas={usersOrders}
          INITIAL_VISIBLE_COLUMNS={usersOrdersINITIAL_VISIBLE_COLUMNS}
          columns={Usercolumns}
          topContents={false}
          viewContent={false}
          viewContentSmSize={false}
          addBtn={false}
          columnsDropDownBtn={false}
          rolesDropDown={false}
          stausDropDown={true}
          bottomContents={false}
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

export default HomePage;

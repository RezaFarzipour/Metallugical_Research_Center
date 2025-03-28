"use client";
import React, { useMemo } from "react";
import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import MiniCardModule from "@/components/module/MiniCardModule";
import { userCards } from "@/constants/data";
import {
  columns,
  usersOrders,
  usersOrdersINITIAL_VISIBLE_COLUMNS,
} from "@/constants/tableData";
import { CgArrowLeft } from "react-icons/cg";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import { useTableStore } from "@/store/useTableSlice";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/element/table/CustomeTable";

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
      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards mainTitle="سوابق من" />
        <MiniCardModule cards={userCards} />
      </div>

      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards
          mainTitle="آخرین سفارش های من"
          viewMore="مشاهده همه سفارش ها"
          href="/user/reports"
          icon={<CgArrowLeft />}
        />

        <FilteredContainer
          users={usersOrders}
          INITIAL_VISIBLE_COLUMNS={usersOrdersINITIAL_VISIBLE_COLUMNS}
          quantity="سفارش ها "
          viewContent={false}
          viewContentSmSize={false}
          topContents={false}
          bottomContents={false}
          btn={false}
          dropDownBtn={false}
          roles={false}
          product={false}
          image={false}
        >
          <CustomeTable
            headerColumns={headerColumns}
            sortedItems={sortedItems}
            firstActionContent="پرداخت"
            secondActionContent="لغو"
            image={true}
          />
        </FilteredContainer>
      </div>
    </div>
  );
};

export default HomePage;

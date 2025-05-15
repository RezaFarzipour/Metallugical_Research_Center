"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import MiniCardModule from "@/components/module/MiniCardModule";
import React, { useMemo } from "react";
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
import { TbEyeDiscount } from "react-icons/tb";
import { useRouter } from "next/navigation";

const HomePage: React.FC = () => {
  const { visibleColumns } = useTableStore();
  const { sortedItems } = useFilteredContainer(usersOrders);
  const router = useRouter();

  // محاسبه ستون‌های هدر
  const headerColumns = useMemo(() => {
    return visibleColumns.size === columns.length
      ? columns
      : columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);
  const firstActionClickHandler = () => {
    router.push("/reservation");
  };
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="p-4 md:p-6">
        <TitleStructureDashboards mainTitle="داشبورد" />
        <MiniCardModule cards={adminCards} />
      </div>

      <div className="p-4 md:p-6">
        <TitleStructureDashboards
          mainTitle="رزرو های اخیر"
          viewMore="مشاهده همه "
          href="/admin/reservse"
          icon={<CgArrowLeft />}
        />
        <FilteredContainer
          datas={usersOrders}
          INITIAL_VISIBLE_COLUMNS={usersOrdersINITIAL_VISIBLE_COLUMNS}
          columns={Usercolumns}
          topContents={false}
          viewContent={false}
          viewContentSmSize={true}
          addBtn={false}
          columnsDropDownBtn={false}
          rolesDropDown={false}
          stausDropDown={true}
          bottomContents={false}
        >
          <CustomeTable
            headerColumns={headerColumns}
            sortedItems={sortedItems}
            firstActionContent="جزئیات"
            firstActionIcon={TbEyeDiscount}
            firstActionClickHandler={firstActionClickHandler}
            image={true}
          />
        </FilteredContainer>
      </div>
    </div>
  );
};

export default HomePage;

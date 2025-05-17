"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import { ReservesAdmincolumns } from "@/constants/tableData";
import React from "react";
import { useTableStore } from "@/store/useTableSlice";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import { TbEyeDiscount } from "react-icons/tb";
import { BtnLoader } from "@/components/element/Loader";
import Empty from "@/components/element/Empty";
import useReserveData from "./useReserveData";

const ReservesPage: React.FC = () => {
  const { visibleColumns } = useTableStore();
  const {
    formDataReseves,
    visibleKeys,
    headerColumns,
    firstActionClickHandler,
    isLoadingReserve,
    isEmpty,
  } = useReserveData(visibleColumns);
  const { sortedItems } = useFilteredContainer(formDataReseves);

  return (
    <div className="grid grid-cols-1">
      <div className=" p-4 md:p-6">
        <TitleStructureDashboards mainTitle="رزرو ها" />

        <FilteredContainer
          datas={formDataReseves}
          INITIAL_VISIBLE_COLUMNS={visibleKeys}
          columns={ReservesAdmincolumns}
          quantity="رزرو ها"
          topContents={!!formDataReseves?.length}
          viewContent={false}
          viewContentSmSize={false}
          addBtn={false}
          columnsDropDownBtn={true}
          rolesDropDown={false}
          stausDropDown={false}
          bottomContents={!!formDataReseves?.length}
        >
          {isLoadingReserve ? (
            <div>
              <BtnLoader color="#377cfb" />
            </div>
          ) : isEmpty ? (
            <Empty spanValue="رزروی" btn={false} />
          ) : (
            <CustomeTable
              headerColumns={headerColumns}
              sortedItems={sortedItems}
              firstActionContent="جزئیات"
              firstActionIcon={TbEyeDiscount}
              firstActionClickHandler={firstActionClickHandler}
              image={false}
            />
          )}
        </FilteredContainer>
      </div>
    </div>
  );
};

export default ReservesPage;

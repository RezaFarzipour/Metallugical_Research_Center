"use client";
import React from "react";
import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import MiniCardModule from "@/components/module/MiniCardModule";
import { getUserCards } from "@/constants/data";
import { CgArrowLeft } from "react-icons/cg";
import { useTableStore } from "@/store/useTableSlice";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import { ReservesCustomercolumns } from "@/constants/tableData";
import { TbEyeDiscount } from "react-icons/tb";
import { BtnLoader } from "@/components/element/Loader";
import Empty from "@/components/element/Empty";
import useDashboardData from "./useDashboardData";
const DashboardPage: React.FC = () => {
  const { visibleColumns } = useTableStore();
  const {
    formDataReseves,
    visibleKeys,
    headerColumns,
    firstActionClickHandler,
    isEmpty,
    isLoadingReserve,
    reserveLength,
    activeReservationCount,
    sliecedItems,
  } = useDashboardData(visibleColumns)




  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards mainTitle="سوابق من" />
        <MiniCardModule
          cards={getUserCards(reserveLength, activeReservationCount)}
        />
      </div>

      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards
          mainTitle="آخرین سفارش های من"
          href="/user/reports"
          icon={<CgArrowLeft />}
        />

        <FilteredContainer
          datas={formDataReseves}
          INITIAL_VISIBLE_COLUMNS={visibleKeys}
          columns={ReservesCustomercolumns}
          quantity="گزارش ها"
          viewContent={false}
          viewContentSmSize={false}
          addBtn={false}
          columnsDropDownBtn={true}
          rolesDropDown={false}
          stausDropDown={true}
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
              sortedItems={sliecedItems}
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

export default DashboardPage;

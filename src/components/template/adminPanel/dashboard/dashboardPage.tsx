"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import MiniCardModule from "@/components/module/MiniCardModule";
import React from "react";
import { CgArrowLeft } from "react-icons/cg";
import { ReservesAdmincolumns } from "@/constants/tableData";
import { adminCards } from "@/constants/data";
import { useTableStore } from "@/store/useTableSlice";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import { TbEyeDiscount } from "react-icons/tb";
import useDashboardData from "./useDashboardData";
import { BtnLoader } from "@/components/element/Loader";
import Empty from "@/components/element/Empty";

const DashboardPage: React.FC = () => {
  const { visibleColumns } = useTableStore();
  const {
    formDataReseves,
    visibleKeys,
    headerColumns,
    firstActionClickHandler,
    isLoadingReserve,
    isEmpty,
    reserveLength,
    activeReservationCount,
    sliecedItems,
  } = useDashboardData(visibleColumns);
  const { sortedItems } = useFilteredContainer(formDataReseves);

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="p-4 md:p-6">
        <TitleStructureDashboards mainTitle="داشبورد" />
        {/* <MiniCardModule
          cards={getUserCards(reserveLength, activeReservationCount)}
        /> */}
        <MiniCardModule cards={adminCards} />
      </div>

      <div className=" p-4 md:p-6">
        <TitleStructureDashboards
          mainTitle="رزرو های اخیر"
          viewMore="مشاهده همه "
          href="/admin/reservse"
          icon={<CgArrowLeft />}
        />

        <FilteredContainer
          datas={formDataReseves}
          INITIAL_VISIBLE_COLUMNS={visibleKeys}
          columns={ReservesAdmincolumns}
          quantity="رزرو ها"
          topContents={false}
          viewContent={false}
          viewContentSmSize={false}
          addBtn={false}
          columnsDropDownBtn={true}
          rolesDropDown={false}
          stausDropDown={false}
          paymentStautsDropDown={true}
          bottomContents={false}
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

"use client";
import React, { useState } from "react";
import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import { CgArrowLeft } from "react-icons/cg";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import { ReservesCustomercolumns } from "@/constants/tableData";
import { TbEyeDiscount } from "react-icons/tb";
import { BtnLoader } from "@/components/element/Loader";
import Empty from "@/components/element/Empty";
import useDashboardData from "./useDashboardData";
import Minicard from "@/components/element/Minicard";
import { useReservesTableStore } from "@/store/useTableSlice";
const DashboardPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const {
    formDataReseves,
    headerColumns,
    firstActionClickHandler,
    isEmpty,
    isLoadingReserve,
    sliecedItems,
    cardsWithCounts,
  } = useDashboardData();

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="p-4 md:p-6">
        <TitleStructureDashboards mainTitle="سوابق من" />
        <div className="flex flex-col md:flex-row gap-4">
          <Minicard {...cardsWithCounts.lengthReserve} />
          <Minicard {...cardsWithCounts.activeReserve} />
          <Minicard {...cardsWithCounts.cancelReserve} />
        </div>
      </div>

      <div className="p-4 md:p-6">
        <TitleStructureDashboards
          mainTitle="آخرین سفارش های من"
          viewMore="مشاهده همه "
          href="/user/myreservs"
          icon={<CgArrowLeft />}
        />

        <FilteredContainer
          datas={formDataReseves}
          columns={ReservesCustomercolumns}
          tableStore={useReservesTableStore}
          quantity="سوابق "
          topContents={false}
          viewContent={false}
          viewContentSmSize={false}
          addBtn={false}
          columnsDropDownBtn={true}
          rolesDropDown={false}
          paymentStautsDropDown={true}
          stausDropDown={true}
          bottomContents={false}
          page={page}
          setPage={setPage}
        >
          {isLoadingReserve ? (
            <div className="flex justify-center items-center min-h-[70vh]">
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

"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import { ReservesAdmincolumns } from "@/constants/tableData";
import React, { useState } from "react";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import { TbEyeDiscount } from "react-icons/tb";
import { BtnLoader } from "@/components/element/Loader";
import Empty from "@/components/element/Empty";
import useReserveData from "./useReserveData";
import { useReservesTableStore } from "@/store/useTableSlice";

const ReservesPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const {
    formDataReseves,
    headerColumns,
    firstActionClickHandler,
    isLoadingReserve,
    isEmpty,
  } = useReserveData();

  const {
    filterValue,
    statusFilter,
    peymentStatusFilter,
    rolesFilter,
    rowsPerPage,
    sortDescriptor,
  } = useReservesTableStore();

  const { sortedItems, pages } = useFilteredContainer(formDataReseves, page, {
    filterValue,
    statusFilter,
    peymentStatusFilter,
    rolesFilter,
    rowsPerPage,
    sortDescriptor,
  });

  return (
    <div className="grid grid-cols-1">
      <div className=" p-4 md:p-6">
        <TitleStructureDashboards mainTitle="رزرو ها" />

        <FilteredContainer
          datas={formDataReseves}
          columns={ReservesAdmincolumns}
          quantity="رزرو ها"
          tableStore={useReservesTableStore}
          topContents={!!formDataReseves?.length}
          viewContent={false}
          viewContentSmSize={false}
          addBtn={false}
          columnsDropDownBtn={true}
          rolesDropDown={false}
          stausDropDown={false}
          paymentStautsDropDown={true}
          bottomContents={!!formDataReseves?.length}
          page={page}
          setPage={setPage}
          pages={pages}
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

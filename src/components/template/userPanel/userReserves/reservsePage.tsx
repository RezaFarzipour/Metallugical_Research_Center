"use client";
import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import { ReservesCustomercolumns } from "@/constants/tableData";
import React, { useState } from "react";
import { useReservesTableStore } from "@/store/useTableSlice";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import { TbEyeDiscount } from "react-icons/tb";
import { BtnLoader } from "@/components/element/Loader";
import Empty from "@/components/element/Empty";
import useReserveData from "@/components/template/userPanel/userReserves/useUserReserves";

const ReservesPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const {
    formDataReseves,
    headerColumns,
    firstActionClickHandler,
    handleReserve,
    isEmpty,
    isLoadingReserve,
  } = useReserveData();

  const {
    filterValue,
    statusFilter,
    peymentStatusFilter,
    rolesFilter,
    rowsPerPage,
    sortDescriptor,
  } = useReservesTableStore();
  const { sortedItems } = useFilteredContainer(formDataReseves, page, {
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
          tableStore={useReservesTableStore}
          columns={ReservesCustomercolumns}
          quantity="رزرو ها"
          topContents={!!formDataReseves?.length}
          viewContent={false}
          viewContentSmSize={false}
          addBtn={true}
          addBtnContent="رزور جدید"
          btnClickHandler={handleReserve}
          columnsDropDownBtn={true}
          rolesDropDown={false}
          stausDropDown={true}
          bottomContents={!!formDataReseves?.length}
          page={page}
          setPage={setPage}
        >
          {isLoadingReserve ? (
            <div>
              <BtnLoader color="#377cfb" />
            </div>
          ) : isEmpty ? (
            <Empty
              spanValue="رزروی"
              btn={true}
              btnValue="رزرو جدید"
              btnOnClick={handleReserve}
            />
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

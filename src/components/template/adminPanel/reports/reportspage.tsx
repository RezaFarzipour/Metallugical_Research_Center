"use client";
import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import { ReportsAdmincolumns } from "@/constants/tableData";
import React, { useState } from "react";
import { useTableStore } from "@/store/useTableSlice";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import { BtnLoader } from "@/components/element/Loader";
import Empty from "@/components/element/Empty";
import useReportsData from "./useReportsData";
import { ReportData } from "@/types";
import { TbEyeDiscount } from "react-icons/tb";

const ReportsPage: React.FC = () => {
  const { visibleColumns } = useTableStore();
  const [page, setPage] = useState<number>(1);

  const {
    formDataReseves,
    visibleKeys,
    headerColumns,
    isLoadingReserve,
    isEmpty,
    firstActionClickHandler,
  } = useReportsData(visibleColumns);
  const { sortedItems } = useFilteredContainer<ReportData>(
    formDataReseves,
    page
  );

  return (
    <div className="grid grid-cols-1">
      <div className=" p-4 md:p-6">
        <TitleStructureDashboards mainTitle="گزارش ها" />

        <FilteredContainer
          datas={formDataReseves}
          INITIAL_VISIBLE_COLUMNS={visibleKeys}
          columns={ReportsAdmincolumns}
          quantity="گزارش ها"
          topContents={!!formDataReseves?.length}
          viewContent={false}
          viewContentSmSize={false}
          addBtn={false}
          columnsDropDownBtn={true}
          rolesDropDown={false}
          paymentStautsDropDown={true}
          stausDropDown={true}
          bottomContents={!!formDataReseves?.length}
          page={page}
          setPage={setPage}
        >
          {isLoadingReserve ? (
            <div className="flex justify-center items-center mt-32">
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

export default ReportsPage;

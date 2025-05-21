"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";

import React from "react";
import { CgArrowLeft } from "react-icons/cg";
import { ReservesAdmincolumns } from "@/constants/tableData";
import { useTableStore } from "@/store/useTableSlice";

import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import { TbEyeDiscount } from "react-icons/tb";
import useDashboardData from "./useDashboardData";
import { BtnLoader } from "@/components/element/Loader";
import Empty from "@/components/element/Empty";
import Minicard from "@/components/element/Minicard";

const DashboardPage: React.FC = ({ cardsData }) => {
  const { visibleColumns } = useTableStore();
  const {
    formDataReseves,
    visibleKeys,
    headerColumns,
    firstActionClickHandler,
    isLoadingReserve,
    slicedItems,
    cardsWithCounts,
  } = useDashboardData(visibleColumns, cardsData);

  if (isLoadingReserve)
    return (
      <div>
        <BtnLoader color="#377cfb" />
      </div>
    );
  if (!slicedItems.length) return <Empty spanValue="رزروی" btn={false} />;

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="p-4 md:p-6">
        <TitleStructureDashboards mainTitle="داشبورد" />
        <div className="flex flex-col md:flex-row gap-4">
          <Minicard {...cardsWithCounts.users} />
          <Minicard {...cardsWithCounts.orders} />
          <Minicard {...cardsWithCounts.products} />
          <Minicard {...cardsWithCounts.blogs} />
        </div>{" "}
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
          <CustomeTable
            headerColumns={headerColumns}
            sortedItems={slicedItems}
            firstActionContent="جزئیات"
            firstActionIcon={TbEyeDiscount}
            firstActionClickHandler={firstActionClickHandler}
            image={false}
          />
        </FilteredContainer>
      </div>
    </div>
  );
};

export default DashboardPage;

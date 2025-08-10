"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import React, { useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { ReservesAdmincolumns } from "@/constants/tableData";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import { TbEyeDiscount } from "react-icons/tb";
import useDashboardData from "./useDashboardData";
import { BtnLoader } from "@/components/element/Loader";
import Empty from "@/components/element/Empty";
import Minicard from "@/components/element/Minicard";
import { CardsData } from "@/types";
import { useReportsTableStore } from "@/store/useTableSlice";

interface DashboardPageProps {
  cardsData: CardsData;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ cardsData }) => {
  const [page, setPage] = useState<number>(1);

  const {
    formDataReseves,
    headerColumns,
    firstActionClickHandler,
    isLoadingReserve,
    slicedItems,
    cardsWithCounts,
  } = useDashboardData(cardsData);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <Minicard {...cardsWithCounts.users} />
          <Minicard {...cardsWithCounts.orders} />
          <Minicard {...cardsWithCounts.products} />
          <Minicard {...cardsWithCounts.blogs} />
        </div>
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
          columns={ReservesAdmincolumns}
          tableStore={useReportsTableStore}
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
          page={page}
          setPage={setPage}
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

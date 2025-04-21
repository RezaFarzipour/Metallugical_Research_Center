"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import { Usercolumns } from "@/constants/tableData";
import React, { Suspense } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TbEyeDiscount } from "react-icons/tb";
import { useTableStore } from "@/store/useTableSlice";
import FilteredContainer from "@/components/containers/FilteredContainer";
import useUserData from "./useUserData";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import BtnLoader from "@/components/element/BtnLoader";
import CustomeTable from "@/components/module/CustomeTable";

const UsersPage: React.FC = () => {
  const { visibleColumns } = useTableStore();
  const includeskey = ["email", "phone_number", "role"];
  const {
    formDataSignedUp,
    isPending,
    visibleKeys,
    headerColumns,
    firstActionClickHandler,
    secondActionClickHandler,
  } = useUserData(visibleColumns, includeskey);

  const { sortedItems } = useFilteredContainer(formDataSignedUp);

  if (isPending) return <div>loading...</div>;
  return (
    <div className="grid grid-cols-1">
      <div className=" p-4 md:p-6">
        <TitleStructureDashboards mainTitle="کاربران" />

        <FilteredContainer
          users={formDataSignedUp}
          INITIAL_VISIBLE_COLUMNS={visibleKeys}
          columns={Usercolumns}
          quantity="کاربران"
          viewContent={false}
          viewContentSmSize={false}
          topContents={true}
          bottomContents={true}
          btn={false}
          dropDownBtn={true}
          roles={true}
          product={false}
          image={false}
        >
          <Suspense fallback={<BtnLoader />}>
            <CustomeTable
              headerColumns={headerColumns}
              sortedItems={sortedItems}
              firstActionContent="جزئیات"
              firstActionIcon={TbEyeDiscount}
              secondActionContent="حذف"
              secondActionIcon={MdDeleteOutline}
              firstActionClickHandler={firstActionClickHandler}
              secondActionClickHandler={secondActionClickHandler}
              image={true}
            />
          </Suspense>
        </FilteredContainer>
      </div>
    </div>
  );
};

export default UsersPage;

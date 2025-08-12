"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import { Usercolumns } from "@/constants/tableData";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TbEyeDiscount } from "react-icons/tb";
import FilteredContainer from "@/components/containers/FilteredContainer";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import useUserData from "./hooks/useUserData";
import ModalModule from "@/components/element/ModalModule";
import { BtnLoader } from "@/components/element/Loader";
import { UserType } from "@/types";
import { useUsersTableStore } from "@/store/useTableSlice";
import Empty from "@/components/element/Empty";

const UsersPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const includeskey = ["email", "phone_number", "role"];
  const {
    handleDeleteService,
    selectedServiceId,
    setIsModalOpen,
    isModalOpen,
    formDataSignedUp,
    isPending,
    headerColumns,
    firstActionClickHandler,
    secondActionClickHandler,
    isEmpty,
  } = useUserData(includeskey);

  const {
    filterValue,
    statusFilter,
    peymentStatusFilter,
    rolesFilter,
    rowsPerPage,
    sortDescriptor,
  } = useUsersTableStore();

  const { sortedItems } = useFilteredContainer<UserType>(
    formDataSignedUp,
    page,
    {
      filterValue,
      statusFilter,
      peymentStatusFilter,
      rolesFilter,
      rowsPerPage,
      sortDescriptor,
    }
  );

  return (
    <div className="grid grid-cols-1">
      <div className=" p-4 md:p-6">
        <TitleStructureDashboards mainTitle="کاربران" />

        {isPending ? (
          <div className="flex justify-center items-center mt-32">
            <BtnLoader color="#377cfb" />
          </div>
        ) : isEmpty ? (
          <Empty spanValue="کاربری" btn={false} />
        ) : (
          <FilteredContainer
            datas={formDataSignedUp}
            columns={Usercolumns}
            quantity="کاربران"
            tableStore={useUsersTableStore}
            topContents={true}
            viewContent={false}
            viewContentSmSize={false}
            addBtn={false}
            columnsDropDownBtn={true}
            rolesDropDown={true}
            stausDropDown={false}
            bottomContents={true}
            page={page}
            setPage={setPage}
          >
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
          </FilteredContainer>
        )}
      </div>

      {isModalOpen && (
        <ModalModule
          title="حذف کاربر"
          confirmText="تایید حذف"
          cancelText="انصراف"
          isOpen={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleDeleteService}
        >
          <p>
            آیا مطمئنی می‌خوای کاربر با آیدی {selectedServiceId} رو حذف کنی؟
          </p>
        </ModalModule>
      )}
    </div>
  );
};

export default UsersPage;

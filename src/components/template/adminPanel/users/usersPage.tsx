"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import { Usercolumns } from "@/constants/tableData";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TbEyeDiscount } from "react-icons/tb";
import { useTableStore } from "@/store/useTableSlice";
import FilteredContainer from "@/components/containers/FilteredContainer";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import useUserData from "./hooks/useUserData";
import ModalModule from "@/components/element/ModalModule";
import { BtnLoader } from "@/components/element/Loader";

const UsersPage: React.FC = () => {
  const { visibleColumns } = useTableStore();
  const includeskey = ["email", "phone_number", "role"];
  const {
    handleDeleteService,
    selectedServiceId,
    setIsModalOpen,
    isModalOpen,
    formDataSignedUp,
    isPending,
    visibleKeys,
    headerColumns,
    firstActionClickHandler,
    secondActionClickHandler,
  } = useUserData(visibleColumns, includeskey);

  const { sortedItems } = useFilteredContainer(formDataSignedUp);

  return (
    <div className="grid grid-cols-1">
      <div className=" p-4 md:p-6">
        <TitleStructureDashboards mainTitle="کاربران" />

        <FilteredContainer
          datas={formDataSignedUp}
          INITIAL_VISIBLE_COLUMNS={visibleKeys}
          columns={Usercolumns}
          quantity="کاربران"
          topContents={true}
          viewContent={false}
          viewContentSmSize={false}
          addBtn={false}
          columnsDropDownBtn={true}
          rolesDropDown={true}
          stausDropDown={false}
          bottomContents={true}
        >
          {isPending ? (
            <div>
              <BtnLoader color="#377cfb" />
            </div>
          ) : (
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
          )}
        </FilteredContainer>
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

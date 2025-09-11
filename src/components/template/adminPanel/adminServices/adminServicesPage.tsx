"use client";

import React, { useState } from "react";
import FilteredContainer from "@/components/containers/FilteredContainer";
import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import { Servicecolumns } from "@/constants/tableData";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import { MdDeleteOutline } from "react-icons/md";
import { TbEyeDiscount } from "react-icons/tb";
import CardModule from "@/components/module/cardModule/CardModule";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import ModalModule from "@/components/element/ModalModule";
import Empty from "@/components/element/Empty";
import { BtnLoader } from "@/components/element/Loader";
import { useAdminServicesDataAction } from "./hooks/useAdminServicesDataAction";
import { ServerServiceType } from "@/types/serviceType";
import { useAdminServicesTableStore } from "@/store/useTableSlice";

export const AdminServicesPage: React.FC = ({}) => {
  const [page, setPage] = useState<number>(1);
  const view = useAdminServicesTableStore((state) => state.view);

  const {
    isModalOpen,
    setIsModalOpen,
    selectedServiceId,
    formDataServices,
    headerColumns,
    isPending,
    firstActionClickHandler,
    secondActionClickHandler,
    handleDeleteService,
    router,
  } = useAdminServicesDataAction();

  const {
    filterValue,
    statusFilter,
    peymentStatusFilter,
    rolesFilter,
    rowsPerPage,
    sortDescriptor,
  } = useAdminServicesTableStore();

  const { sortedItems, pages } = useFilteredContainer<ServerServiceType>(
    formDataServices,
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

  const isEmpty = !formDataServices || formDataServices.length === 0;

  return (
    <div className="grid grid-cols-1">
      <div className="p-4 md:p-6">
        <TitleStructureDashboards mainTitle="سرویس ها" />
        <FilteredContainer
          datas={formDataServices}
          tableStore={useAdminServicesTableStore}
          columns={Servicecolumns}
          quantity="سرویس ها "
          topContents={!!formDataServices?.length}
          viewContent={true}
          viewContentSmSize={true}
          columnsDropDownBtn={true}
          rolesDropDown={false}
          stausDropDown={false}
          addBtn={true}
          btnClickHandler={() => router.push("/admin/services/create")}
          bottomContents={!!formDataServices?.length}
          page={page}
          setPage={setPage}
          pages={pages}
        >
          {isPending ? (
            <div className="flex justify-center items-center min-h-[70vh]">
              <BtnLoader color="#377cfb" />
            </div>
          ) : isEmpty ? (
            <Empty
              btnValue="افزودن سرویس"
              btnHref="/admin/services/create"
              spanValue="سرویسی"
            />
          ) : !view ? (
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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-28">
              <CardModule
                data={sortedItems}
                isDate={false}
                isMoreDetails="adminServices"
                widthConter="100%"
                heightImg="250px"
                heightConter="200px"
                bottomOffset="160"
                styleForAdmin={true}
                view={view}
                useMaxWidth={true}
              />
            </div>
          )}
        </FilteredContainer>
      </div>

      {/* مودال حذف سرویس */}
      {isModalOpen && (
        <ModalModule
          title="حذف سرویس"
          confirmText="تایید حذف"
          cancelText="انصراف"
          isOpen={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleDeleteService}
        >
          <p>
            آیا مطمئنی می‌خوای سرویس با آیدی {selectedServiceId} رو حذف کنی؟
          </p>
        </ModalModule>
      )}
    </div>
  );
};

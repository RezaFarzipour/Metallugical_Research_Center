"use client";
import React from "react";
import FilteredContainer from "@/components/containers/FilteredContainer";
import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import { Servicecolumns } from "@/constants/tableData";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import { MdDeleteOutline } from "react-icons/md";
import { TbEyeDiscount } from "react-icons/tb";
import CardModule from "@/components/module/cardModule/CardModule";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import BtnLoader from "@/components/element/BtnLoader";
import { useAdminServicesData } from "./useAdminServicesData";
import ModalModule from "@/components/element/ModalModule";
import Empty from "@/components/element/Empty";

export const AdminServicesPage: React.FC = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    selectedServiceId,
    view,
    formDataServices,
    visibleKeys,
    headerColumns,
    isPending,
    firstActionClickHandler,
    secondActionClickHandler,
    handleDeleteService,
  } = useAdminServicesData();


  const { sortedItems } = useFilteredContainer(formDataServices);

  const isEmpty = !formDataServices || formDataServices.length === 0;

  return (
    <div className="grid grid-cols-1">
      <div className="p-4 md:p-6">
        <TitleStructureDashboards mainTitle="سرویس ها" />
        <FilteredContainer
          datas={formDataServices}
          INITIAL_VISIBLE_COLUMNS={visibleKeys}
          columns={Servicecolumns}
          quantity="سرویس ها "
          topContents={!!formDataServices?.length}
          viewContent={true}
          viewContentSmSize={false}
          columnsDropDownBtn={true}
          rolesDropDown={false}
          stausDropDown={false}
          addBtn={true}
          addBtnhref="/admin/services/create"
          bottomContents={!!formDataServices?.length}
        >
          {isPending ? (
            <div>
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
                moreDetailsHref="/admin/services/details"
                widthConter="100%"
                heightImg="250px"
                heightConter="200px"
                view={view}
                styleForAdmin={true}
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

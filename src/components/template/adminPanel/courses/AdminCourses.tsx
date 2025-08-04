"use client";

import React, { useState } from "react";
import FilteredContainer from "@/components/containers/FilteredContainer";
import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import { Coursecolumns } from "@/constants/tableData";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import { MdDeleteOutline } from "react-icons/md";
import { TbEyeDiscount } from "react-icons/tb";
import CardModule from "@/components/module/cardModule/CardModule";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import ModalModule from "@/components/element/ModalModule";
import Empty from "@/components/element/Empty";
import { BtnLoader } from "@/components/element/Loader";
import { ServerServiceType } from "@/types/serviceType";
import { useAdminCoursesDataAction } from "./hooks/useAdminCourseData";

export const AdminCourses: React.FC = ({}) => {
  const [page, setPage] = useState<number>(1);

  const {
    isModalOpen,
    setIsModalOpen,
    selectedCourseId,
    view,
    formDataCourses,
    visibleKeys,
    headerColumns,
    isPending,
    firstActionClickHandler,
    secondActionClickHandler,
    handleDeleteCourse,
    router,
  } = useAdminCoursesDataAction();

  const { sortedItems } = useFilteredContainer<ServerServiceType>(
    formDataCourses,
    page
  );

  const isEmpty = !formDataCourses || formDataCourses.length === 0;

  return (
    <div className="grid grid-cols-1">
      <div className="p-4 md:p-6">
        <TitleStructureDashboards mainTitle="دوره ها" />
        <FilteredContainer
          datas={formDataCourses}
          INITIAL_VISIBLE_COLUMNS={visibleKeys}
          columns={Coursecolumns}
          quantity="دوره ها "
          topContents={!!formDataCourses?.length}
          viewContent={true}
          viewContentSmSize={true}
          columnsDropDownBtn={true}
          rolesDropDown={false}
          stausDropDown={false}
          addBtn={true}
          btnClickHandler={() => router.push("/admin/courses/create")}
          bottomContents={!!formDataCourses?.length}
          page={page}
          setPage={setPage}
        >
          {isPending ? (
            <div>
              <BtnLoader color="#377cfb" />
            </div>
          ) : isEmpty ? (
            <Empty
              btnValue="افزودن دوره آموزشی"
              btnHref="/admin/services/create"
              spanValue="دوره آموزشیی"
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
              />
            </div>
          )}
        </FilteredContainer>
      </div>

      {/* مودال حذف دوره آموزشی */}
      {isModalOpen && (
        <ModalModule
          title="حذف دوره آموزشی"
          confirmText="تایید حذف"
          cancelText="انصراف"
          isOpen={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleDeleteCourse}
        >
          <p>
            آیا مطمئنی می‌خوای دوره آموزشی با آیدی {selectedCourseId} رو حذف
            کنی؟
          </p>
        </ModalModule>
      )}
    </div>
  );
};

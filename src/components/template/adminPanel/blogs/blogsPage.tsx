"use client";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import { blogColumns } from "@/constants/tableData";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TbEyeDiscount } from "react-icons/tb";
import CardModule from "@/components/module/cardModule/CardModule";
import ModalModule from "@/components/element/ModalModule";
import Empty from "@/components/element/Empty";
import { BtnLoader } from "@/components/element/Loader";
import { useAdminBlogDataAction } from "./hooks/useAdminBlogDataAction";
import { BlogType } from "@/types";
import { useBlogFormStore } from "@/store/useBlogFormStore";
import { useBlogsTableStore } from "@/store/useTableSlice";

export const BlogsPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const {
    isModalOpen,
    setIsModalOpen,
    view,
    formDataBlogs,
    headerColumns,
    firstActionClickHandler,
    secondActionClickHandler,
    isPending,
    selectedName,
    router,
    handleDeleteBlog,
  } = useAdminBlogDataAction();

  const {
    filterValue,
    statusFilter,
    peymentStatusFilter,
    rolesFilter,
    rowsPerPage,
    sortDescriptor,
  } = useBlogsTableStore();

  const { sortedItems } = useFilteredContainer<BlogType>(formDataBlogs, page, {
    filterValue,
    statusFilter,
    peymentStatusFilter,
    rolesFilter,
    rowsPerPage,
    sortDescriptor,
  });
  const isEmpty = !formDataBlogs || formDataBlogs.length === 0;

  return (
    <div className="grid grid-cols-1">
      <div className=" p-4 md:p-6">
        <TitleStructureDashboards mainTitle="وبلاگ ها" />
        <FilteredContainer
          datas={formDataBlogs}
          columns={blogColumns}
          tableStore={useBlogsTableStore}
          quantity="بلاگ ها"
          topContents={!!formDataBlogs?.length}
          viewContent={true}
          viewContentSmSize={true}
          addBtn={true}
          btnClickHandler={() => {
            router.push("/admin/blogs/create");
            useBlogFormStore.getState().resetForm();
            useBlogFormStore.persist.clearStorage();
          }}
          columnsDropDownBtn={true}
          rolesDropDown={false}
          stausDropDown={false}
          bottomContents={!!formDataBlogs?.length}
          page={page}
          setPage={setPage}
        >
          {isPending ? (
            <div>
              <BtnLoader color="#377cfb" />
            </div>
          ) : isEmpty ? (
            <Empty
              btnValue="افزودن وبلاگ"
              btnHref="/admin/blogs/create"
              spanValue="بلاگی"
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
              image={false}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-28">
              <CardModule
                data={sortedItems}
                isDate={false}
                isMoreDetails="adminBlogs"
                widthConter="100%"
                heightImg="200px"
                heightConter="150px"
                bottomOffset="130"
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
          onConfirm={handleDeleteBlog}
        >
          <p>آیا مطمئنی می‌خوای بلاگ با عنوان {selectedName} رو حذف کنی؟</p>
        </ModalModule>
      )}
    </div>
  );
};

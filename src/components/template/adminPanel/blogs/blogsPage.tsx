// "use client";
// import FilteredContainer from "@/components/containers/FilteredContainer";
// import CustomeTable from "@/components/module/customeTable/CustomeTable";
// import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
// import {
//   blogColumns,
//   blogs,
//   blogsINITIAL_VISIBLE_COLUMNS,
//   columns,
//   Usercolumns,
// } from "@/constants/tableData";
// import { useFilteredContainer } from "@/hooks/useFilteredContainer";
// import { useTableStore } from "@/store/useTableSlice";
// import React, { useMemo } from "react";
// import { MdDeleteOutline } from "react-icons/md";
// import { TbEyeDiscount } from "react-icons/tb";
// import CardModule from "@/components/module/cardModule/CardModule";

// export const BlogsPage: React.FC = () => {
//   const { view, visibleColumns } = useTableStore();
//   const { sortedItems } = useFilteredContainer(blogs);

//   // محاسبه ستون‌های هدر
//   const headerColumns = useMemo(() => {
//     return visibleColumns.size === columns.length
//       ? blogColumns
//       : blogColumns.filter((column) => visibleColumns.has(column.uid));
//   }, [visibleColumns]);

//   return (
//     <div className="grid grid-cols-1">
//       <div className=" p-4 md:p-6">
//         <TitleStructureDashboards mainTitle="محصولات" />
//         <FilteredContainer
//           datas={blogs}
//           INITIAL_VISIBLE_COLUMNS={blogsINITIAL_VISIBLE_COLUMNS}
//           columns={Usercolumns}
//           quantity="بلاگ ها"
//           topContents={true}
//           viewContent={true}
//           viewContentSmSize={false}
//           addBtn={true}
//           addBtnhref="/admin/blogs/createblog"
//           columnsDropDownBtn={true}
//           rolesDropDown={false}
//           stausDropDown={false}
//           bottomContents={true}
//         >
//           {!view ? (
//             <CustomeTable
//               headerColumns={headerColumns}
//               sortedItems={sortedItems}
//               firstActionContent="جزئیات"
//               firstActionIcon={TbEyeDiscount}
//               secondActionContent="حذف"
//               secondActionIcon={MdDeleteOutline}
//               image={true}
//             />
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
//               <CardModule
//                 data={sortedItems}
//                 widthConter="100%"
//                 heightImg="200px"
//                 heightConter="150px"
//                 view={view}
//               />
//             </div>
//           )}
//         </FilteredContainer>
//       </div>
//     </div>
//   );
// };

"use client";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import { blogColumns } from "@/constants/tableData";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TbEyeDiscount } from "react-icons/tb";
import CardModule from "@/components/module/cardModule/CardModule";
import { useAdminBlogDataAction } from "@/components/module/panelAction/blogAction/useAdminBlogDataAction";
import ModalModule from "@/components/element/ModalModule";
import Empty from "@/components/element/Empty";
import { BtnLoader } from "@/components/element/Loader";

export const BlogsPage: React.FC = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    selectedServiceId,
    view,
    formDataServices,
    visibleKeys,
    headerColumns,
    loading,
    router,
    firstActionClickHandler,
    secondActionClickHandler,
    handleDeleteService,
  } = useAdminBlogDataAction();

  const { sortedItems } = useFilteredContainer(formDataServices);
  const isEmpty = !formDataServices || formDataServices.length === 0;

  return (
    <div className="grid grid-cols-1">
      <div className=" p-4 md:p-6">
        <TitleStructureDashboards mainTitle="وبلاگ ها" />
        <FilteredContainer
          datas={formDataServices}
          INITIAL_VISIBLE_COLUMNS={visibleKeys}
          columns={blogColumns}
          quantity="بلاگ ها"
          topContents={!!formDataServices?.length}
          viewContent={true}
          viewContentSmSize={false}
          addBtn={true}
          btnClickHandler={() => router.push("/admin/blogs/create")}
          columnsDropDownBtn={true}
          rolesDropDown={false}
          stausDropDown={false}
          bottomContents={!!formDataServices?.length}
        >
          {loading ? (
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
              image={true}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-28">
              <CardModule
                data={sortedItems}
                isDate={false}
                isMoreDetails="admin"
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
          <p>آیا مطمئنی می‌خوای بلاگ با آیدی {selectedServiceId} رو حذف کنی؟</p>
        </ModalModule>
      )}
    </div>
  );
};

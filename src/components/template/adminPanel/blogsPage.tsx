"use client";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import {
  blogColumns,
  blogs,
  blogsINITIAL_VISIBLE_COLUMNS,
  columns,
  Usercolumns,
} from "@/constants/tableData";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import { useTableStore } from "@/store/useTableSlice";
import React, { useMemo } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TbEyeDiscount } from "react-icons/tb";
import CardModule from "@/components/module/cardModule/CardModule";

export const BlogsPage: React.FC = () => {
  const { view, visibleColumns } = useTableStore();
  const { sortedItems } = useFilteredContainer(blogs);

  // محاسبه ستون‌های هدر
  const headerColumns = useMemo(() => {
    return visibleColumns.size === columns.length
      ? blogColumns
      : blogColumns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  return (
    <div className="grid grid-cols-1">
      <div className=" p-4 md:p-6">
        <TitleStructureDashboards mainTitle="محصولات" />
        <FilteredContainer
          datas={blogs}
          INITIAL_VISIBLE_COLUMNS={blogsINITIAL_VISIBLE_COLUMNS}
          columns={Usercolumns}
          quantity="بلاگ ها"
          topContents={true}
          viewContent={true}
          viewContentSmSize={false}
          addBtn={true}
          addBtnhref="/admin/blogs/createblog"
          columnsDropDownBtn={true}
          rolesDropDown={false}
          stausDropDown={false}
          bottomContents={true}
        >
          {!view ? (
            <CustomeTable
              headerColumns={headerColumns}
              sortedItems={sortedItems}
              firstActionContent="جزئیات"
              firstActionIcon={TbEyeDiscount}
              secondActionContent="حذف"
              secondActionIcon={MdDeleteOutline}
              image={true}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
              <CardModule
                data={sortedItems}
                widthConter="100%"
                heightImg="200px"
                heightConter="150px"
                view={view}
              />
            </div>
          )}
        </FilteredContainer>
      </div>
    </div>
  );
};

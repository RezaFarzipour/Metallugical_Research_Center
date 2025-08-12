"use client";
import FilteredContainer from "@/components/containers/FilteredContainer";
import { BtnLoader } from "@/components/element/Loader";
import TitleStructure from "@/components/element/TitleStructure";
import CardModule from "@/components/module/cardModule/CardModule";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import { BlogType } from "@/types";
import { cn } from "@/utils/cn";
import CategoryList from "./CateogryList";
import Empty from "@/components/element/Empty";
import { useState } from "react";
import { useBlogsTableStore } from "@/store/useTableSlice";

type BlogPageType = {
  AllBlogs: BlogType[];
  loading: boolean;
};

export default function BlogPage({
  AllBlogs,
  loading: isPending,
}: BlogPageType) {
  const blogs = Array.isArray(AllBlogs) ? AllBlogs : [];
  const [page, setPage] = useState<number>(1);

  const {
    filterValue,
    statusFilter,
    peymentStatusFilter,
    rolesFilter,
    rowsPerPage,
    sortDescriptor,
  } = useBlogsTableStore();

  const { sortedItems } = useFilteredContainer(blogs, page, {
    filterValue,
    statusFilter,
    peymentStatusFilter,
    rolesFilter,
    rowsPerPage,
    sortDescriptor,
  });

  return (
    <div className="p-4 md:p-10 w-full min-h-screen mt-96">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:py-8">
        {/* Sidebar - only on larger screens */}
        <aside className="hidden md:block md:col-span-3 lg:col-span-2">
          <CategoryList />
        </aside>

        {/* Main Content */}
        <main className="md:col-span-9 lg:col-span-10">
          <h3 className="text-xl mb-6">
            <TitleStructure size="1rem">وبلاگ</TitleStructure>
          </h3>

          <FilteredContainer
            datas={blogs}
            quantity="وبلاگ ها"
            topContents={!!blogs.length}
            tableStore={useBlogsTableStore}
            viewContent={true}
            viewContentSmSize={false}
            columnsDropDownBtn={false}
            addBtn={false}
            rolesDropDown={false}
            stausDropDown={false}
            bottomContents={!!blogs.length}
            page={page}
            setPage={setPage}
          >
            {isPending ? (
              <BtnLoader />
            ) : sortedItems.length === 0 ? (
              <>
                {/* Category List - visible only on small screens */}
                <div className="block md:hidden mt-9">
                  <CategoryList />
                </div>

                <div className="flex justify-center items-center pt-8">
                  <Empty
                    btnHref="/admin/services/create"
                    spanValue="بلاگی"
                    btn={false}
                  />
                </div>
              </>
            ) : (
              <div
                className={cn(
                  "grid gap-6",
                  "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pb-8"
                )}
              >
                {/* Category List - visible only on small screens */}
                <div className="block md:hidden mt-9">
                  <CategoryList />
                </div>
                <CardModule
                  data={sortedItems}
                  isDate={false}
                  widthConter="100%"
                  heightImg="200px"
                  heightConter="150px"
                  bottomOffset="130"
                  isMoreDetails="anyBlogs"
                  styleForAdmin={false}
                  view={true}
                />
              </div>
            )}
          </FilteredContainer>
        </main>
      </div>
    </div>
  );
}

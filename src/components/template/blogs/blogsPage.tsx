"use client";
import FilteredContainer from "@/components/containers/FilteredContainer";
import { BtnLoader } from "@/components/element/Loader";
import TitleStructure from "@/components/element/TitleStructure";
import CardModule from "@/components/module/cardModule/CardModule";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import { getAllBlogsCategory } from "@/services/api/blogs";
import { BlogType } from "@/types";
import { cn } from "@/utils/cn";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type initialDataType = {
  blogs: [];
  category_name: string;
  id: string;
  slug: string;
};
type BlogPageType = {
  AllBlogs: BlogType[];
  loading: boolean;
  initialData: initialDataType;
};

export default function BlogPage({
  AllBlogs,
  loading: isPending,
  initialData,
}: BlogPageType) {
  const formDataServices = Array.isArray(AllBlogs) ? AllBlogs : [];
  const { sortedItems } = useFilteredContainer(formDataServices);

  const view: boolean = true;

  const { data } = useQuery({
    queryKey: ["getAll-category"],
    queryFn: getAllBlogsCategory,
    initialData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  return (
    <div className="p-4 md:p-10 w-full  min-h-screen mt-96">
      <div className="grid w-full grid-cols-1 lg:grid-cols-4 gap-6 ">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6  ">
          <div className="bg-white rounded-xl  h-auto">
            <h3 className="text-xl mb-28">
              <TitleStructure size="1rem">دسته بندی ها </TitleStructure>
            </h3>
            <div className="sticky top-8">
              <ul className="space-y-2 text-sm text-gray-700">
                {data.map((cat: initialDataType) => (
                  <li key={cat.id}>
                    <Link
                      href={`/blogs/category/${cat.slug}?id=${cat.id}`}
                      className="block px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition cursor-pointer"
                    >
                      {cat.category_name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Blog Grid */}
        <main className="lg:col-span-3 w-full ">
          <h3 className="text-xl ">
            <TitleStructure size="1rem">وبلاگ </TitleStructure>
          </h3>

          <div className="flex my-10 flex-col gap-12 lg:gap-5 lg:flex-row justify-center w-full items-center">
            <FilteredContainer
              datas={formDataServices}
              quantity="وبلاگ ها"
              topContents={!!formDataServices?.length}
              viewContent={true}
              viewContentSmSize={false}
              btn={false}
              dropDownBtn={false}
              roles={false}
              addBtn={false}
              rolesDropDown={false}
              stausDropDown={false}
              bottomContents={!!formDataServices?.length}
            >
              {isPending ? (
                <BtnLoader />
              ) : (
                <div
                  className={cn(
                    "grid w-full gap-4 mt-10 mb-32 gap-y-8",
                    view
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1 md:grid-cols-2"
                  )}
                >
                  <CardModule
                    isDate={false}
                    data={sortedItems}
                    widthConter="100%"
                    heightImg="200px"
                    heightConter="150px"
                    bottomOffset="130"
                    isMoreDetails="anyBlogs"
                    styleForAdmin={false}
                    view={view}
                  />
                </div>
              )}
            </FilteredContainer>
          </div>
        </main>
      </div>
    </div>
  );
}

"use client";
import FilteredContainer from "@/components/containers/FilteredContainer";
import { BtnLoader } from "@/components/element/Loader";
import TitleStructure from "@/components/element/TitleStructure";
import CardModule from "@/components/module/cardModule/CardModule";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import { BlogType } from "@/types";
import { cn } from "@/utils/cn";

type BlogPageType = {
  AllBlogs: BlogType[];
  loading: boolean;
};

export default function BlogPage({
  AllBlogs,
  loading: isPending,
}: BlogPageType) {
  const formDataServices = Array.isArray(AllBlogs) ? AllBlogs : [];
  const { sortedItems } = useFilteredContainer(formDataServices);

  const view: boolean = true;

  // const { data } = useQuery({
  //   queryKey: ["getAll-category"],
  //   queryFn: getAllBlogss,
  //   initialData,
  //   staleTime: 1000 * 60 * 5,
  //   refetchOnWindowFocus: true,
  // });
  // console.log(data, "data");
  // console.log(AllBlogs, "AllBlogs");

  return (
    <div className="p-4 md:p-10 w-full  min-h-screen ">
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
                  "grid w-full gap-4  mb-12 gap-y-8",
                  view
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 md:grid-cols-2"
                )}
              >
                <CardModule
                  data={sortedItems}
                  isDate={false}
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
  );
}

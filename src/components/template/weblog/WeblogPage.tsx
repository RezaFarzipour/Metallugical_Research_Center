"use client";
import { BtnLoader } from "@/components/element/Loader";
import CardModule from "@/components/module/cardModule/CardModule";
import { getAllBlogsCategory } from "@/services/api/blogs";
import { BlogType } from "@/types";
import { Input } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
  loading,
  initialData,
}: BlogPageType) {
  const [searchBlog, setSearchBlog] = useState("");

  const { data } = useQuery({
    queryKey: ["getAll-category"],
    queryFn: getAllBlogsCategory,
    initialData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchBlog(value);
  };

  const filteredBlogs = AllBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchBlog.toLowerCase())
  );

  return (
    <div className="p-4 md:p-10 w-full  min-h-screen mt-96">
      <div className="grid w-full grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-2 border-r-4 border-blue-500 pr-2">
              جستجو
            </h2>
            <Input
              value={searchBlog ?? ""}
              onChange={searchHandler}
              name="search"
              type="text"
              placeholder="جستجو"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-red-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-4 border-r-4 border-blue-500 pr-2">
              دسته‌بندی‌ها
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              {data.map((cat: initialDataType) => (
                <li
                  key={cat.id}
                  className="flex justify-between items-center hover:text-blue-600 cursor-pointer"
                >
                  <span>{cat.category_name}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Blog Grid */}
        <main className="lg:col-span-3 w-full ">
          <h1 className="text-xl font-bold mb-6 border-r-4 border-blue-500 pr-2">
            آخرین مقالات
          </h1>
          <div className="grid w-full gap-4 mt-10 mb-32 gap-y-8   sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              <BtnLoader />
            ) : (
              <CardModule
                isDate={false}
                data={filteredBlogs}
                widthConter="100%"
                heightImg="250px"
                heightConter="200px"
                styleForAdmin={false}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

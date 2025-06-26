"use client";
import TitleStructure from "@/components/element/TitleStructure";
import { getAllBlogsCategory } from "@/services/api/blogs";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

function CategoryList() {
  const { data } = useQuery({
    queryKey: ["getAll-category"],
    queryFn: getAllBlogsCategory,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
  console.log("Categories:", data);

  return (
    <div className="py-4 md:py-10 bg-white rounded-xl h-auto">
      <h3 className="text-xl mb-10">
        <TitleStructure size="1rem">دسته‌بندی‌ها</TitleStructure>
      </h3>
      <div className="sticky top-8">
        <ul className="space-y-4">
          <Link
            href="/blogs"
            className="block px-3 py-2 rounded-lg bg-default-50 hover:bg-secondary-400 hover:text-white transition cursor-pointer font-semibold text-default-400"
          >
            همه
          </Link>
          {data?.map((category) => (
            <li key={category._id}>
              <Link
                href={`/blogs/category/${category.slug}`} // اصلاح مسیر
                className="block px-3 py-2 rounded-lg bg-default-50 hover:bg-secondary-400 hover:text-white transition cursor-pointer font-semibold text-default-400"
              >
                {category.category_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default CategoryList;

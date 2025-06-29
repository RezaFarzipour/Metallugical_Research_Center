"use client";
import TitleStructure from "@/components/element/TitleStructure";
import { getAllBlogsCategory } from "@/services/api/blogs";
import { Category } from "@/types";
import { cn } from "@/utils/cn";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";

function CategoryList() {
  const pathname = usePathname();
  const { data } = useQuery({
    queryKey: ["getAll-category"],
    queryFn: getAllBlogsCategory,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  return (
    <div className=" bg-white rounded-xl h-auto">
      <h3 className="hidden md:flex text-xl mb-6">
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
          {data?.map((category: Category) => (
            <li key={category.id}>
              <Link
                href={`/blogs/category/${category.slug}`}
                scroll={false}
                className={cn(
                  "block px-3 py-2 rounded-lg bg-default-50 hover:bg-secondary-400 hover:text-white transition cursor-pointer font-semibold text-default-400",
                  pathname === `/blogs/category/${category.slug}` &&
                    "bg-secondary-300 !font-bold text-white hover:text-white"
                )}
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

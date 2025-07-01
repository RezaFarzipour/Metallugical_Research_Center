import Empty from "@/components/element/Empty";
import BlogPage from "@/components/template/blogs/blogsPage";
import { getAllBlogsCategory } from "@/services/api/blogs";
import { BlogData, Category } from "@/types";

// type Props = {
//   params: { categorySlug: string };
//   searchParams: { id?: string };
// };

export default async function CategoryPage({ params }: {params:Promise<{categorySlug:string}>}) {
  const { categorySlug } = await params;

  // دریافت دسته‌ها
  const categories = await getAllBlogsCategory();

  // پیدا کردن دسته مورد نظر بر اساس slug
  const category = categories.find(
    (cat: Category) =>
      String(cat.slug).trim().toLowerCase() ===
      String(categorySlug).trim().toLowerCase()
  );

  // اگر دسته پیدا نشد یا بلاگ ندارد آرایه خالی انتخاب شود
  const blogsInCategory = category?.blogs || [];

  // تبدیل بلاگ‌ها به فرمت مناسب
  const mappedBlogs = blogsInCategory.map((blog: BlogData) => ({
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    coverImage: blog.cover_image?.replace("http://localhost:8000/", "") || "",
    tags: blog.tags?.[0] || "[]",
  }));

  return (
    <div>
      {mappedBlogs.length === 0 ? (
        <p className="text-lg text-secondary-600 flex justify-center items-center h-full">
          <Empty
            btnHref="/admin/services/create"
            spanValue="بلاگی"
            btn={false}
          />{" "}
        </p>
      ) : (
        <BlogPage AllBlogs={mappedBlogs} loading={false} />
      )}
    </div>
  );
}

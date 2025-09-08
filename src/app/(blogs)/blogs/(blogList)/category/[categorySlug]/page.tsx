import BlogPage from "@/components/template/blogs/blogsPage";
import { getAllBlogsCategory } from "@/services/api/blogs";
import { BlogData, Category } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  return {
    title: `بلاگ‌های ${categorySlug}`,
    description: `بلاگ‌های مربوط به دسته‌بندی ${categorySlug}`,
  };
}
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;

  //  decode می‌کنیم تا %3B بشه ;
  const decodedSlug = decodeURIComponent(categorySlug);

  // دریافت دسته‌ها
  const categories = await getAllBlogsCategory();

  // پیدا کردن دسته مورد نظر بر اساس slug
  const category = categories.find(
    (cat: Category) =>
      String(cat.slug).trim().toLowerCase() ===
      String(decodedSlug).trim().toLowerCase()
  );

  const blogsInCategory = category?.blogs || [];

  const mappedBlogs = blogsInCategory.map((blog: BlogData) => {
    let cover = blog.cover_image || "";

    if (cover && !cover.startsWith("http")) {
      cover = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${cover.trim()}`;
    }

    if (cover.startsWith("http://")) {
      cover = cover.replace("http://", "https://");
    }

    return {
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      coverImage: cover,
      tags: blog.tags?.[0] || "[]",
    };
  });

  return <BlogPage AllBlogs={mappedBlogs} loading={false} />;
}

import BlogPage from "@/components/template/blogs/blogsPage";
import { getAllBlogs } from "@/services/api/blogs";
import queryString from "query-string";

type Props = {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ id?: string }>;
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { categorySlug } = await params;
  const resolvedSearchParams = await searchParams;
  const queries = queryString.stringify(resolvedSearchParams);

  console.log("Category Slug:", categorySlug);
  console.log("Search Params:", resolvedSearchParams);

  const blogs = await getAllBlogs({
    categorySlug,
    queries,
    id: resolvedSearchParams.id,
  });

  return (
    <div>
      {blogs?.length === 0 ? (
        <p className="text-lg text-secondary-600">
          پستی در این دسته‌بندی یافت نشد
        </p>
      ) : (
        <BlogPage AllBlogs={blogs} loading={false} />
      )}
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { categorySlug } = await params;
  return {
    title: `بلاگ‌های ${categorySlug}`,
    description: `بلاگ‌های مربوط به دسته‌بندی ${categorySlug}`,
  };
}

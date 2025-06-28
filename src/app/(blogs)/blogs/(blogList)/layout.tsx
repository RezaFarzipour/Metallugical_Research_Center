import HeaderImage from "@/components/module/HeaderImage";
import CategoryList from "@/components/template/blogs/CateogryList";
// export async function generateMetadata({ params }: Props) {
//   const { categorySlug } = await params;
//   return {
//     title: `بلاگ‌های ${categorySlug}`,
//     description: `بلاگ‌های مربوط به دسته‌بندی ${categorySlug}`,
//   };
// }
export default function BlogListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* banner section */}
      <HeaderImage breadcrumbItem1="بلاگ" panelHref="/" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 mt-96">
        {/* CategoryList Section */}
        <aside className="md:col-span-3 lg:col-span-2 text-secondary-500 space-y-4">
          <CategoryList />
        </aside>

        {/* Main Content Section */}
        <main className="md:col-span-9 lg:col-span-10 ">{children}</main>
      </div>
    </>
  );
}

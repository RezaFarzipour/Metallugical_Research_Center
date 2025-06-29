import Layout from "@/components/containers/layout/Layout";
import HeaderImage from "@/components/module/HeaderImage";
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
    <Layout>
      {/* banner section */}
      <HeaderImage breadcrumbItem1="بلاگ" panelHref="/" />

      {/* Main Content Section */}
      <main>{children}</main>
    </Layout>
  );
}

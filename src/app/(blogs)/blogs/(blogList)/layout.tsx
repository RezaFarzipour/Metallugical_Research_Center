import Layout from "@/components/containers/layout/Layout";
import HeaderImage from "@/components/module/HeaderImage";

export const metadata = {
  title: "بلاگ ها",
};
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

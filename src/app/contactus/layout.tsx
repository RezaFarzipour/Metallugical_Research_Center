import Layout from "@/components/containers/layout/Layout";
import HeaderImage from "@/components/module/HeaderImage";

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Layout>
        {/* banner section */}
        <HeaderImage headrName="ارتباط با ما" breadcrumbItem2="ارتباط با ما" />
        {children}
      </Layout>
    </>
  );
}
